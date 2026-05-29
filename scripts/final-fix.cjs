const fs = require('fs');
const path = require('path');

// 1. Fix About.jsx - replace renderIcon(obj.icon) with <obj.Icon /> and string emojis with components
const aboutPath = path.join(process.cwd(), 'src/pages/About.jsx');
let about = fs.readFileSync(aboutPath, 'utf8');

// Replace renderIcon(v.icon, "classes") with <v.Icon className="classes" />
about = about.replace(/\{renderIcon\(v\.icon,\s*"([^"]+)"\)\}/g, '<v.Icon className="$1" />');
about = about.replace(/\{renderIcon\(stat\.icon,\s*"([^"]+)"\)\}/g, '<stat.Icon className="$1" />');
about = about.replace(/\{renderIcon\(item\.icon,\s*"([^"]+)"\)\}/g, '<item.Icon className="$1" />');

// Replace remaining string emoji renderIcon calls with direct Icon imports
about = about.replace(
  /\{renderIcon\('👩\u200D🏫',\s*"([^"]+)"\)\}/g,
  '<IconSchool className="$1" />'
);
about = about.replace(
  /\{renderIcon\(idx === 0 \? '👤' : '👥',\s*"([^"]+)"\)\}/g,
  function(_, cls) {
    return '{idx === 0 ? <IconUser className="' + cls + '" /> : <IconUsers className="' + cls + '" />}';
  }
);

fs.writeFileSync(aboutPath, about, 'utf8');
console.log('Fixed About.jsx rendering');

// 2. Add missing emojis to iconMap.jsx stringToIcon
const iconMapPath = path.join(process.cwd(), 'src/utils/iconMap.jsx');
let iconMap = fs.readFileSync(iconMapPath, 'utf8');

// Add missing mappings before the closing brace
const missingMappings = `  '🍎': IconCircleCheck,
  '🏃': IconRocket,
  '🎮': IconDeviceLaptop,
  '♿': IconAlertTriangle,
  '🎖️': IconMedal,
  '🚌': IconCar,
  '🎬': IconDeviceDesktop,
  '❓': IconHelp,
  '🏗️': IconBuilding,
  '👨\\u200D👩\\u200D👧\\u200D👦': IconUsers,
  '👨\\u200D👩\\u200D👧': IconUsers,
  '👩\\u200D💻': IconDeviceLaptop,
  '🧑\\u200D🔧': IconTool,
`;

// Check which ones are already there
const missingLines = missingMappings.split('\n').filter(line => {
  const key = line.match(/'([^']+)'/);
  return key && !iconMap.includes(key[1]);
});

if (missingLines.length > 0) {
  iconMap = iconMap.replace(
    /\n}\s*\n\/\//,
    '\n' + missingLines.join('\n') + '\n}\n//'
  );
  fs.writeFileSync(iconMapPath, iconMap, 'utf8');
  console.log('Added ' + missingLines.length + ' missing emoji mappings to iconMap.jsx');
} else {
  console.log('No missing mappings to add');
}

console.log('Final fixes done!');