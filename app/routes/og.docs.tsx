import { ImageResponse } from 'takumi-js/response';
import { langFromPath } from '@/lib/i18n';
import { source } from '@/lib/source';
import type { Route } from './+types/og.docs';

export function loader({ params, request }: Route.LoaderArgs) {
  const slugs = params['*']
    .split('/')
    .filter((v) => v.length > 0)
    .slice(0, -1);
  const page = source.getPage(slugs, langFromPath(new URL(request.url).pathname));

  if (!page) throw new Response(undefined, { status: 404 });

  return new ImageResponse(<Card title={page.data.title} description={page.data.description} />, {
    width: 1200,
    height: 630,
    format: 'webp',
  });
}

function Card({ title, description }: { title: string; description?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '72px 80px',
        color: '#F8F9FF',
        backgroundColor: '#0B0E12',
        backgroundImage: 'radial-gradient(circle at 85% 110%, rgba(255,138,61,0.38), rgba(255,138,61,0) 55%)',
        borderBottom: '12px solid #FF8A3D',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <svg width="34" height="60" viewBox="0 0 820 1450" aria-hidden="true">
          <polygon fill="#FF8A3D" points="0,0 820,410 526,368 0,105" />
          <polygon fill="#E8662A" points="526,368 820,410 308,666 118,572" />
          <polygon fill="#C9D0D8" points="392,709 496,657 820,819 526,776" />
          <polygon fill="#7D8794" points="526,776 820,819 0,1450 0,1039" />
        </svg>
        <span style={{ fontSize: '36px', fontWeight: 600, letterSpacing: '-0.02em' }}>Brokspace</span>
        <span style={{ fontSize: '36px', color: '#47515C' }}>/</span>
        <span style={{ fontSize: '36px', color: '#A7B0BC' }}>Docs</span>
      </div>
      <p
        style={{
          margin: '0',
          marginTop: 'auto',
          fontSize: '76px',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
        }}
      >
        {title}
      </p>
      {description && (
        <p style={{ margin: '0', marginTop: '24px', fontSize: '34px', lineHeight: 1.35, color: '#A7B0BC' }}>
          {description}
        </p>
      )}
    </div>
  );
}
