import {
  IconClipboardText,
  IconSchool,
  IconUsers,
  IconNews,
  IconMapPin,
  IconUser,
} from '@tabler/icons-react'

export const mainNav = [
  {
    title: 'Сведения об ОО',
    path: '/sveden',
    icon: IconClipboardText,
    submenu: [
      { title: 'Основные сведения', path: '/sveden/common' },
      { title: 'Структура и органы управления', path: '/sveden/struct' },
      { title: 'Документы', path: '/sveden/document' },
      { title: 'Образование', path: '/sveden/education' },
      { title: 'Образовательные стандарты', path: '/sveden/eduStandarts' },
      { title: 'Руководство', path: '/sveden/managers' },
      { title: 'Педагогический состав', path: '/sveden/employees' },
      { title: 'Материально-техническое обеспечение', path: '/sveden/dsreda' },
      { title: 'Стипендии и меры поддержки', path: '/sveden/grants' },
      { title: 'Платные образовательные услуги', path: '/sveden/paid_edu' },
      { title: 'Финансово-хозяйственная деятельность', path: '/sveden/budget' },
      { title: 'Вакантные места', path: '/sveden/vacant' },
      { title: 'Международное сотрудничество', path: '/sveden/cooperation' },
      { title: 'Организация питания', path: '/sveden/food' },
    ]
  },
  {
    title: 'Абитуриентам',
    path: '/abiturientam',
    icon: IconSchool,
    submenu: [
      { title: 'Приемная комиссия', path: '/abiturientam/priemnaya-komissiya' },
      { title: 'День открытых дверей', path: '/abiturientam/den-otkrytykh-dverej' },
      { title: 'Специальности', path: '/abiturientam/spetsialnosti' },
      { title: 'Общежитие', path: '/abiturientam/obshhezhitie-dlya-inogorodnikh-studentov' },
      { title: 'Профориентация', path: '/abiturientam/proforientatsiya' },
      { title: 'Тест на профопределение', path: '/abiturientam/test-na-professionalnoe-samoopredelenie' },
      { title: 'Образовательное кредитование', path: '/obrazovatelnoe-kreditovanie' },
    ]
  },
  {
    title: 'Студентам',
    path: '/studentam',
    icon: IconUser,
    submenu: [
      { title: 'Расписание занятий', path: '/studentam/raspisanie-zanyatij' },
      { title: 'Расписание звонков', path: '/studentam/raspisanie-zvonkov' },
      { title: 'Документы', path: '/studentam/dokumenty' },
      { title: 'Практика', path: '/studentam/praktika' },
      { title: 'Студенческая жизнь', path: '/studentam/studencheskaya-zhizn' },
      { title: 'Студенческий совет', path: '/studentam/studencheskiy-sovet' },
      { title: 'Трудоустройство', path: '/studentam/trudoustrojstvo-vypusknikov' },
      { title: 'Олимпиады и конкурсы', path: '/studentam/olimpiady-i-konkursy' },
      { title: 'Волонтерское движение', path: '/studentam/volonterskoe-dvizhenie' },
      { title: 'Центр карьеры', path: '/studentam/tsentr-karery' },
    ]
  },
  {
    title: 'Родителям',
    path: '/roditelyam',
    icon: IconUsers,
    submenu: [
      { title: 'Питание и здоровье', path: '/roditelyam/pitanie-i-zdorovye' },
      { title: 'Воспитательная работа', path: '/roditelyam/vospitatelynaya-rabota' },
      { title: 'Классные руководители', path: '/roditelyam/klassnye-rukovoditeli' },
      { title: 'Объявления', path: '/roditelyam/obyavleniya' },
      { title: 'Документы', path: '/roditelyam/dokumenty' },
      { title: 'Мероприятия', path: '/roditelyam/meropriyatiya' },
    ]
  },
  {
    title: 'Сотрудникам',
    path: '/sotrudnikam',
    icon: IconSchool,
    submenu: [
      { title: 'Аттестация', path: '/sotrudnikam/attestatsii' },
      { title: 'Документы', path: '/sotrudnikam/dokumenty' },
      { title: 'Методические материалы', path: '/sotrudnikam/metodicheskie-materialy' },
      { title: 'Мероприятия', path: '/sotrudnikam/meropriyatiya' },
      { title: 'Конкурс "Мастер года"', path: '/sotrudnikam/konkurs-master-goda' },
      { title: 'Музей', path: '/sotrudnikam/muzey' },
    ]
  },
  {
    title: 'Новости',
    path: '/news',
    icon: IconNews,
  },
]

export const additionalLinks = [
  { title: 'ИНФОРМАЦИЯ ДЛЯ ИНВАЛИДОВ И ЛИЦ С ОВЗ', path: '/informatsiya-dlya-invalidov-i-lits-s-ovz' },
  { title: 'ПРОФЕССИОНАЛЫ (WorldSkills)', path: '/worldskills-russia' },
  { title: 'АБИЛИМПИКС', path: '/abilimpiks' },
  { title: 'МНОГОФУНКЦИОНАЛЬНЫЙ ЦЕНТР ПРИКЛАДНЫХ КВАЛИФИКАЦИЙ', path: '/mnogofunktsionalnyy-tsentr-prikladnykh-kvalifikatsiy' },
  { title: 'ИТ - МАСТЕРСКИЕ', path: '/it-masterskie' },
  { title: 'ИТ-КУБ', path: '/it-cube' },
  { title: 'ПРОЕКТ "УСПЕХ КАЖДОГО РЕБЕНКА"', path: '/proekt-uspekh-kazhdogo-rebenka' },
  { title: 'СЭДО (ОБРАЗОВАНИЕ33)', path: '/sedo-obrazovanie-33' },
  { title: 'ЭЛЕКТРОННОЕ ОБУЧЕНИЕ', path: '/elektronnoe-obuchenie' },
  { title: 'ВОСПИТАТЕЛЬНАЯ РАБОТА', path: '/vospitatelnaya-rabota' },
  { title: 'ДЕМОНСТРАЦИОННЫЙ ЭКЗАМЕН', path: '/demonstratsionnyy-ekzamen' },
  { title: 'АККРЕДИТАЦИЯ', path: '/akkreditatsiya' },
  { title: 'ПРОТИВОДЕЙСТВИЕ КОРРУПЦИИ', path: '/pro-corrup' },
  { title: 'ВАКАНСИИ КОЛЛЕДЖА', path: '/vakansii-kolledzha' },
]