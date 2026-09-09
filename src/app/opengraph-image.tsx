import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Intégrale Academy : formations sécurité, BTS en alternance et VTC';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/images/logo.png'));
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', background: '#101a29', color: '#ffffff', padding: '44px 72px', justifyContent: 'space-between' }}>
      <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width="590" height="177" style={{ objectFit: 'contain' }} />
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 58, fontWeight: 700, lineHeight: 1.14, letterSpacing: '-2px' }}>
        <span>Faites le premier pas</span>
        <span style={{ color: '#FFD166' }}>vers votre futur métier.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid #40506a', paddingTop: 22 }}>
        <span style={{ fontSize: 27 }}>Sécurité privée · BTS en alternance · VTC</span>
        <span style={{ fontSize: 22, color: '#b8c4d6' }}>Puget-sur-Argens · Paris · Aurillac</span>
      </div>
    </div>,
    size,
  );
}
