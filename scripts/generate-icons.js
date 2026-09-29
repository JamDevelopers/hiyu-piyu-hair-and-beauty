import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Standard App Icon SVG (512x512)
const standardIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A0718"/>
      <stop offset="50%" stop-color="#5A081E"/>
      <stop offset="100%" stop-color="#2B030D"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E2A8"/>
      <stop offset="40%" stop-color="#D5AA63"/>
      <stop offset="70%" stop-color="#E9CB8A"/>
      <stop offset="100%" stop-color="#B88A3B"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="centerGlow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#D5AA63" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#D5AA63" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#4A0718" stop-opacity="0"/>
    </radialGradient>
    <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="108" fill="url(#bgGrad)"/>
  <rect width="512" height="512" rx="108" fill="url(#centerGlow)"/>

  <!-- Subtle Inner Border -->
  <rect x="24" y="24" width="464" height="464" rx="88" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.65"/>
  <rect x="36" y="36" width="440" height="440" rx="76" fill="none" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.35"/>

  <!-- Corner Flourish Accents -->
  <g stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round" stroke-opacity="0.8">
    <path d="M 52 70 L 70 70 L 70 52"/>
    <path d="M 460 70 L 442 70 L 442 52"/>
    <path d="M 52 442 L 70 442 L 70 460"/>
    <path d="M 460 442 L 442 442 L 442 460"/>
  </g>

  <!-- Central Star Sparkle -->
  <g transform="translate(256, 120)" fill="url(#goldGrad)">
    <polygon points="0,-22 5,-6 21,0 5,6 0,22 -5,6 -21,0 -5,-6"/>
    <circle cx="0" cy="0" r="3" fill="#FFF7E9"/>
  </g>

  <!-- Main Monogram "H" & "P" Luxury Emblem -->
  <g filter="url(#goldShadow)">
    <!-- Central Ornamental Crest -->
    <path d="M 256 160 C 200 160 170 190 170 240 C 170 310 240 330 256 370 C 272 330 342 310 342 240 C 342 190 312 160 256 160 Z"
          fill="none" stroke="url(#goldGrad)" stroke-width="2.5" stroke-opacity="0.4"/>

    <!-- Intertwined Serif Monogram: Large H and P -->
    <text x="256" y="280"
          font-family="'Playfair Display', Georgia, serif"
          font-size="148"
          font-weight="700"
          font-style="italic"
          text-anchor="middle"
          fill="url(#goldGrad)"
          letter-spacing="-6">
      H
    </text>

    <!-- Sub-flourish overlay -->
    <path d="M 195 295 Q 256 330 317 295" fill="none" stroke="url(#goldGrad)" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="256" cy="320" r="4.5" fill="url(#goldGrad)"/>
  </g>

  <!-- Brand Typography -->
  <g text-anchor="middle">
    <!-- HIYUPIYU in tracking gold caps -->
    <text x="256" y="388"
          font-family="'Plus Jakarta Sans', 'Outfit', sans-serif"
          font-size="28"
          font-weight="800"
          letter-spacing="9"
          fill="url(#goldGrad)">
      HIYUPIYU
    </text>

    <!-- Subtitle: HAIR & BEAUTY -->
    <text x="256" y="420"
          font-family="'Plus Jakarta Sans', sans-serif"
          font-size="14"
          font-weight="600"
          letter-spacing="5"
          fill="#FFF7E9"
          fill-opacity="0.85">
      HAIR &amp; BEAUTY
    </text>

    <!-- Surat Ladies Doorstep -->
    <text x="256" y="445"
          font-family="'Plus Jakarta Sans', sans-serif"
          font-size="10.5"
          font-weight="500"
          letter-spacing="3"
          fill="#D5AA63"
          fill-opacity="0.75">
      SURAT · LADIES ONLY
    </text>
  </g>
</svg>
`;

// 2. Maskable Icon SVG (512x512, full-bleed, content within 80% safe circle)
const maskableIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A0718"/>
      <stop offset="50%" stop-color="#5A081E"/>
      <stop offset="100%" stop-color="#2B030D"/>
    </linearGradient>
    <linearGradient id="mGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7E2A8"/>
      <stop offset="40%" stop-color="#D5AA63"/>
      <stop offset="70%" stop-color="#E9CB8A"/>
      <stop offset="100%" stop-color="#B88A3B"/>
    </linearGradient>
    <radialGradient id="mCenterGlow" cx="50%" cy="48%" r="42%">
      <stop offset="0%" stop-color="#D5AA63" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="#D5AA63" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#4A0718" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Full-bleed background with NO rounded corners for maskable -->
  <rect width="512" height="512" fill="url(#mBgGrad)"/>
  <rect width="512" height="512" fill="url(#mCenterGlow)"/>

  <!-- Inner circular ring within safe zone (Safe zone is 80% = 410px circle) -->
  <circle cx="256" cy="256" r="190" fill="none" stroke="url(#mGoldGrad)" stroke-width="2.5" stroke-opacity="0.6"/>
  <circle cx="256" cy="256" r="178" fill="none" stroke="url(#mGoldGrad)" stroke-width="1" stroke-opacity="0.3"/>

  <!-- Central Star Sparkle -->
  <g transform="translate(256, 142)" fill="url(#mGoldGrad)">
    <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"/>
    <circle cx="0" cy="0" r="2.5" fill="#FFF7E9"/>
  </g>

  <!-- Monogram Letter H in safe zone -->
  <text x="256" y="278"
        font-family="'Playfair Display', Georgia, serif"
        font-size="132"
        font-weight="700"
        font-style="italic"
        text-anchor="middle"
        fill="url(#mGoldGrad)"
        letter-spacing="-5">
    H
  </text>

  <!-- Sub-flourish overlay -->
  <path d="M 205 292 Q 256 322 307 292" fill="none" stroke="url(#mGoldGrad)" stroke-width="3" stroke-linecap="round"/>
  <circle cx="256" cy="312" r="3.5" fill="url(#mGoldGrad)"/>

  <!-- Brand Typography within safe zone -->
  <g text-anchor="middle">
    <text x="256" y="362"
          font-family="'Plus Jakarta Sans', 'Outfit', sans-serif"
          font-size="24"
          font-weight="800"
          letter-spacing="8"
          fill="url(#mGoldGrad)">
      HIYUPIYU
    </text>

    <text x="256" y="388"
          font-family="'Plus Jakarta Sans', sans-serif"
          font-size="11.5"
          font-weight="600"
          letter-spacing="4"
          fill="#FFF7E9"
          fill-opacity="0.9">
      HAIR &amp; BEAUTY
    </text>
  </g>
</svg>
`;

async function generateIcons() {
  console.log('Generating PWA icons...');

  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardIconSvg.trim());

  // 192x192 PNG
  await sharp(Buffer.from(standardIconSvg))
    .resize(192, 192)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('✓ Created pwa-192x192.png');

  // 512x512 PNG
  await sharp(Buffer.from(standardIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('✓ Created pwa-512x512.png');

  // 512x512 Maskable PNG
  await sharp(Buffer.from(maskableIconSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('✓ Created pwa-maskable-512x512.png');

  // 180x180 Apple Touch Icon PNG
  await sharp(Buffer.from(standardIconSvg))
    .resize(180, 180)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // Favicon 64x64 PNG
  await sharp(Buffer.from(standardIconSvg))
    .resize(64, 64)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('✓ Created favicon.png');

  console.log('All PWA icons successfully generated!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
