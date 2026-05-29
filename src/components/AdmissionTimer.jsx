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
      if (now >= stage.start) return stage;
    } else if (now >= stage.start && now <= stage.end) {
      return stage;
    }
  }
  return ADMISSION_STAGES[0];
}

/**
 * Форматирует оставшееся время
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
 * Блок времени — идеально адаптивный
 * mobile: 60x60px, tablet: 76x76px, desktop: 90x90px, fullscreen: 110x110px
 */
function TimeBlock({ value, label, isFullscreen = false }) {
  const strValue = String(value).padStart(2, '0');

  const sizeClasses = isFullscreen
    ? 'w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px]'
    : 'w-[58px] h-[58px] sm:w-[68px] sm:h-[68px] md:w-[82px] md:h-[82px] lg:w-[90px] lg:h-[90px]';

  const fontClasses = isFullscreen
    ? 'text-3xl sm:text-4xl md:text-[2.75rem]'
    : 'text-xl sm:text-2xl md:text-3xl lg:text-[2rem]';

  const labelClasses = isFullscreen
    ? 'text-xs sm:text-sm mt-3'
    : 'text-[0.6rem] sm:text-xs md:text-sm mt-1.5 md:mt-2';

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          relative rounded-2xl ${sizeClasses}
          bg-gradient-to-b from-white/[0.12] to-white/[0.06]
          backdrop-blur-md
          flex items-center justify-center
          border border-white/[0.15]
          shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]
          transition-all duration-500
        `}
      >
        {/* Внутренний глянцевый блик */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-2xl" />
        </div>
        <span
          className={`
            relative z-10 ${fontClasses}
            font-extrabold text-white
            tabular-nums tracking-tight
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]
          `}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {strValue}
        </span>
      </div>
      <span
        className={`
          ${labelClasses}
          text-white/50 uppercase tracking-[0.2em] font-semibold
          transition-all duration-500
        `}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Разделитель — пульсирующие точки
 */
function TimeSeparator({ isFullscreen = false }) {
  const dotSize = isFullscreen ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5 md:w-2 md:h-2';
  const gap = isFullscreen ? 'gap-3' : 'gap-1.5 md:gap-2';

  return (
    <div className={`flex flex-col items-center justify-center ${gap} px-1 sm:px-1.5 md:px-2`}>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className={`${dotSize} rounded-full bg-accent`}
      />
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className={`${dotSize} rounded-full bg-accent`}
      />
    </div>
  );
}

/**
 * Шкала прогресса этапа
 */
function StageProgress({ currentStage }) {
  const stages = ['pre', 'docs', 'exams', 'enrollment', 'post'];
  const stageIndex = stages.indexOf(currentStage.id);
  const progress = Math.min(((stageIndex + 1) / stages.length) * 100, 100);

  return (
    <div className="w-full max-w-md mx-auto mt-6 md:mt-8">
      {/* Прогресс-бар */}
      <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/60 to-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      {/* Точки этапов */}
      <div className="relative flex justify-between mt-1">
        {stages.map((stage, idx) => (
          <div
            key={stage}
            className="flex flex-col items-center"
            style={{ width: 0 }}
          >
            <div
              className={`
                w-2 h-2 md:w-2.5 md:h-2.5 rounded-full -mt-[9px] md:-mt-[11px]
                transition-all duration-500
                ${idx <= stageIndex
                  ? 'bg-accent shadow-[0_0_8px_rgba(197,165,90,0.5)]'
                  : 'bg-white/20'
                }
              `}
            />
          </div>
        ))}
      </div>
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

  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timeout);
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Блокируем скролл в полноэкранном режиме
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  const currentStage = getCurrentStage(now);

  let targetDate = null;
  let countdownLabel = '';

  if (currentStage.id === 'pre') {
    targetDate = ADMISSION_STAGES[1].start;
    countdownLabel = 'до начала приёма документов';
  } else if (currentStage.id === 'docs') {
    targetDate = currentStage.end;
    countdownLabel = 'до окончания приёма документов';
  } else if (currentStage.id === 'exams') {
    targetDate = currentStage.end;
    countdownLabel = 'до окончания испытаний';
  } else if (currentStage.id === 'enrollment') {
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

  // Генерируем контент таймера (переиспользуется в компактном и полноэкранном режиме)
  const renderTimerContent = (isFullscreenMode = false) => (
    <div className="flex flex-col items-center w-full">
      {/* Бейдж этапа */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`
          inline-flex items-center gap-2
          px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2
          rounded-full
          bg-gradient-to-r from-accent/20 to-accent/10
          border border-accent/30
          mb-3 md:mb-4
          ${isFullscreenMode ? 'shadow-[0_0_20px_rgba(197,165,90,0.15)]' : ''}
        `}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_rgba(197,165,90,0.6)]"
        />
        <span className={`
          text-accent uppercase font-bold tracking-wider
          ${isFullscreenMode
            ? 'text-xs sm:text-sm md:text-base'
            : 'text-[0.65rem] sm:text-xs md:text-sm'
          }
        `}>
          {currentStage.label}
        </span>
      </motion.div>

      {/* Заголовок */}
      <h3 className={`
        text-white font-bold text-center leading-snug
        ${isFullscreenMode
          ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8'
          : 'text-base sm:text-lg md:text-xl lg:text-[1.35rem] mb-5 md:mb-6'
        }
      `}>
        {currentStage.id === 'post'
          ? 'Приёмная комиссия завершилась'
          : countdownLabel}
      </h3>

      {/* Блоки обратного отсчёта */}
      {timeRemaining && timeRemaining.total > 0 && (
        <div className={`
          flex items-center justify-center
          ${isFullscreenMode ? 'gap-0 sm:gap-1' : 'gap-0'}
        `}>
          <TimeBlock value={timeRemaining.days} label="дней" isFullscreen={isFullscreenMode} />
          <TimeSeparator isFullscreen={isFullscreenMode} />
          <TimeBlock value={timeRemaining.hours} label="часов" isFullscreen={isFullscreenMode} />
          <TimeSeparator isFullscreen={isFullscreenMode} />
          <TimeBlock value={timeRemaining.minutes} label="минут" isFullscreen={isFullscreenMode} />
          <TimeSeparator isFullscreen={isFullscreenMode} />
          <TimeBlock value={timeRemaining.seconds} label="секунд" isFullscreen={isFullscreenMode} />
        </div>
      )}

      {timeRemaining && timeRemaining.total <= 0 && currentStage.id !== 'post' && (
        <div className={`
          text-white/80 font-medium text-center
          ${isFullscreenMode ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}
        `}>
          Этап завершается в данный момент
        </div>
      )}

      {/* Шкала прогресса */}
      <StageProgress currentStage={currentStage} />

      {/* Дата начала приёмной комиссии */}
      <div className={`
        mt-5 md:mt-6 pt-4 border-t border-white/10 text-center w-full
        max-w-md mx-auto
      `}>
        <p className={`
          text-white/40
          ${isFullscreenMode
            ? 'text-xs sm:text-sm md:text-base'
            : 'text-[0.65rem] sm:text-xs md:text-sm'
          }
        `}>
          Дата начала приёмной комиссии:{' '}
          <span className="text-accent font-bold">
            {startDay} {startMonth} {startYear} г.
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== Компактный таймер на странице ===== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <div
          onClick={handleFullscreenToggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFullscreenToggle(); }}
          className="
            cursor-pointer group
            relative overflow-hidden
            rounded-2xl md:rounded-3xl
            bg-gradient-to-br from-official-900 via-official-800 to-official-900
            p-5 sm:p-7 md:p-9 lg:p-10
            border border-white/10
            shadow-[0_8px_40px_rgba(0,0,0,0.3)]
            hover:shadow-[0_12px_60px_rgba(0,0,0,0.4)]
            hover:border-accent/20
            transition-all duration-500 ease-out
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-official-900
            select-none
          "
        >
          {/* Фоновая текстура */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          {/* Плавающий световой акцент */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.06, 0.14, 0.06],
              x: [0, 10, 0],
              y: [0, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-12 -right-12 w-56 h-56 md:w-72 md:h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              y: [0, -12, 0],
              opacity: [0.04, 0.1, 0.04],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 -left-8 w-40 h-40 md:w-56 md:h-56 rounded-full bg-official-500/15 blur-3xl pointer-events-none"
          />

          {/* Контент */}
          <div className="relative z-10">
            {renderTimerContent(false)}
          </div>

          {/* Подсказка "нажмите для полноэкранного режима" */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="
                  absolute bottom-2.5 right-3 sm:bottom-3 sm:right-4 md:bottom-4 md:right-5
                  text-white/25 text-[0.6rem] sm:text-xs
                  flex items-center gap-1.5
                  pointer-events-none
                "
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Нажмите для полноэкранного режима
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover-иконка полноэкранного режима */}
          <div className="
            absolute top-3 right-3 sm:top-4 sm:right-4 md:top-5 md:right-5
            opacity-0 group-hover:opacity-100
            group-active:scale-95
            transition-all duration-300
          ">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] flex items-center justify-center transition-colors backdrop-blur-sm">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== Полноэкранное модальное окно ===== */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={fullscreenRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
            className="
              fixed inset-0 z-50
              flex items-center justify-center
              bg-black/85 backdrop-blur-md
              p-4 sm:p-6 md:p-8
            "
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
            >
              {/* Кнопка закрытия */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setIsFullscreen(false)}
                className="
                  absolute -top-11 sm:-top-12 right-0
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full
                  bg-white/[0.08] hover:bg-white/[0.18]
                  active:bg-white/[0.25]
                  flex items-center justify-center
                  transition-all duration-200
                  backdrop-blur-sm border border-white/10
                  z-10
                "
                aria-label="Закрыть"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Карточка таймера */}
              <div className="
                relative overflow-hidden
                bg-gradient-to-br from-official-900 via-official-800 to-official-900
                rounded-2xl sm:rounded-3xl
                p-6 sm:p-8 md:p-10 lg:p-12
                border border-white/10
                shadow-[0_20px_80px_rgba(0,0,0,0.6)]
              ">
                {/* Фоновые декорации */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
                  <div
                    className="w-full h-full opacity-15"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.04, 0.12, 0.04] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/10 blur-3xl"
                  />
                  <motion.div
                    animate={{ y: [0, -15, 0], opacity: [0.03, 0.08, 0.03] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute bottom-10 left-10 w-52 h-52 md:w-72 md:h-72 rounded-full bg-official-600/20 blur-3xl"
                  />
                  {/* Тонкая декоративная линия сверху */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>

                {/* Контент */}
                <div className="relative z-10">
                  {renderTimerContent(true)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdmissionTimer;