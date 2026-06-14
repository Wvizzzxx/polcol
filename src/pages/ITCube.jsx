import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IconBook2,
  IconBrain,
  IconCalendar,
  IconClipboardText,
  IconCode,
  IconDeviceDesktop,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconFileText,
  IconGlobe,
  IconLock,
  IconMapPin,
  IconNews,
  IconPalette,
  IconReport,
  IconRobot,
  IconRocket,
  IconSchool,
  IconTent,
  IconTrophy,
} from "@tabler/icons-react";
import { renderIcon } from "../utils/iconMap";
import { img } from "../utils/imageUrl";

const directions = [
  {
    title: "Программирование на Python",
    Icon: IconCode,
    desc: "Основы и продвинутое программирование, приложения и игры",
  },
  {
    title: "Веб-разработка",
    Icon: IconGlobe,
    desc: "HTML, CSS, JavaScript, React — современные сайты",
  },
  {
    title: "Мобильная разработка",
    Icon: IconDeviceMobile,
    desc: "Приложения под iOS и Android",
  },
  {
    title: "Робототехника",
    Icon: IconRobot,
    desc: "Сборка и программирование роботов на Arduino",
  },
  {
    title: "Кибербезопасность",
    Icon: IconLock,
    desc: "Информационная безопасность, этичный хакинг",
  },
  {
    title: "3D-моделирование",
    Icon: IconPalette,
    desc: "Blender, 3ds Max — 3D-модели и анимация",
  },
  {
    title: "Системное администрирование",
    Icon: IconDeviceDesktop,
    desc: "Компьютерные сети и серверы",
  },
  {
    title: "Искусственный интеллект",
    Icon: IconBrain,
    desc: "Машинное обучение, нейросети на Python",
  },
];

