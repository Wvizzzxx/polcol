const fs = require('fs');
let c = fs.readFileSync('src/data/pagesContent.js', 'utf8');

// Replace icon emoji strings with Icon components
c = c.replace(/icon: "🏃"/g, 'Icon: IconTrendingUp');
c = c.replace(/icon: "♿"/g, 'Icon: IconAlertTriangle');
c = c.replace(/icon: "🎮"/g, 'Icon: IconDeviceLaptop');
c = c.replace(/icon: "👩‍💻"/g, 'Icon: IconDeviceLaptop');
c = c.replace(/icon: "👨‍👩‍👧"/g, 'Icon: IconUsers');
c = c.replace(/icon: "🧑‍🔧"/g, 'Icon: IconTool');
c = c.replace(/icon: "🎖️"/g, 'Icon: IconMedal');
c = c.replace(/icon: "🚌"/g, 'Icon: IconCar');
c = c.replace(/icon: "🎬"/g, 'Icon: IconDeviceDesktop');
c = c.replace(/icon: "🏗️"/g, 'Icon: IconBuilding');
c = c.replace(/icon: "❓"/g, 'Icon: IconHelp');
c = c.replace(/icon: "👨‍👩‍👧‍👦"/g, 'Icon: IconUsers');

// Replace hero emoji strings with Icon components
c = c.replace(/hero: "♿"/g, 'hero: IconAlertTriangle');
c = c.replace(/hero: "❓"/g, 'hero: IconHelp');
c = c.replace(/hero: "🏗️"/g, 'hero: IconBuilding');
c = c.replace(/hero: "👨‍👩‍👧‍👦"/g, 'hero: IconUsers');

// Fix fallbackContent
c = c.replace(/title: "Страница в разработке"/g, 'title: "Страница не найдена"');
c = c.replace(/subtitle: "Информация скоро будет опубликована"/g, 'subtitle: "Запрашиваемая страница не существует или была перемещена"');
c = c.replace(/title: "Данный раздел находится в разработке"/g, 'title: "Страница не найдена"');
c = c.replace(/Информация в данном разделе будет опубликована в ближайшее время\. Приносим извинения за временные неудобства\. По всем вопросам вы можете обратиться в администрацию колледжа по телефону 8 \(4922\) 32-20-90 или по электронной почте adm@polcol\.ru\./g, 'К сожалению, запрашиваемая страница не найдена. Возможно, она была перемещена или удалена. Воспользуйтесь навигацией сайта или свяжитесь с администрацией колледжа по телефону 8 (4922) 32-20-90 или по электронной почте adm@polcol.ru.');

fs.writeFileSync('src/data/pagesContent.js', c);
console.log('Done! Replaced all emoji icons and fixed fallback content.');