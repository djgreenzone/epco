const BASE = process.env.NEXT_PUBLIC_MEDIA_URL ?? "";

/** Resolve an asset within a service folder. */
export function media(service: string, file: string) {
  return `${BASE}/services/${service}/${file}`;
}
