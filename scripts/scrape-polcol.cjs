/**
 * Скрипт для извлечения контента со всех страниц polcol.ru
 * Использует cheerio для парсинга HTML
 */

const https = require('https');
const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://polcol.ru';

// Все страницы сайта polcol.ru (собраны из navigation.js и pagesContent.js)
const PAGES = [
  // Главная
  '/',

  // ===================== СВЕДЕНИЯ ОБ ОО =====================
  '/sveden/common',
  '/sveden/struct',
  '/sveden/document',
  '/sveden/education',
  '/sveden/eduStandarts',
  '/sveden/managers',
  '/sveden/employees',
  '/sveden/dsreda',
  '/sveden/grants',
  '/sveden/paid_edu',
  '/sveden/budget',
  '/sveden/vacant',
  '/sveden/cooperation',
  '/sveden/food',
  '/sveden/legMap',

  // ===================== АБИТУРИЕНТАМ =====================
  '/abiturientam/priemnaya-komissiya',
  '/abiturientam/den-otkrytykh-dverej',
  '/abiturientam/spetsialnosti',
  '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov',
  '/abiturientam/proforientatsiya',
  '/abiturientam/test-na-professionalnoe-samoopredelenie',
  '/abiturientam/obyavleniya',
  '/abiturientam/napravleniya-obucheniya',
  '/abiturientam/spisok-postupleniya',
  '/abiturientam/o-kolledzhe',

  // ===================== СТУДЕНТАМ =====================
  '/studentam/raspisanie-zanyatij',
  '/studentam/raspisanie-zvonkov',
  '/studentam/dokumenty',
  '/studentam/praktika',
  '/studentam/studencheskaya-zhizn',
  '/studentam/studencheskiy-sovet',
  '/studentam/trudoustrojstvo-vypusknikov',
  '/studentam/olimpiady-i-konkursy',
  '/studentam/volonterskoe-dvizhenie',
  '/studentam/tsentr-karery',
  '/studentam/promezhutochnaya-i-itogovaya-attestatsiya',
  '/studentam/metodicheskie-materialy',
  '/studentam/zaochnoe-obuchenie',
  '/studentam/chempionatnoe-dvizhenie',
  '/studentam/obshhezhitie-dlya-inogorodnikh-studentov',

  // ===================== РОДИТЕЛЯМ =====================
  '/roditelyam/pitanie-i-zdorovye',
  '/roditelyam/vospitatelynaya-rabota',
  '/roditelyam/klassnye-rukovoditeli',
  '/roditelyam/obyavleniya',
  '/roditelyam/dokumenty',
  '/roditelyam/meropriyatiya',
  '/roditelyam/den-otkrytykh-dverey',

  // ===================== СОТРУДНИКАМ =====================
  '/sotrudnikam/attestatsii',
  '/sotrudnikam/dokumenty',
  '/sotrudnikam/metodicheskie-materialy',
  '/sotrudnikam/obyavleniya',
  '/sotrudnikam/meropriyatiya',
  '/sotrudnikam/konkurs-master-goda',
  '/sotrudnikam/muzey',
  '/sotrudnikam/peredovye-pedagogicheskie-tekhnologii',
  '/sotrudnikam/obuchenie-sotrudnikov',
  '/sotrudnikam/vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya',

  // ===================== ДОПОЛНИТЕЛЬНЫЕ СТРАНИЦЫ =====================
  '/obrazovatelnoe-kreditovanie',
  '/informatsiya-dlya-invalidov-i-lits-s-ovz',
  '/worldskills-russia',
  '/abilimpiks',
  '/vakansii-kolledzha',
  '/prochie-dokumenty',
  '/otzyvy',
  '/faq',
  '/nauchno-issledovatelyskaya-deyatelynost',
  '/politika-obrabotki-personalnykh-dannykh',
  '/o-kolledzhe/dostizheniya',
  '/o-kolledzhe/foto-i-videomaterialy',
  '/o-kolledzhe/sotrudnichestvo',
  '/elektronnaya-informatsionno-obrazovatelnaya-sreda',
  '/virtualnyy-kabinet-proforientatsii',
  '/virtualnyy-kabinet-po-proforientatsii',
  '/anons',
  '/promo',
  '/search',
  '/torgi-po-223-fz',
  '/obrabotka-pdn',
  '/obuchenie-grazhdan-predpensionnogo-vozrasta',
  '/novye-vozmozhnosti-dlya-kazhdogo',
  '/partnery',
  '/edinoe-okno-dlya-molodykh-semey',
  '/news-departament',
  '/mnogofunktsionalnyy-tsentr-prikladnykh-kvalifikatsiy',
  '/it-masterskie',
  '/proekt-uspekh-kazhdogo-rebenka',
  '/sedo-obrazovanie-33',
  '/elektronnoe-obuchenie',
  '/vospitatelnaya-rabota',
  '/demonstratsionnyy-ekzamen',
  '/akkreditatsiya',
  '/pro-corrup',
  '/postuplenie',

  // ===================== СПЕЦИАЛЬНЫЕ СТРАНИЦЫ =====================
  '/news',
  '/contacts',
  '/it-cube',
];

