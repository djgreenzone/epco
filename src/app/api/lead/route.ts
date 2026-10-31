import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Lead intake endpoint for the homepage strategy-call survey.
// - Inserts the lead into Supabase ("leads" table) so there's a record.
// - Emails a formatted summary to Eddy via Resend.
// Both are best-effort: the user still gets routed to the calendar even if
// one side fails, but we report partial failures in the JSON for debugging.

export const runtime = "nodejs";

const LEAD_INBOX = process.env.LEAD_NOTIFICATION_EMAIL || "eddy@infortum.io";
// Resend requires a verified sender domain. Until eddypham.company is verified
// in Resend, their shared onboarding sender works for testing.
const FROM_ADDRESS =
  process.env.LEAD_FROM_EMAIL || "EPCO Leads <onboarding@resend.dev>";

type LeadPayload = {
  name?: string;
  email?: string;
  help?: string;
  stage?: string;
  selling?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  details?: string;
};

const FIELD_LABELS: Record<keyof LeadPayload, string> = {
  name: "Full Name",
  email: "Work Email",
  help: "What they need help with",
  stage: "Stage",
  selling: "Currently selling",
  goal: "Primary goal",
  budget: "Budget allocated",
  timeline: "Ready to start",
  details: "In their words",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(lead: LeadPayload) {
  const rows = (Object.keys(FIELD_LABELS) as (keyof LeadPayload)[])
    .map((key) => {
      const raw = lead[key];
      if (!raw) return "";
      return `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #1c2230;color:#7a8699;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:1px;white-space:nowrap;vertical-align:top;">${FIELD_LABELS[key]}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #1c2230;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;">${escapeHtml(raw)}</td>
        </tr>`;
    })
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;background:#0b0e14;padding:32px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#121620;border:1px solid rgba(0,242,255,0.25);border-radius:16px;overflow:hidden;">
      <tr>
        <td style="height:3px;background:linear-gradient(90deg,#00f2ff,#ff00ea,#ffcc00);"></td>
      </tr>
      <tr>
        <td style="padding:28px 24px 8px;">
          <div style="font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#00f2ff;font-weight:bold;">// NEW STRATEGY-CALL LEAD</div>
          <div style="font-family:Arial,sans-serif;font-size:24px;font-weight:bold;color:#ffffff;margin-top:8px;">${escapeHtml(lead.name || "Unknown")}</div>
          <div style="font-family:Arial,sans-serif;font-size:14px;color:#9aa6b8;margin-top:2px;">${escapeHtml(lead.email || "")}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 8px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 24px 24px;font-family:monospace;font-size:10px;color:#45506a;letter-spacing:1px;">SUBMITTED FROM eddypham.company · BOOKING TERMINAL</td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  let lead: LeadPayload;
  try {
    lead = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!lead.name || !lead.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  const result: { supabase: string; email: string } = {
    supabase: "skipped",
    email: "skipped",
  };

  // 1. Record to Supabase (non-fatal on failure).
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { error } = await supabase.from("leads").insert([
        {
          name: lead.name,
          email: lead.email,
          // Keep the legacy "revenue" column populated from the selling band.
          revenue: lead.selling ?? null,
          help: lead.help ?? null,
          stage: lead.stage ?? null,
          selling: lead.selling ?? null,
          goal: lead.goal ?? null,
          budget: lead.budget ?? null,
          timeline: lead.timeline ?? null,
          details: lead.details ?? null,
        },
      ]);
      result.supabase = error ? `error: ${error.message}` : "ok";
    } catch (err) {
      result.supabase = `error: ${(err as Error).message}`;
    }
  }

  // 2. Email Eddy via Resend (non-fatal on failure).
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [LEAD_INBOX],
          reply_to: lead.email,
          subject: `New Lead: ${lead.name}${lead.goal ? ` — ${lead.goal}` : ""}`,
          html: buildEmailHtml(lead),
        }),
      });
      result.email = res.ok ? "ok" : `error: ${res.status}`;
    } catch (err) {
      result.email = `error: ${(err as Error).message}`;
    }
  } else {
    result.email = "error: RESEND_API_KEY not set";
  }

  return NextResponse.json({ ok: true, ...result });
}
