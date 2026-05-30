const fs = require('fs');
const files = [
  'src/pages/ShowcaseNewSections.jsx',
  'src/pages/Showcase.jsx',
  'src/pages/Specialties.jsx',
  'src/pages/Home.jsx',
  'src/pages/Abiturientam.jsx',
  'src/components/SpecialtyCard3D.jsx',
];
files.forEach(f => {
  try {
    const c = fs.readFileSync(f, 'utf8');
    const m = [...c.matchAll(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu)];
    if (m.length) {
      const unique = [...new Set(m.map(e => e[0]))];
      console.log(`${f}: ${m.length} emojis: ${unique.join(' ')}`);
    } else {
      console.log(`${f}: clean`);
    }
  } catch (e) {
    console.log(`${f}: error reading`);
  }
});