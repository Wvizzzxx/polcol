/**
 * Скрипт для скачивания всех изображений с polcol.ru
 * Сосредотачивается на div.slick-track (слайдеры) и всех остальных изображениях
 */

const https = require('https');
const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://polcol.ru';
const OUTPUT_DIR = path.join(__dirname, '..', 'images', 'polcol');
const URL_MAP_PATH = path.join(__dirname, '..', 'src', 'data', 'polcol-images.json');

// Страницы для сканирования
const PAGES_TO_SCAN = [
  '/',
  '/about',
  '/o-kolledzhe/foto-i-videomaterialy',
  '/abiturientam/o-kolledzhe',
  '/o-kolledzhe/dostizheniya',
];

/**
 * Загрузка HTML страницы
 */
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      timeout: 20000,
    }, (res) => {
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
 * Скачивание изображения
 */
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': BASE_URL,
      },
      timeout: 30000,
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const redirectUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : BASE_URL + res.headers.location;
        downloadImage(redirectUrl, filePath).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve({ url, filePath, size: res.headers['content-length'] || 'unknown' });
      });
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

/**
 * Извлечение изображений из HTML, с особым вниманием к slick-track
 */
function extractAllImages(html, pageUrl) {
  const $ = cheerio.load(html);
  const images = [];
  const seen = new Set();

  // 1) Изображения из div.slick-track (слайдеры)
  $('.slick-track').each((_, trackEl) => {
    $(trackEl).find('img').each((_, imgEl) => {
      let src = $(imgEl).attr('src') || $(imgEl).attr('data-lazy') || $(imgEl).attr('data-src') || '';
      if (!src) return;
      src = normalizeUrl(src, pageUrl);
      if (!seen.has(src)) {
        seen.add(src);
        images.push({
          src,
          alt: $(imgEl).attr('alt') || '',
          source: 'slick-track',
          context: $(imgEl).closest('.slick-slide').text().trim().substring(0, 200),
        });
      }
    });
  });

  // 2) Все изображения на странице (включая background-image)
  $('img').each((_, imgEl) => {
    let src = $(imgEl).attr('src') || $(imgEl).attr('data-lazy') || $(imgEl).attr('data-src') || '';
    if (!src) return;
    src = normalizeUrl(src, pageUrl);
    if (!seen.has(src)) {
      seen.add(src);
      images.push({
        src,
        alt: $(imgEl).attr('alt') || '',
        source: 'img-tag',
        context: $(imgEl).parent().text().trim().substring(0, 200),
      });
    }
  });

  // 3) CSS background-image
  $('[style*="background"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const bgMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/g);
    if (bgMatch) {
      bgMatch.forEach(match => {
        const urlMatch = match.match(/url\(['"]?([^'")]+)['"]?\)/);
        if (urlMatch && urlMatch[1]) {
          const src = normalizeUrl(urlMatch[1], pageUrl);
          if (!seen.has(src)) {
            seen.add(src);
            images.push({
              src,
              alt: '',
              source: 'background-image',
              context: '',
            });
          }
        }
      });
    }
  });

  return images;
}

/**
 * Нормализация URL изображения
 */
function normalizeUrl(src, pageUrl) {
  if (!src) return '';
  if (src.startsWith('data:')) return '';
  if (src.startsWith('//')) return 'https:' + src;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return BASE_URL + src;
  // Относительный путь
  const base = new URL(pageUrl);
  return base.origin + path.join(base.pathname, '..', src).replace(/\\/g, '/');
}

/**
 * Генерация безопасного имени файла
 */
function safeFilename(url, index) {
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  const basename = path.basename(new URL(url).pathname, ext)
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ_-]/g, '_')
    .substring(0, 60);
  return `${String(index).padStart(3, '0')}_${basename || 'image'}${ext}`;
}

/**
 * Задержка
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Проверка, является ли изображение значком/логотипом
 */
function isSmallIcon(img) {
  const src = img.src.toLowerCase();
  return src.includes('icon') || src.includes('logo') || src.includes('favicon') ||
         src.includes('arrow') || src.includes('sprite') || src.includes('blank.') ||
         src.endsWith('.gif') && src.includes('pixel');
}