/**
 * Загрузка HTML страницы по URL
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      timeout: 15000,
    }, (res) => {
      // Обработка редиректов
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : BASE_URL + res.headers.location;
        fetchPage(redirectUrl).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        resolve({ error: `HTTP ${res.statusCode}`, html: '' });
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const html = Buffer.concat(chunks).toString('utf-8');
        resolve({ html, error: null });
      });
      res.on('error', reject);
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

/**
 * Извлечение контента из HTML страницы
 */
function extractContent(html, pagePath) {
  const $ = cheerio.load(html);

  // Удаляем ненужные элементы
  $('script, style, nav, footer, header, noscript, iframe, svg').remove();

  // Извлекаем заголовок страницы
  const title = $('title').text().trim() ||
    $('h1').first().text().trim() ||
    '';

  // Извлекаем мета-описание
  const description = $('meta[name="description"]').attr('content') || '';

  // Извлекаем основной контент
  // Пробуем найти основной контейнер с контентом
  let mainContent = '';

  // Ищем основные контейнеры контента
  const contentSelectors = [
    'main',
    '.content',
    '.page-content',
    '.main-content',
    '#content',
    'article',
    '.container',
    'body',
  ];

  let $content = null;
  for (const selector of contentSelectors) {
    const el = $(selector);
    if (el.length > 0) {
      $content = el;
      break;
    }
  }

  if (!$content) {
    $content = $('body');
  }

  // Извлекаем все заголовки и текстовые блоки
  const sections = [];

  // Извлекаем h1
  const h1 = $('h1').first().text().trim();
  if (h1) {
    sections.push({ type: 'h1', text: h1 });
  }

  // Извлекаем h2
  $('h2').each((_, el) => {
    const text = $(el).text().trim();
    if (text) {
      sections.push({ type: 'h2', text });
    }
  });

  // Извлекаем h3
  $('h3').each((_, el) => {
    const text = $(el).text().trim();
    if (text) {
      sections.push({ type: 'h3', text });
    }
  });

  // Извлекаем абзацы
  $('p').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 5) {
      sections.push({ type: 'paragraph', text });
    }
  });

  // Извлекаем списки
  $('ul, ol').each((_, listEl) => {
    const items = [];
    $(listEl).find('li').each((_, liEl) => {
      const text = $(liEl).text().trim();
      if (text) {
        items.push(text);
      }
    });
    if (items.length > 0) {
      sections.push({ type: 'list', items });
    }
  });

  // Извлекаем таблицы
  $('table').each((_, tableEl) => {
    const rows = [];
    $(tableEl).find('tr').each((_, trEl) => {
      const cells = [];
      $(trEl).find('td, th').each((_, cellEl) => {
        cells.push($(cellEl).text().trim());
      });
      if (cells.length > 0) {
        rows.push(cells);
      }
    });
    if (rows.length > 0) {
      sections.push({ type: 'table', rows });
    }
  });

  // Извлекаем ссылки
  const links = [];
  $content.find('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    if (href && text && !href.startsWith('#') && !href.startsWith('javascript:')) {
      const fullUrl = href.startsWith('http') ? href : BASE_URL + href;
      links.push({ text, url: fullUrl });
    }
  });

  // Извлекаем изображения
  const images = [];
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    const alt = $(el).attr('alt') || '';
    if (src) {
      const fullUrl = src.startsWith('http') ? src : BASE_URL + src;
      images.push({ src: fullUrl, alt });
    }
  });

  // Общий текст страницы
  const fullText = $content.text()
    .replace(/\s+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();

  return {
    path: pagePath,
    url: BASE_URL + pagePath,
    title,
    description,
    h1,
    sections,
    links: links.slice(0, 50), // Ограничиваем количество ссылок
    images: images.slice(0, 30), // Ограничиваем количество изображений
    fullText: fullText.substring(0, 5000), // Ограничиваем длину полного текста
    htmlLength: html.length,
  };
}