export default function ITCube() {
  return (
    <div>
      {/* ==================== HERO — ТЕХНОЛОГИЧНЫЙ С КОДОМ-ФОНОМ ==================== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0e27] w-full">
        {/* Фон с кодом */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #00ff88 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Светящиеся линии */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                {renderIcon(IconRobot, "w-16 h-16 text-white drop-shadow")}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {"<IT-Cube />"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-4 sm:mb-6 break-words"
              >
                Центр
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  цифрового
                </span>
                <br />
                образования
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed"
              >
                IT-Куб — бесплатный центр для детей и подростков от 7 до 18 лет.
                Осваивай IT-специальности под руководством опытных
                преподавателей.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="https://peaceful-flow-production-9db4.up.railway.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/25 text-lg"
                >
                  Записаться бесплатно
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
                <Link
                  to="/it-cube/napravleniya-i-programmy"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 hover:border-white/30 transition-all"
                >
                  Направления
                </Link>
              </motion.div>
            </div>

            {/* Правая — код-стилизация */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="hidden lg:block"
            >
              <div className="bg-[#0d1117] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-emerald-500/5">
                {/* Заголовок окна */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-gray-500 text-xs ml-2 font-mono">
                    welcome.py
                  </span>
                </div>
                {/* Код */}
                <div className="p-6 font-mono text-sm leading-relaxed">
                  <p className="text-gray-500"># IT-Куб — начало пути в IT</p>
                  <p className="text-emerald-400">
                    class <span className="text-yellow-300">ITCube</span>:
                  </p>
                  <p className="pl-4 text-gray-300">
                    directions = [<span className="text-emerald-300">8</span>]
                  </p>
                  <p className="pl-4 text-gray-300">
                    students ={" "}
                    <span className="text-emerald-300">"все желающие"</span>
                  </p>
                  <p className="pl-4 text-gray-300">
                    cost = <span className="text-emerald-300">"бесплатно"</span>
                  </p>
                  <p className="text-gray-500 mt-2"># Запускай своё будущее </p>
                  <p className="text-cyan-400">
                    ITCube.<span className="text-yellow-300">start</span>(
                    <span className="text-emerald-300">"твой_код"</span>)
                  </p>
                </div>
              </div>

              {/* Мини-карточки с фото */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="rounded-xl overflow-hidden h-32 relative group">
                  <img
                    src={img("/images/polcol/047_AVG_9317-_1_.jpg")}
                    alt="IT-Куб"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-bold">
                    IT-Куб
                  </p>
                </div>
                <div className="rounded-xl overflow-hidden h-32 relative group">
                  <img
                    src={img("/images/polcol/048_AVG_9615.jpg")}
                    alt="Занятия"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-bold">
                    Занятия
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== НАПРАВЛЕНИЯ — КАРТОЧКИ С ГРАДИЕНТОМ ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Направления обучения
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-official">
              Чему мы учим
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {directions.map((dir, idx) => (
              <motion.div
                key={dir.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <dir.Icon className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-bold text-official text-sm mb-2 group-hover:text-emerald-600 transition-colors">
                  {dir.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {dir.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== О ЦЕНТРЕ — С ФОТО И ПРЕИМУЩЕСТВАМИ ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
                О центре
              </span>
              <h2 className="text-3xl font-extrabold text-official mb-6">
                Цифровое образование{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  для будущего
                </span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                IT-Куб создан на базе Владимирского политехнического колледжа в
                рамках федерального проекта «Цифровая образовательная среда».
                Обучение полностью бесплатное!
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    Icon: IconSchool,
                    title: "Опытные преподаватели",
                    desc: "Практикующие IT-специалисты",
                  },
                  {
                    Icon: IconDeviceLaptop,
                    title: "Современное оборудование",
                    desc: "Мощные ПК, 3D-принтеры",
                  },
                  {
                    Icon: IconTrophy,
                    title: "Участие в конкурсах",
                    desc: "Профессионалы, хакатоны",
                  },
                  {
                    Icon: IconReport,
                    title: "Сертификат",
                    desc: "Установленного образца",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 border border-gray-100 hover:border-emerald-200 transition-colors"
                  >
                    <a.Icon className="w-5 h-5 text-emerald-500 mb-2" />
                    <h4 className="font-bold text-official text-xs mb-0.5">
                      {a.title}
                    </h4>
                    <p className="text-gray-400 text-[11px]">{a.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-xl h-48">
                  <img
                    src={img("/images/polcol/048_AVG_9615.jpg")}
                    alt="IT-Куб"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl h-48">
                  <img
                    src={img("/images/polcol/047_AVG_9317-_1_.jpg")}
                    alt="Занятия IT-Куб"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-6 text-white text-center">
                  <p className="text-3xl font-extrabold mb-1">100%</p>
                  <p className="text-emerald-100/70 text-sm">
                    Бесплатное обучение для всех желающих
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== РАЗДЕЛЫ САЙТА — КОМПАКТНЫЕ КАРТОЧКИ ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider uppercase mb-4">
              Разделы
            </span>
            <h2 className="text-3xl font-extrabold text-official">
              Подробнее о IT-Куб
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "О центре",
                path: "/it-cube/o-tsentre",
                Icon: IconClipboardText,
                desc: "История, миссия, команда",
              },
              {
                title: "Новости",
                path: "/it-cube/novosti",
                Icon: IconNews,
                desc: "События и анонсы",
              },
              {
                title: "Направления",
                path: "/it-cube/napravleniya-i-programmy",
                Icon: IconBook2,
                desc: "Программы обучения",
              },
              {
                title: "Документы",
                path: "/it-cube/dokumenty",
                Icon: IconFileText,
                desc: "Нормативные документы",
              },
              {
                title: "Педагоги",
                path: "/it-cube/pedagogi",
                Icon: IconSchool,
                desc: "Наши преподаватели",
              },
              {
                title: "Расписание",
                path: "/it-cube/raspisanie",
                Icon: IconCalendar,
                desc: "График занятий",
              },
              {
                title: "Мероприятия",
                path: "/it-cube/meropriyatiya",
                Icon: IconTent,
                desc: "Конкурсы и хакатоны",
              },
              {
                title: "Контакты",
                path: "/it-cube/kontakty",
                Icon: IconMapPin,
                desc: "Как нас найти",
              },
            ].map((page, idx) => (
              <motion.div
                key={page.path}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link
                  to={page.path}
                  className="group block bg-white border border-gray-100 rounded-xl p-5 hover:border-emerald-200 hover:shadow-lg transition-all h-full text-center"
                >
                  <page.Icon className="w-6 h-6 text-emerald-500 mb-2" />
                  <h3 className="font-bold text-official text-sm group-hover:text-emerald-600 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{page.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-24 bg-[#0a0e27] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #00ff88 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Начни свой путь
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                в IT уже сегодня
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Обучение бесплатное. Запись открыта круглый год. Успей стать
              частью IT-сообщества!
            </p>
            <a
              href="https://peaceful-flow-production-9db4.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-400 hover:to-cyan-400 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/25 text-lg"
            >
              Выбрать направление
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}