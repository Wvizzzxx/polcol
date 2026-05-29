const fs = require('fs');
const path = require('path');

// Map emoji to icon component name
const emojiToComponent = {
  '📋': 'IconClipboardText',
  '📄': 'IconFileText',
  '📝': 'IconPencil',
  '📰': 'IconNews',
  '📚': 'IconBook2',
  '📖': 'IconBook',
  '📜': 'IconReport',
  '✏️': 'IconPencil',
  '👥': 'IconUsers',
  '👨\u200D🏫': 'IconSchool',
  '👨\u200D🎓': 'IconUser',
  '👨\u200D💻': 'IconDeviceLaptop',
  '👩\u200D🏫': 'IconSchool',
  '👤': 'IconUser',
  '🎓': 'IconSchool',
  '🏆': 'IconTrophy',
  '🏅': 'IconMedal',
  '🥇': 'IconMedal',
  '⭐': 'IconStar',
  '🎯': 'IconTarget',
  '🏛️': 'IconBuilding',
  '🏫': 'IconSchool',
  '🏠': 'IconHome',
  '🏭': 'IconBuildingFactory',
  '🚪': 'IconDoor',
  '🍽️': 'IconChefHat',
  '☕': 'IconCoffee',
  '📢': 'IconSpeakerphone',
  '📞': 'IconPhone',
  '📧': 'IconMail',
  '✉️': 'IconMail',
  '💬': 'IconMessageCircle',
  '💻': 'IconDeviceLaptop',
  '🖥️': 'IconDeviceDesktop',
  '📱': 'IconDeviceMobile',
  '🤖': 'IconRobot',
  '🔒': 'IconLock',
  '🌐': 'IconGlobe',
  '🧭': 'IconCompass',
  '📍': 'IconMapPin',
  '🗺️': 'IconMap',
  '💰': 'IconCoin',
  '💳': 'IconCreditCard',
  '🔧': 'IconTool',
  '⚙️': 'IconSettings',
  '🔩': 'IconSettings2',
  '🔗': 'IconLink',
  '📎': 'IconPaperclip',
  '🏀': 'IconBallBasketball',
  '⚽': 'IconBallBasketball',
  '🎾': 'IconBallBasketball',
  '🎭': 'IconTheater',
  '🎤': 'IconMicrophone',
  '🎨': 'IconPalette',
  '🖌️': 'IconBrush',
  '🔬': 'IconMicroscope',
  '📅': 'IconCalendar',
  '🕐': 'IconClock',
  '⏰': 'IconAlarm',
  '🔔': 'IconBell',
  '🚀': 'IconRocket',
  '💡': 'IconBulb',
  '🤝': 'IconHeartHandshake',
  '🎉': 'IconConfetti',
  '🎊': 'IconBalloon',
  '🌍': 'IconGlobe',
  '⚖️': 'IconScale',
  '🔍': 'IconSearch',
  '📊': 'IconChartBar',
  '📈': 'IconTrendingUp',
  '🧮': 'IconCalculator',
  '💼': 'IconBriefcase',
  '📦': 'IconTag',
  '🗃️': 'IconFolder',
  '🗂️': 'IconLayoutGrid',
  '📑': 'IconClipboardCheck',
  '🔖': 'IconBookmark',
  '🏷️': 'IconTag',
  '✅': 'IconCircleCheck',
  '❌': 'IconX',
  '⚠️': 'IconAlertTriangle',
  '❤️': 'IconHeart',
  '🎪': 'IconTent',
  '✈️': 'IconPlane',
  '🏨': 'IconBuilding',
  '🏥': 'IconBuildingHospital',
  '🏦': 'IconBuildingBank',
  '📡': 'IconSatellite',
  '🧪': 'IconFlask',
  '🛡️': 'IconShield',
  '🗳️': 'IconCheckbox',
  '☀️': 'IconSun',
  '🌆': 'IconSun',
  '🧠': 'IconBrain',
  '🎵': 'IconMusic',
  '🌿': 'IconLeaf',
  '🌱': 'IconPlant',
  '🏔️': 'IconMountain',
  '🚗': 'IconCar',
  '🚲': 'IconCar',
  '🎁': 'IconGift',
  '💊': 'IconPill',
  '🩺': 'IconStethoscope',
  '📓': 'IconNotebook',
  '📒': 'IconNotes',
  '📃': 'IconFileText',
  '🖋️': 'IconPencil',
  '🖊️': 'IconPencil',
  '🖍️': 'IconPencil',
  '📁': 'IconFolder',
  '📂': 'IconFolder',
  '🗄️': 'IconSettings2',
  '📌': 'IconPin',
  '📏': 'IconRuler',
  '📐': 'IconRuler',
  '✂️': 'IconScissors',
  '🔦': 'IconBulb',
  '📔': 'IconBook',
  '📕': 'IconBook',
  '📗': 'IconBook',
  '📘': 'IconBook',
  '📙': 'IconBook',
  '🗞️': 'IconNews',
  '🐍': 'IconCode',
  'ℹ️': 'IconClipboardText',
  '🪪': 'IconId',
  '🤲': 'IconHeartHandshake',
  '👪': 'IconUsers',
  '🖨️': 'IconPrinter',
  '📮': 'IconMail',
  '🇷🇺': 'IconBuilding',
  '📸': 'IconCamera',
};

const files = [
  'src/pages/Sveden.jsx',
  'src/pages/About.jsx',
  'src/pages/Studentam.jsx',
  'src/pages/Sotrudnikam.jsx',
  'src/pages/Roditelyam.jsx',
  'src/pages/Abiturientam.jsx',
  'src/pages/ITCube.jsx',
  'src/pages/Contacts.jsx',
  'src/data/pagesContent.js',
];

for (const filePath of files) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    console.log('SKIP (not found): ' + filePath);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;

  // Find which emojis are used in this file
  const usedEmojis = new Set();
  for (const emoji of Object.keys(emojiToComponent)) {
    if (content.includes(emoji)) {
      usedEmojis.add(emoji);
    }
  }

  if (usedEmojis.size === 0) {
    console.log('SKIP (no emojis): ' + filePath);
    continue;
  }

  // Get needed icon imports
  const neededIcons = new Set();
  for (const emoji of usedEmojis) {
    neededIcons.add(emojiToComponent[emoji]);
  }

  // Replace icon: 'emoji' and emoji: 'emoji' patterns with Icon: ComponentName
  for (const [emoji, componentName] of Object.entries(emojiToComponent)) {
    if (!usedEmojis.has(emoji)) continue;

    // Escape for regex
    const escaped = emoji.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // icon: 'emoji' or icon: "emoji"
    content = content.replace(new RegExp(`icon:\\s*['"]${escaped}['"]`, 'g'), `Icon: ${componentName}`);
    // emoji: 'emoji' or emoji: "emoji"
    content = content.replace(new RegExp(`emoji:\\s*['"]${escaped}['"]`, 'g'), `Icon: ${componentName}`);
    // hero: 'emoji' or hero: "emoji"
    content = content.replace(new RegExp(`hero:\\s*['"]${escaped}['"]`, 'g'), `Hero: ${componentName}`);
  }

  // Handle JSX rendering patterns for hero emoji as text
  // Pattern: <span className="text-2xl">{item.Icon}</span> should become <item.Icon className="w-6 h-6 text-white" />
  // This is tricky because after replacement, we have Icon: ComponentName but the JSX still uses {spec.emoji}
  // We need to also fix the property name access: spec.emoji -> spec.Icon

  // Replace property access: .emoji -> .Icon (for objects where we changed emoji to Icon)
  // This is context-specific, let's do it for known patterns
  content = content.replace(/\.emoji\b/g, '.Icon');

  // Handle inline text emoji rendering:
  // <span className="text-2xl">🏆 Чемпионатное движение</span>
  // Replace standalone emoji at beginning of text content
  for (const [emoji, componentName] of Object.entries(emojiToComponent)) {
    if (!usedEmojis.has(emoji)) continue;
    const escaped = emoji.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // Replace emoji in JSX text content: >{emoji} or >emoji
    content = content.replace(new RegExp(`>\\s*${escaped}`, 'g'), `><${componentName} className="inline w-5 h-5 align-text-bottom" />`);
  }

  // Add imports if file changed
  if (content !== originalContent) {
    const importLine = `import { ${[...neededIcons].sort().join(', ')} } from '@tabler/icons-react';`;

    const tablerImportRegex = /import\s*\{[^}]*\}\s*from\s*'@tabler\/icons-react'/;
    if (tablerImportRegex.test(content)) {
      // Add missing icons to existing import
      content = content.replace(tablerImportRegex, (match) => {
        const existingIcons = match.match(/\{([^}]+)\}/)[1].split(',').map(s => s.trim()).filter(Boolean);
        const allIcons = [...new Set([...existingIcons, ...neededIcons])].sort();
        return match.replace(/\{[^}]+\}/, `{ ${allIcons.join(', ')} }`);
      });
    } else {
      // Add new import
      const lines = content.split('\n');
      let lastImportIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) lastImportIdx = i;
      }
      if (lastImportIdx >= 0) {
        lines.splice(lastImportIdx + 1, 0, importLine);
      } else {
        lines.unshift(importLine);
      }
      content = lines.join('\n');
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated: ${filePath} (${usedEmojis.size} emojis -> icons)`);
  } else {
    console.log(`No changes: ${filePath}`);
  }
}
console.log('Done!');