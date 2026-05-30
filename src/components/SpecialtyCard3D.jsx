import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  IconUsers, IconCoin, IconClock, IconTrophy, 
  IconCheck, IconBuilding, IconSchool,
  IconDeviceLaptop, IconGlobe, IconChartBar, IconSettings,
  IconRobot, IconDeviceDesktop, IconTool, IconBolt,
  IconClipboardText
} from '@tabler/icons-react'

const SPECIALTY_DETAILS = {
  '09.02.07': {
    description: 'Подготовка специалистов в области разработки и сопровождения программных продуктов, баз данных, веб-приложений и мобильных приложений.',
    skills: ['Python', 'JavaScript', 'SQL', 'Git', 'React/Vue'],
    careers: ['Программист', 'Веб-разработчик', 'QA-инженер', 'Аналитик БД'],
    duration: '4 года',
    form: 'Очная',
    qual: 'Техник-программист',
    color: 'from-blue-500 to-indigo-600',
    icon: IconDeviceLaptop,
  },
  '09.02.06': {
    description: 'Настройка и администрирование компьютерных сетей, серверов, систем безопасности и облачных инфраструктур.',
    skills: ['Linux', 'Windows Server', 'Сети', 'Docker', 'VMware'],
    careers: ['Системный администратор', 'Сетевой инженер', 'DevOps-инженер'],
    duration: '4 года',
    form: 'Очная',
    qual: 'Техник-администратор',
    color: 'from-cyan-500 to-blue-600',
    icon: IconGlobe,
  },
  '09.02.05': {
    description: 'Применение информационных технологий для решения задач бизнеса: автоматизация процессов, анализ данных, разработка ИТ-решений.',
    skills: ['Excel/Google Sheets', 'SQL', 'Python', '1С', 'BI-инструменты'],
    careers: ['Специалист по ИТ', 'Аналитик данных', '1С-специалист'],
    duration: '4 года',
    form: 'Очная / Заочная',
    qual: 'Техник-программист',
    color: 'from-violet-500 to-purple-600',
    icon: IconChartBar,
  },
  '15.02.08': {
    description: 'Проектирование и изготовление деталей и узлов машин на современном металлорежущем оборудовании с ЧПУ.',
    skills: ['Autocad', 'SolidWorks', 'ЧПУ', 'Технология металлов', 'Чертежи'],
    careers: ['Оператор ЧПУ', 'Техник-технолог', 'Наладчик оборудования'],
    duration: '4 года 10 мес.',
    form: 'Очная',
    qual: 'Техник-технолог',
    color: 'from-orange-500 to-red-600',
    icon: IconSettings,
  },
  '15.02.10': {
    description: 'Проектирование, сборка и программирование промышленных роботов и мехатронных систем.',
    skills: ['Робототехника', 'Arduino/STM32', 'Программирование ПЛК', 'Электроника'],
    careers: ['Техник-робототехник', 'Наладчик роботов', 'Инженер по автоматизации'],
    duration: '4 года',
    form: 'Очная',
    qual: 'Техник-мехатроник',
    color: 'from-emerald-500 to-teal-600',
    icon: IconRobot,
  },
  '38.02.01': {
    description: 'Ведение бухгалтерского учёта, формирование отчётности, работа с ERP-системами и налоговое планирование.',
    skills: ['1С:Бухгалтерия', 'Налоговый кодекс', 'Excel', 'Кадры', 'Отчётность'],
    careers: ['Бухгалтер', 'Финансовый аналитик', 'Экономист', 'Кадровик'],
    duration: '2 года 10 мес.',
    form: 'Очная / Заочная',
    qual: 'Техник-бухгалтер',
    color: 'from-amber-500 to-orange-600',
    icon: IconCoin,
  },
  '09.02.02': {
    description: 'Монтаж, настройка, ремонт и техническое обслуживание компьютерных систем и сетей.',
    skills: ['Железо', 'Сети', 'Диагностика', 'Windows/Linux', 'Аппаратура'],
    careers: ['Техник-системный администратор', 'Мастер по ремонту ПК'],
    duration: '4 года',
    form: 'Очная',
    qual: 'Техник по вычислительной технике',
    color: 'from-slate-500 to-gray-600',
    icon: IconDeviceDesktop,
  },
  '08.02.01': {
    description: 'Строительство, реконструкция и эксплуатация зданий и сооружений. Работа с проектной документацией.',
    skills: ['Автокад', 'Строительные нормы', 'Сметы', 'Проектирование', 'Экспертиза'],
    careers: ['Техник-строитель', 'Прораб', 'Сметчик', 'Инженер ПТО'],
    duration: '4 года 10 мес.',
    form: 'Очная',
    qual: 'Техник-строитель',
    color: 'from-yellow-500 to-amber-600',
    icon: IconBuilding,
  },
  '10.02.04': {
    description: 'Проектирование, монтаж и обслуживание электрооборудования промышленных и гражданских объектов.',
    skills: ['Электротехника', 'Схемы', 'Монтаж', 'Безопасность', 'Оборудование'],
    careers: ['Электромонтёр', 'Техник-электрик', 'Наладчик электрооборудования'],
    duration: '4 года 10 мес.',
    form: 'Очная',
    qual: 'Техник-электрик',
    color: 'from-yellow-400 to-orange-500',
    icon: IconBolt,
  },
  '23.02.03': {
    description: 'Монтаж и обслуживание систем отопления, водоснабжения, канализации, вентиляции и кондиционирования.',
    skills: ['Вентиляция', 'Отопление', 'Сантехника', 'Проектирование', 'Монтаж'],
    careers: ['Слесарь-сантехник', 'Мастер ВиК', 'Техник по вентиляции'],
    duration: '4 года 10 мес.',
    form: 'Очная',
    qual: 'Техник-монтажник',
    color: 'from-teal-400 to-cyan-500',
    icon: IconTool,
  },
  '19.02.09': {
    description: 'Управление гостиничным бизнесом: бронирование, сервис, маркетинг и управление персоналом в сфере гостеприимства.',
    skills: ['Менеджмент', 'Маркетинг', 'Сервис', 'Сертификация', 'Ин. язык'],
    careers: ['Менеджер гостиницы', 'Администратор', 'Специалист по туризму'],
    duration: '2 года 10 мес.',
    form: 'Очная',
    qual: 'Менеджер (гостиничный бизнес)',
    color: 'from-pink-500 to-rose-600',
    icon: IconBuilding,
  },
  '43.02.10': {
    description: 'Организация обслуживания в ресторанах, отелях и на транспорте. Культура гостеприимства и сервисные стандарты.',
    skills: ['Официантский сервис', 'Барное дело', 'Кухни мира', 'Ин. язык'],
    careers: ['Официант', 'Бармен', 'Специалист по гостеприимству'],
    duration: '2 года 10 мес.',
    form: 'Очная',
    qual: 'Специалист по гостеприимству',
    color: 'from-rose-400 to-pink-500',
    icon: IconClipboardText,
  },
}