/**
 * Основная функция
 */
async function main() {
  console.log('=== Скачивание изображений с polcol.ru ===\n');

  // Создаём директорию для изображений
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const allImages = new Map(); // src -> metadata
  const imageStats = { slickTrack: 0, total: 0, downloaded: 0, skipped: 0, errors: 0 };

  // Собираем изображения со всех страниц
  for (const pagePath of PAGES_TO_SCAN) {
    const url = BASE_URL + pagePath;
    process.stdout.write(`Сканирую ${pagePath} ... `);

    try {
      const { html, error } = await fetchPage(url);
      if (error) {
        console.log(`ОШИБКА: ${error}`);
        continue;
      }

      const images = extractAllImages(html, url);
      let slickCount = 0;

      for (const img of images) {
        if (!allImages.has(img.src)) {
          allImages.set(img.src, img);
          if (img.source === 'slick-track') {
            slickCount++;
            imageStats.slickTrack++;
          }
        }
      }

      imageStats.total = allImages.size;
      console.log(`OK: ${images.length} изображений (${slickCount} из slick-track)`);
    } catch (err) {
      console.log(`ОШИБКА: ${err.message}`);
    }

    await delay(800);
  }

  console.log(`\n--- Всего найдено уникальных изображений: ${allImages.size} ---`);
  console.log(`   Из slick-track: ${imageStats.slickTrack}`);

  // Фильтруем: пропускаем мелкие иконки и т.д.
  const toDownload = [];
  let index = 0;
  for (const [src, meta] of allImages) {
    if (isSmallIcon(meta)) {
      imageStats.skipped++;
      continue;
    }
    index++;
    const filename = safeFilename(src, index);
    toDownload.push({
      src,
      filename,
      localPath: `/images/polcol/${filename}`,
      ...meta,
    });
  }

  console.log(`\nК скачиванию: ${toDownload.length} изображений (пропущено ${imageStats.skipped} иконок/логотипов)\n`);

  // Скачиваем изображения
  const urlMap = {};
  for (let i = 0; i < toDownload.length; i++) {
    const img = toDownload[i];
    const filePath = path.join(OUTPUT_DIR, img.filename);

    // Пропускаем если уже скачано
    if (fs.existsSync(filePath)) {
      console.log(`[${i + 1}/${toDownload.length}] Уже существует: ${img.filename}`);
      urlMap[img.src] = img.localPath;
      imageStats.downloaded++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${toDownload.length}] ${img.filename} ... `);

    try {
      await downloadImage(img.src, filePath);
      urlMap[img.src] = img.localPath;
      imageStats.downloaded++;
      console.log('OK');
    } catch (err) {
      imageStats.errors++;
      console.log(`ОШИБКА: ${err.message}`);
    }

    // Небольшая задержка чтобы не перегружать сервер
    if (i < toDownload.length - 1) {
      await delay(300);
    }
  }

  // Сохраняем маппинг URL -> локальный путь
  if (!fs.existsSync(path.dirname(URL_MAP_PATH))) {
    fs.mkdirSync(path.dirname(URL_MAP_PATH), { recursive: true });
  }
  fs.writeFileSync(URL_MAP_PATH, JSON.stringify(urlMap, null, 2), 'utf-8');

  console.log('\n=== Статистика ===');
  console.log(`Всего изображений на страницах: ${imageStats.total}`);
  console.log(`Из slick-track: ${imageStats.slickTrack}`);
  console.log(`Скачано: ${imageStats.downloaded}`);
  console.log(`Ошибок: ${imageStats.errors}`);
  console.log(`Пропущено (иконки): ${imageStats.skipped}`);
  console.log(`\nМаппинг URL сохранён: ${URL_MAP_PATH}`);
  console.log(`Изображения сохранены в: ${OUTPUT_DIR}`);
  console.log('\nГотово!');
}

main().catch(err => {
  console.error('Критическая ошибка:', err);
  process.exit(1);
});