/**
 * Задержка между запросами
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Основная функция
 */
async function main() {
  console.log(`Начинаем извлечение контента с ${BASE_URL}`);
  console.log(`Всего страниц для обработки: ${PAGES.length}`);
  console.log('---');

  const results = {};
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < PAGES.length; i++) {
    const pagePath = PAGES[i];
    const fullUrl = BASE_URL + pagePath;

    process.stdout.write(`[${i + 1}/${PAGES.length}] ${pagePath} ... `);

    try {
      const { html, error } = await fetchPage(fullUrl);

      if (error) {
        console.log(`ОШИБКА: ${error}`);
        results[pagePath] = { error, path: pagePath, url: fullUrl };
        errorCount++;
      } else {
        const content = extractContent(html, pagePath);
        results[pagePath] = content;
        console.log(`OK (${content.sections.length} секций, ${content.htmlLength} байт)`);
        successCount++;
      }
    } catch (err) {
      console.log(`ОШИБКА: ${err.message}`);
      results[pagePath] = { error: err.message, path: pagePath, url: fullUrl };
      errorCount++;
    }

    // Задержка между запросами чтобы не перегружать сервер
    if (i < PAGES.length - 1) {
      await delay(500);
    }
  }

  console.log('---');
  console.log(`Успешно: ${successCount}, Ошибок: ${errorCount}`);

  // Сохраняем результаты
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'scraped');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Сохраняем полный JSON
  const outputPath = path.join(outputDir, 'polcol-content.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nПолный контент сохранён: ${outputPath}`);

  // Создаём упрощённую версию с текстовым контентом
  const simplifiedContent = {};
  for (const [pagePath, data] of Object.entries(results)) {
    if (data.error) {
      simplifiedContent[pagePath] = { error: data.error };
      continue;
    }

    simplifiedContent[pagePath] = {
      title: data.title,
      description: data.description,
      h1: data.h1,
      sections: data.sections,
      links: data.links,
      images: data.images,
    };
  }

  const simplifiedPath = path.join(outputDir, 'polcol-content-simplified.json');
  fs.writeFileSync(simplifiedPath, JSON.stringify(simplifiedContent, null, 2), 'utf-8');
  console.log(`Упрощённый контент сохранён: ${simplifiedPath}`);

  // Создаём текстовую версию для каждой страницы
  const textDir = path.join(outputDir, 'text');
  if (!fs.existsSync(textDir)) {
    fs.mkdirSync(textDir, { recursive: true });
  }

  for (const [pagePath, data] of Object.entries(results)) {
    if (data.error || !data.sections) continue;

    const fileName = pagePath === '/' ? 'index.txt' : pagePath.replace(/\//g, '_').replace(/^_/, '') + '.txt';
    let textContent = `# ${data.title || data.h1 || pagePath}\n`;
    textContent += `URL: ${data.url}\n`;
    if (data.description) textContent += `Описание: ${data.description}\n`;
    textContent += '\n';

    for (const section of data.sections) {
      if (section.type === 'h1') {
        textContent += `# ${section.text}\n\n`;
      } else if (section.type === 'h2') {
        textContent += `## ${section.text}\n\n`;
      } else if (section.type === 'h3') {
        textContent += `### ${section.text}\n\n`;
      } else if (section.type === 'paragraph') {
        textContent += `${section.text}\n\n`;
      } else if (section.type === 'list') {
        for (const item of section.items) {
          textContent += `- ${item}\n`;
        }
        textContent += '\n';
      } else if (section.type === 'table') {
        for (const row of section.rows) {
          textContent += `| ${row.join(' | ')} |\n`;
        }
        textContent += '\n';
      }
    }

    fs.writeFileSync(path.join(textDir, fileName), textContent, 'utf-8');
  }

  console.log(`Текстовые файлы сохранены в: ${textDir}`);
  console.log('\nГотово!');
}

main().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});