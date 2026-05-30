import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IconBook2, IconBriefcase, IconBuilding, IconBulb, IconCamera, IconCheck, IconDeviceLaptop, IconGlobe, IconHeartHandshake, IconRocket, IconSchool, IconStar, IconTarget, IconTool, IconTrophy, IconUser, IconUsers } from '@tabler/icons-react'
import { renderIcon } from '../utils/iconMap'
import { img } from '../utils/imageUrl'
import LazyImage from '../components/LazyImage'
const achievements = [
  { year: '1944', title: 'Основание Владимирского ремесленного училища №1', desc: 'В разгар Великой Отечественной войны было открыто ремесленное училище для подготовки квалифицированных рабочих кадров, необходимых для восстановления народного хозяйства.', Icon: IconBuilding },
  { year: '1960', title: 'Преобразование в машиностроительный техникум', desc: 'Училище реорганизовано в машиностроительный техникум. Расширен перечень специальностей, укреплена материально-техническая база, открыты новые лаборатории.', Icon: IconTool },
  { year: '1990', title: 'Получение статуса политехнического колледжа', desc: 'Техникум получил статус политехнического колледжа. Внедрены новые образовательные программы, усилена гуманитарная и экономическая составляющие обучения.', Icon: IconBook2 },
  { year: '2005', title: 'Начало информатизации образования', desc: 'Активное внедрение информационных технологий в учебный процесс. Оснащение компьютерных классов, создание локальной сети, внедрение электронных образовательных ресурсов.', Icon: IconDeviceLaptop },
  { year: '2015', title: 'Создание ИТ-кластера', desc: 'Открытие современных ИТ-мастерских и лабораторий. Колледж становится региональным центром подготовки IT-специалистов, запускаются программы по робототехнике.', Icon: IconRocket },
  { year: '2020', title: 'Победа в гранте «Цифровая образовательная среда»', desc: 'Колледж выиграл грант федерального проекта «Цифровая образовательная среда». На базе ВПК открыт центр цифрового образования детей «IT-Куб».', Icon: IconTrophy },
  { year: '2024', title: 'Флагман IT-образования Владимирской области', desc: 'ВПК признан ведущим колледжем региона по подготовке IT-специалистов. Открыты новые направления, запущен проект «Цифровая кафедра», расширено международное сотрудничество.', Icon: IconStar },
]

const values = [
  { title: 'Качество образования', Icon: IconTarget, desc: 'Высокий уровень подготовки специалистов, соответствующий современным требованиям рынка труда и работодателей', stat: '95% трудоустройства' },
  { title: 'Инновации и развитие', Icon: IconBulb, desc: 'Внедрение передовых технологий и методик обучения, постоянное обновление материальной базы', stat: '8 ИТ-мастерских' },
  { title: 'Личностно-ориентированный подход', Icon: IconHeartHandshake, desc: 'Создание комфортной образовательной среды, поддержка индивидуальной траектории развития каждого студента', stat: '150+ преподавателей' },
  { title: 'Социальная ответственность', Icon: IconGlobe, desc: 'Подготовка социально-ориентированных специалистов, развитие волонтёрства и гражданской активности', stat: '300+ волонтёров' },
  { title: 'Партнёрство и открытость', Icon: IconHeartHandshake, desc: 'Тесное сотрудничество с работодателями, вузами, школами и общественными организациями региона', stat: '50+ партнёров' },
]

const managementTeam = [
  { name: 'Гонгадзе М.С.', role: 'Директор колледжа', phone: '8 (4922) 66-65-13', email: 'adm@polcol.ru' },
  { name: 'Наумов Д.Д.', role: 'Заместитель директора', phone: '8 (4922) 77-15-13', email: 'zam-dir@polcol.ru' },
  { name: 'Карасева Е.Н.', role: 'Зам. директора по УВР', phone: '8 (4922) 77-16-04', email: 'zam-uvr@polcol.ru' },
  { name: 'Краснов В.А.', role: 'Зам. директора по экономике и праву', phone: '8 (4922) 77-13-20', email: 'vakrasnov@polcol.ru' },
]

