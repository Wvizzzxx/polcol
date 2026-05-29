import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Конфигурация этапов приёмной комиссии
 * Даты можно изменить при необходимости
 */
const ADMISSION_STAGES = [
  {
    id: 'pre',
    label: 'До начала приёмной комиссии',
    start: new Date('2026-06-20T09:00:00'),
    end: null,
  },
  {
    id: 'docs',
    label: 'Приём документов',
    start: new Date('2026-06-20T09:00:00'),
    end: new Date('2026-08-15T18:00:00'),
  },
  {
    id: 'exams',
    label: 'Вступительные испытания',
    start: new Date('2026-07-15T09:00:00'),
    end: new Date('2026-08-10T18:00:00'),
  },
  {
    id: 'enrollment',
    label: 'Зачисление',
    start: new Date('2026-08-16T09:00:00'),
    end: new Date('2026-08-31T18:00:00'),
  },
  {
    id: 'post',
    label: 'Приёмная комиссия завершена',
    start: new Date('2026-08-31T18:00:00'),
    end: null,
  },
];

/**
 * Определяет текущий этап приёмной комиссии
 */
function getCurrentStage(now) {
  for (let i = 0; i < ADMISSION_STAGES.length; i++) {
    const stage = ADMISSION_STAGES[i];
    if (stage.end === null) {
      // Последний этап (без даты окончания)
      if (now >= stage.start) return stage;
    } else if (now >= stage.start && now <= stage.end) {
      return stage;
    }
  }
  return ADMISSION_STAGES[0]; // По умолчанию — до начала
}

/**
 * Форматирует оставшееся время в объект { days, hours, minutes, seconds }
 */
function getTimeRemaining(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

/**
 * Блок времени (дни, часы и т.д.)
 */
function TimeBlock({ value, label }) {
  const strValue = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border border-white/20 shadow-lg">
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-mono tracking-wider">
            {strValue}
          </span>
        </div>
      </div>
      <span className="text-white/60 text-xs sm:text-sm mt-2 uppercase tracking-widest font-medium">
        {label}
      </span>
    </div>
  );
}

/**
 * Разделитель между блоками времени
 */
function TimeSeparator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-1 sm:px-2 pb-6">
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
    </div>
  );
}

/**
 * Основной компонент таймера
 */
const AdmissionTimer = () => {
  const [now, setNow] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const fullscreenRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Скрыть подсказку через 5 секунд
  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const currentStage = getCurrentStage(now);

  // Определяем, до какого момента считать обратный отсчёт
  let targetDate = null;
  let countdownLabel = '';

  if (currentStage.id === 'pre') {
    // До начала — считаем до начала приёма документов
    targetDate = ADMISSION_STAGES[1].start;
    countdownLabel = 'до начала приёма документов';
  } else if (currentStage.id === 'docs') {
    // Во время приёма документов — считаем до конца приёма
    targetDate = currentStage.end;
    countdownLabel = 'до окончания приёма документов';
  } else if (currentStage.id === 'exams') {
    // Вступительные испытания — считаем до конца испытаний
    targetDate = currentStage.end;
    countdownLabel = 'до окончания испытаний';
  } else if (currentStage.id === 'enrollment') {
    // Зачисление — считаем до конца зачисления
    targetDate = currentStage.end;
    countdownLabel = 'до окончания зачисления';
  }

  const timeRemaining = targetDate ? getTimeRemaining(targetDate) : null;

  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsFullscreen(false);
    }
  };

  // Форматируем дату начала приёма документов
  const startDate = ADMISSION_STAGES[1].start;
  const startDay = startDate.getDate();
  const startMonth = startDate.toLocaleString('ru-RU', { month: 'long' });
  const startYear = startDate.getFullYear();

  // Таймер-контент
  const timerContent = (
    <div className="flex flex-col items-center">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 mb-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider">
            {currentStage.label}
          </span>
        </div>
        <h3 className="text-white text-lg sm:text-xl font-bold">
          {currentStage.id === 'post'
            ? 'Приёмная комиссия завершилась'
            : countdownLabel}
        </h3>
      </div>

      {/* Блоки времени */}
      {timeRemaining && timeRemaining.total > 0 && (
        <div className="flex items-center justify-center gap-0 sm:gap-1">
          <TimeBlock value={timeRemaining.days} label="дней" />
          <TimeSeparator />
          <TimeBlock value={timeRemaining.hours} label="часов" />
          <TimeSeparator />
          <TimeBlock value={timeRemaining.minutes} label="минут" />
          <TimeSeparator />
          <TimeBlock value={timeRemaining.seconds} label="секунд" />
        </div>
      )}

      {timeRemaining && timeRemaining.total <= 0 && currentStage.id !== 'post' && (
        <div className="text-white/80 text-lg font-medium">
          Этап завершается в данный момент
        </div>
      )}

      {/* Дата начала приёма документов внизу */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center">
        <p className="text-white/50 text-xs sm:text-sm">
          Дата начала приёмной комиссии:{' '}
          <span className="text-accent font-semibold">
            {startDay} {startMonth} {startYear} г.
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Компактный таймер на странице */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          onClick={handleFullscreenToggle}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-gradient-to-br from-official-900 via-official-800 to-official-900 p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:border-accent/30"
        >
          {/* Фоновые декорации */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="relative z-10">{timerContent}</div>

          {/* Подсказка "нажмите для полноэкранного режима" */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-2 right-4 text-white/30 text-xs flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Нажмите для полноэкранного режима
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover-эффект иконки полноэкранного режима */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Полноэкранное модальное окно */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={fullscreenRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', damping: 20 }}
              className="relative w-full max-w-2xl mx-auto"
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="bg-gradient-to-br from-official-900 via-official-800 to-official-900 rounded-3xl p-8 sm:p-10 md:p-12 border border-white/10 shadow-2xl">
                {/* Фоновые декорации */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div
                    className="w-full h-full opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-official-600/20 blur-3xl"
                  />
                </div>

                <div className="relative z-10">{timerContent}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdmissionTimer;