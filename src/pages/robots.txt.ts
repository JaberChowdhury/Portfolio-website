export const prerender = true;

const robots = `User-agent: *
Allow: /

Sitemap: https://jaber.dev/sitemap-index.xml
Sitemap: https://jaber.dev/sitemap-0.xml
`;

export function GET() {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
