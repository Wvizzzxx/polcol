const fs = require('fs');
const path = require('path');

// Fix pagesContent.js: Hero: -> hero: (SubPage expects lowercase 'hero')
const pagesPath = path.join(process.cwd(), 'src/data/pagesContent.js');
let content = fs.readFileSync(pagesPath, 'utf8');
content = content.replace(/Hero:\s*(Icon\w+)/g, 'hero: $1');
fs.writeFileSync(pagesPath, content, 'utf8');
console.log('Fixed Hero -> hero in pagesContent.js');

// Fix About.jsx: Replace EmojiIcon with renderIcon
const aboutPath = path.join(process.cwd(), 'src/pages/About.jsx');
let about = fs.readFileSync(aboutPath, 'utf8');

// Replace EmojiIcon import with renderIcon
about = about.replace(
  /import\s*\{[^}]*EmojiIcon[^}]*\}\s*from\s*['"][^'"]*iconMap[^'"]*['"]/g,
  "import { renderIcon } from '../utils/iconMap'"
);

// Replace <EmojiIcon emoji="string" className="string" />
about = about.replace(
  /<EmojiIcon\s+emoji=["']([^"']+)["']\s+className=["']([^"']+)["']\s*\/>/g,
  function(_, iconVal, cls) {
    return '{renderIcon(' + iconVal + ', "' + cls + '")}';
  }
);

// Replace <EmojiIcon emoji={expression} className="string" />
about = about.replace(
  /<EmojiIcon\s+emoji=\{([^}]+)\}\s+className=["']([^"']+)["']\s*\/>/g,
  function(_, iconExpr, cls) {
    return '{renderIcon(' + iconExpr + ', "' + cls + '")}';
  }
);

fs.writeFileSync(aboutPath, about, 'utf8');
console.log('Fixed About.jsx');

// Fix ITCube.jsx: Remove emoji from comment string
const itcubePath = path.join(process.cwd(), 'src/pages/ITCube.jsx');
let itcube = fs.readFileSync(itcubePath, 'utf8');
itcube = itcube.replace(/\u{1F680}/gu, '');
fs.writeFileSync(itcubePath, itcube, 'utf8');
console.log('Fixed ITCube.jsx');

console.log('All fixes applied!');