export default function SpecialtyCard3D({ specialty, avgScore, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const details = SPECIALTY_DETAILS[specialty.code] || {
    description: 'Подробная информация о специальности',
    skills: [],
    careers: [],
    duration: '4 года',
    form: 'Очная',
    qual: 'Техник',
    color: 'from-gray-500 to-gray-600',
    icon: IconClipboardText,
  }

  const chanceStyles = {
    high: { bg: 'bg-emerald-500', text: 'text-emerald-50', border: 'border-emerald-400', glow: 'shadow-emerald-500/30' },
    medium: { bg: 'bg-amber-500', text: 'text-amber-50', border: 'border-amber-400', glow: 'shadow-amber-500/30' },
    low: { bg: 'bg-orange-500', text: 'text-orange-50', border: 'border-orange-400', glow: 'shadow-orange-500/30' },
    none: { bg: 'bg-red-500', text: 'text-red-50', border: 'border-red-400', glow: 'shadow-red-500/30' },
  }

  const chanceLabels = {
    high: 'Высокий шанс',
    medium: 'Средний шанс',
    low: 'Низкий шанс',
    none: 'Маловероятно',
  }

  const cs = chanceStyles[specialty.passChance]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group perspective-[1200px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ===== FRONT ===== */}
        <div 
          className="w-full rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', position: isFlipped ? 'absolute' : 'relative', top: 0, left: 0, right: 0 }}
        >
          <div className={`bg-gradient-to-br ${details.color} p-5 sm:p-8 text-white relative overflow-hidden min-h-[280px] sm:min-h-[340px] flex flex-col justify-between`}>
            {/* Декор */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

            <div className="relative z-10">
              {/* Бейджи */}
              <div className="flex items-center gap-2 mb-4">
                {avgScore && (
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${cs.bg} ${cs.text} shadow-lg ${cs.glow}`}>
                    {chanceLabels[specialty.passChance]}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-sm">
                  {specialty.code}
                </span>
              </div>

              {/* Иконка и название */}
              <div className="mb-3">
                <details.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-base sm:text-xl font-extrabold mb-2 sm:mb-3 leading-tight">{specialty.name}</h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3">{details.description}</p>
            </div>

            <div className="relative z-10 mt-6">
              {/* Статистика */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
                  <IconUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 mx-auto mb-0.5 sm:mb-1" />
                  <p className="font-extrabold text-base sm:text-lg">{specialty.budget}</p>
                  <p className="text-white/60 text-[9px] sm:text-[10px]">Бюджет</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
                  <IconCoin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 mx-auto mb-0.5 sm:mb-1" />
                  <p className="font-extrabold text-base sm:text-lg">{specialty.paid}</p>
                  <p className="text-white/60 text-[9px] sm:text-[10px]">Платное</p>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 text-center">
                  <IconTrophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 mx-auto mb-0.5 sm:mb-1" />
                  <p className="font-extrabold text-base sm:text-lg">{specialty.minScore.toFixed(1)}</p>
                  <p className="text-white/60 text-[9px] sm:text-[10px]">Проходной</p>
                </div>
              </div>

              {/* Ваш балл */}
              {avgScore && (
                <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between">
                  <span className="text-white/70 text-xs font-semibold">Ваш средний балл</span>
                  <span className="font-extrabold text-2xl">{avgScore}</span>
                </div>
              )}
            </div>

            {/* Подсказка */}
            <div className="absolute bottom-3 right-4 text-white/40 text-xs flex items-center gap-1">
              Нажмите для подробностей →
            </div>
          </div>
        </div>

        {/* ===== BACK ===== */}
        <div 
          className="w-full rounded-3xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: isFlipped ? 'relative' : 'absolute', top: 0, left: 0, right: 0 }}
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 min-h-[280px] sm:min-h-[340px] flex flex-col justify-between shadow-xl">
            <div>
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <details.icon className="w-6 h-6 text-official" strokeWidth={1.5} />
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{specialty.code}</span>
                    <h4 className="font-extrabold text-official text-sm leading-tight">{specialty.name}</h4>
                  </div>
                </div>
                {avgScore && (
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${cs.bg} ${cs.text}`}>
                    {chanceLabels[specialty.passChance]}
                  </span>
                )}
              </div>

              {/* Детали */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-xs">
                  <IconClock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500">Срок обучения:</span>
                  <span className="font-bold text-official">{details.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <IconSchool className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500">Форма обучения:</span>
                  <span className="font-bold text-official">{details.form}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <IconBuilding className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-500">Квалификация:</span>
                  <span className="font-bold text-official">{details.qual}</span>
                </div>
              </div>

              {/* Навыки */}
              <div className="mb-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Ключевые навыки</p>
                <div className="flex flex-wrap gap-1.5">
                  {details.skills.map((skill, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Карьеры */}
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Карьерные пути</p>
                <div className="space-y-1">
                  {details.careers.map((career, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <IconCheck className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      {career}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Баллы */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Бюджет: <strong className="text-official">{specialty.budget}</strong></span>
                <span>Платное: <strong className="text-official">{specialty.paid}</strong></span>
              </div>
              <div className="text-gray-400 text-xs flex items-center gap-1">
                ← Назад
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}