export default function About() {
  return (
    <div>
      {/* ==================== HERO ==================== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-official-900 via-official-800 to-official-900">
          <div className="absolute inset-0 official-pattern opacity-50" />
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 10, repeat: Infinity }} 
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 8, repeat: Infinity }} 
            className="absolute -bottom-20 left-20 w-80 h-80 rounded-full bg-official-600/30 blur-3xl" 
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
              {renderIcon(IconBuilding, 'w-16 h-16 text-white drop-shadow')}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <span className="badge-accent mb-4 inline-block">История и современность</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-center">
            О колледже
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} 
            className="text-lg text-white/70 max-w-3xl mx-auto text-center">
            Владимирский политехнический колледж — одно из ведущих образовательных учреждений 
            Владимирской области с 80-летней историей и современными традициями
          </motion.p>
        </div>
      </section>

      {/* ==================== МИССИЯ И ЦЕННОСТИ ==================== */}
      <section className="py-16 section-official">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="accent-line mb-4" />
              <span className="badge-official mb-3 inline-block">Миссия</span>
              <h2 className="section-title mt-2 mb-6">
                Подготовка <span className="text-gradient">конкурентоспособных</span> специалистов
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Миссия колледжа — подготовка конкурентоспособных специалистов среднего звена, 
                  востребованных на региональном и федеральном рынках труда, способных к профессиональному 
                  росту, саморазвитию и эффективной трудовой деятельности в условиях цифровой экономики.
                </p>
                <p>
                  Мы стремимся создать все условия для того, чтобы наши студенты получили качественное 
                  профессиональное образование, развили свои личностные и профессиональные компетенции, 
                  стали ответственными, инициативными и успешными специалистами.
                </p>
                <p>
                  Колледж реализует образовательные программы по 12 специальностям в сфере информационных 
                  технологий, машиностроения, экономики и сферы услуг. Мы постоянно обновляем содержание 
                  образования, внедряем современные методики и технологии обучения, укрепляем связи 
                  с работодателями.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="accent-line mb-4" />
              <span className="badge-official mb-3 inline-block">Ценности</span>
              <h2 className="section-title mt-2 mb-6">
                Наши <span className="text-gradient">принципы</span>
              </h2>
              <div className="space-y-4">
                {values.map((v, i) => (
                  <motion.div 
                    key={v.title} 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.08 }}
                    className="card-official rounded-xl p-4 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-official-50 flex items-center justify-center flex-shrink-0">
                      <v.Icon className="w-6 h-6 text-official-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-official text-sm">{v.title}</h3>
                        <span className="text-xs font-semibold text-accent-dark bg-accent-50 px-2 py-0.5 rounded-full">{v.stat}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== ИСТОРИЯ ==================== */}
      <section id="history" className="py-16 section-official-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:true}}} className="text-center mb-12">
            <div className="accent-line-center mb-4" />
            <span className="badge-official mb-3 inline-block">История</span>
            <h2 className="section-title">80 лет подготовки профессионалов</h2>
            <p className="section-subtitle">От ремесленного училища до флагмана IT-образования региона</p>
          </motion.div>

          <div className="space-y-6 relative">
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-official to-accent hidden md:block" />
            
            {achievements.map((item, idx) => {
              const isLeft = idx % 2 === 0
              return (
                <motion.div 
                  key={item.year} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: idx * 0.08 }}
                  className={`relative flex items-start gap-5 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
                    <div className="card-official rounded-xl p-5 inline-block max-w-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <item.Icon className="w-6 h-6 text-accent" />
                        <span className="text-2xl font-bold text-gradient">{item.year}</span>
                      </div>
                      <h3 className="text-base font-bold text-official">{item.title}</h3>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-[46px] h-[46px] rounded-full bg-accent shadow-lg shadow-accent/30 flex-shrink-0 relative z-10 items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== ФОТО ГАЛЕРЕЯ ==================== */}
      <section className="py-16 section-official">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="accent-line-center mb-4" />
            <span className="badge-official mb-3 inline-block">Материально-техническая база</span>
            <h2 className="section-title">Наши учебные кабинеты и корпуса</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage src={img('/images/polcol/036_AVG_9268.jpg')} alt="Учебный кабинет колледжа" className="w-full h-56" />
              <div className="p-4 bg-white">
                <p className="font-bold text-official text-sm">Современный учебный кабинет</p>
                <p className="text-gray-400 text-xs">Оснащён новейшим оборудованием и компьютерной техникой</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage src={img('/images/polcol/037_AVG_9253.jpg')} alt="Лаборатория колледжа" className="w-full h-56" />
              <div className="p-4 bg-white">
                <p className="font-bold text-official text-sm">Лаборатория робототехники</p>
                <p className="text-gray-400 text-xs">Современное оборудование для изучения мехатроники</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage src={img('/images/polcol/038_AVG_9247.jpg')} alt="Здание колледжа" className="w-full h-56" />
              <div className="p-4 bg-white">
                <p className="font-bold text-official text-sm">Учебный корпус</p>
                <p className="text-gray-400 text-xs">Историческое здание колледжа, оснащённое по современным стандартам</p>
              </div>
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage src={img('/images/polcol/039_AVG_9202.jpg')} alt="Учебный процесс" className="w-full h-56" />
              <div className="p-4 bg-white">
                <p className="font-bold text-official text-sm">Учебный процесс</p>
                <p className="text-gray-400 text-xs">Практические занятия на современном оборудовании</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden shadow-xl">
              <LazyImage src={img('/images/polcol/066_2116_vladimirskiy_politehnicheskiy_kolledzh_5a265b9f0b05.jpg')} alt="Главный вход колледжа" className="w-full h-56" />
              <div className="p-4 bg-white">
                <p className="font-bold text-official text-sm">Главный вход колледжа</p>
                <p className="text-gray-400 text-xs">Октябрьский проспект, 11 — г. Владимир</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== РУКОВОДСТВО ==================== */}
      <section className="py-16 section-official-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-official via-official-800 to-official-900 p-8 md:p-10"
          >
            <div className="absolute inset-0 official-pattern opacity-20" />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center flex-shrink-0 shadow-2xl">
                     <IconSchool className="w-14 h-14 text-official-dark" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-4">Слово директора</h3>
                <p className="text-white/80 leading-relaxed mb-6 text-base">
                  «Вот уже много лет наш колледж является одним из ведущих образовательных учреждений региона. 
                  Мы гордимся нашими выпускниками, которые успешно работают в различных отраслях промышленности, 
                  малого и среднего бизнеса. Мы ценим каждого нашего студента, преподавателя и родителя!
                </p>
                <p className="text-white/80 leading-relaxed mb-6 text-base">
                  Наш колледж стремится создать все условия для того, чтобы каждый студент получил качественное 
                  образование, развил свои таланты и способности, стал ответственным и успешным профессионалом. 
                  Мы открыты к диалогу и сотрудничеству. Приглашаю вас стать частью нашей дружной команды!»
                </p>
                <p className="font-bold text-accent-light">Гонгадзе Марине Самвеловна</p>
                <p className="text-white/60 text-sm">Директор ГАПОУ ВО «Владимирский политехнический колледж»</p>
              </div>
            </div>
          </motion.div>

          {/* Management Team */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-10">
            <div className="text-center mb-8">
              <div className="accent-line-center mb-4" />
              <h2 className="section-title">Администрация колледжа</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {managementTeam.map((person, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="card-official rounded-xl p-5 text-center hover:border-accent"
                >
                   <div className="w-16 h-16 rounded-full bg-official-50 flex items-center justify-center mx-auto mb-3">
                     {idx === 0 ? <IconUser className="w-8 h-8 text-official-400" /> : <IconUsers className="w-8 h-8 text-official-400" />}
                   </div>
                  <h3 className="font-bold text-official text-sm">{person.name}</h3>
                  <p className="text-gray-500 text-xs mb-2">{person.role}</p>
                  <div className="text-xs text-gray-400 space-y-0.5">
                    <p>тел: {person.phone}</p>
                    <p>email: {person.email}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== ЦИФРЫ ==================== */}
      <section className="py-16 section-official-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="accent-line-center mb-4" />
            <span className="badge-official mb-3 inline-block">Показатели</span>
            <h2 className="section-title">Колледж в цифрах</h2>
            <p className="section-subtitle">Ключевые показатели деятельности образовательной организации</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '80+', label: 'Лет истории', Icon: IconBuilding, desc: 'С 1944 года готовим специалистов' },
              { value: '2500+', label: 'Студентов', Icon: IconUsers, desc: 'Ежегодно обучаются' },
              { value: '150+', label: 'Преподавателей', Icon: IconSchool, desc: 'Высококвалифицированный состав' },
              { value: '12', label: 'Специальностей', Icon: IconSchool, desc: 'Востребованных направлений' },
              { value: '8', label: 'ИТ-мастерских', Icon: IconDeviceLaptop, desc: 'Современных лабораторий' },
              { value: '95%', label: 'Трудоустройство', Icon: IconBriefcase, desc: 'Выпускников находят работу' },
              { value: '50+', label: 'Партнёров', Icon: IconHeartHandshake, desc: 'Предприятий и организаций' },
              { value: '1', label: 'Место в регионе', Icon: IconTrophy, desc: 'По подготовке IT-специалистов' },
            ].map((stat, idx) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="card-official rounded-xl p-5 text-center hover:border-accent">
                <div className="mb-2"><stat.Icon className="w-6 h-6 text-accent mx-auto" /></div>
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="font-bold text-official text-sm mt-0.5">{stat.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ПОДРАЗДЕЛЫ ==================== */}
      <section className="py-16 section-official">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="accent-line-center mb-4" />
            <h2 className="section-title">Подробнее о колледже</h2>
            <p className="section-subtitle">Изучите детальную информацию по разделам</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Достижения', path: '/o-kolledzhe/dostizheniya', Icon: IconTrophy, desc: 'Награды, победы в конкурсах, достижения студентов и преподавателей колледжа' },
              { title: 'Фото и видео', path: '/o-kolledzhe/foto-i-videomaterialy', Icon: IconCamera, desc: 'Фотогалерея мероприятий, видеоэкскурсии, мастер-классы и будни колледжа' },
              { title: 'Сотрудничество', path: '/o-kolledzhe/sotrudnichestvo', Icon: IconHeartHandshake, desc: 'Партнёрство с предприятиями, вузами, общественными организациями' },
            ].map((item) => (
              <Link key={item.path} to={item.path}
                className="card-official rounded-xl p-6 text-center hover:border-accent group">
                <div className="mb-3 group-hover:scale-110 transition-transform"><item.Icon className="w-10 h-10 text-accent" /></div>
                <h3 className="text-lg font-bold text-official mb-1 group-hover:text-accent-dark transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ЛИЦЕНЗИЯ ==================== */}
      <section className="py-16 section-official-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl bg-white border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-official-50 flex items-center justify-center flex-shrink-0">
                <IconCheck className="w-8 h-8 text-official" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-bold text-official text-lg mb-1">Лицензия и государственная аккредитация</h3>
                <p className="text-gray-500 text-sm">
                  Колледж имеет действующую лицензию на осуществление образовательной деятельности 
                  и свидетельство о государственной аккредитации. Все образовательные программы 
                  соответствуют федеральным государственным образовательным стандартам.
                </p>
              </div>
              <Link to="/sveden/document" className="btn-official whitespace-nowrap flex-shrink-0">
                Документы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}