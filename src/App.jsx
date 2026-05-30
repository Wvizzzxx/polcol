import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import PageLoader from './components/PageLoader'

// Lazy load pages for code splitting
const Showcase = lazy(() => import('./pages/Showcase'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Abiturientam = lazy(() => import('./pages/Abiturientam'))
const Studentam = lazy(() => import('./pages/Studentam'))
const Roditelyam = lazy(() => import('./pages/Roditelyam'))
const Sotrudnikam = lazy(() => import('./pages/Sotrudnikam'))
const News = lazy(() => import('./pages/News'))
const Contacts = lazy(() => import('./pages/Contacts'))
const Sveden = lazy(() => import('./pages/Sveden'))
const ITCube = lazy(() => import('./pages/ITCube'))
const SubPage = lazy(() => import('./pages/SubPage'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Specialties = lazy(() => import('./pages/Specialties'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const Sitemap = lazy(() => import('./pages/Sitemap'))

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Основной сайт */}
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          <Route path="about" element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          } />
          
          {/* Основные разделы */}
          <Route path="abiturientam" element={
            <Suspense fallback={<PageLoader />}>
              <Abiturientam />
            </Suspense>
          } />
          <Route path="studentam" element={
            <Suspense fallback={<PageLoader />}>
              <Studentam />
            </Suspense>
          } />
          <Route path="roditelyam" element={
            <Suspense fallback={<PageLoader />}>
              <Roditelyam />
            </Suspense>
          } />
          <Route path="sotrudnikam" element={
            <Suspense fallback={<PageLoader />}>
              <Sotrudnikam />
            </Suspense>
          } />
          <Route path="sveden" element={
            <Suspense fallback={<PageLoader />}>
              <Sveden />
            </Suspense>
          } />
          <Route path="it-cube" element={
            <Suspense fallback={<PageLoader />}>
              <ITCube />
            </Suspense>
          } />
          <Route path="news" element={
            <Suspense fallback={<PageLoader />}>
              <News />
            </Suspense>
          } />
          <Route path="news/:id" element={
            <Suspense fallback={<PageLoader />}>
              <NewsDetail />
            </Suspense>
          } />
          <Route path="sitemap" element={
            <Suspense fallback={<PageLoader />}>
              <Sitemap />
            </Suspense>
          } />
          <Route path="contacts" element={
            <Suspense fallback={<PageLoader />}>
              <Contacts />
            </Suspense>
          } />
          
          {/* Сведения об ОО - подстраницы */}
          <Route path="sveden/common" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/struct" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/document" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/education" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/eduStandarts" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/managers" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/employees" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/dsreda" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/grants" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/paid_edu" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/budget" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/vacant" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/cooperation" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/food" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sveden/legMap" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Абитуриентам - подстраницы */}
          <Route path="abiturientam/priemnaya-komissiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/den-otkrytykh-dverej" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/spetsialnosti" element={<Suspense fallback={<PageLoader />}><Specialties /></Suspense>} />
          <Route path="abiturientam/obshhezhitie-dlya-inogorodnikh-studentov" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/proforientatsiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/test-na-professionalnoe-samoopredelenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/obyavleniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/napravleniya-obucheniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/spisok-postupleniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abiturientam/o-kolledzhe" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Студентам - подстраницы */}
          <Route path="studentam/raspisanie-zanyatij" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/raspisanie-zvonkov" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/dokumenty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/promezhutochnaya-i-itogovaya-attestatsiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/praktika" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/studencheskaya-zhizn" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/studencheskiy-sovet" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/trudoustrojstvo-vypusknikov" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/metodicheskie-materialy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/olimpiady-i-konkursy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/volonterskoe-dvizhenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/tsentr-karery" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/zaochnoe-obuchenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="studentam/chempionatnoe-dvizhenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Родителям - подстраницы */}
          <Route path="roditelyam/pitanie-i-zdorovye" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/vospitatelynaya-rabota" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/klassnye-rukovoditeli" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/obyavleniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/dokumenty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/meropriyatiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="roditelyam/den-otkrytykh-dverey" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Сотрудникам - подстраницы */}
          <Route path="sotrudnikam/attestatsii" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/dokumenty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/metodicheskie-materialy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/obyavleniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/meropriyatiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/konkurs-master-goda" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/muzey" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/peredovye-pedagogicheskie-tekhnologii" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/obuchenie-sotrudnikov" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sotrudnikam/vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* IT-Куб - подстраницы */}
          <Route path="it-cube/o-tsentre" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/novosti" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/napravleniya-i-programmy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/dokumenty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/pedagogi" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/raspisanie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/meropriyatiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-cube/kontakty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Отдельные страницы */}
          <Route path="obrazovatelnoe-kreditovanie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="informatsiya-dlya-invalidov-i-lits-s-ovz" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="worldskills-russia" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="abilimpiks" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="mnogofunktsionalnyy-tsentr-prikladnykh-kvalifikatsiy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="it-masterskie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="proekt-uspekh-kazhdogo-rebenka" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="sedo-obrazovanie-33" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="elektronnoe-obuchenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="vospitatelnaya-rabota" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="demonstratsionnyy-ekzamen" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="akkreditatsiya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="pro-corrup" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="vakansii-kolledzha" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="postuplenie" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="prochie-dokumenty" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="otzyvy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="faq" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="nauchno-issledovatelyskaya-deyatelynost" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="politika-obrabotki-personalnykh-dannykh" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="o-kolledzhe/dostizheniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="o-kolledzhe/foto-i-videomaterialy" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="o-kolledzhe/sotrudnichestvo" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="elektronnaya-informatsionno-obrazovatelnaya-sreda" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="virtualnyy-kabinet-proforientatsii" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="virtualnyy-kabinet-po-proforientatsii" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="anons" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="promo" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="search" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="calculator" element={<Suspense fallback={<PageLoader />}><Calculator /></Suspense>} />
          <Route path="specialties" element={<Suspense fallback={<PageLoader />}><Specialties /></Suspense>} />
          <Route path="torgi-po-223-fz" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="obrabotka-pdn" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="obuchenie-grazhdan-predpensionnogo-vozrasta" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="novye-vozmozhnosti-dlya-kazhdogo" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="partnery" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="edinoe-okno-dlya-molodykh-semey" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          <Route path="news-departament" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
          
          {/* Catch-all для любых других путей */}
          <Route path="*" element={<Suspense fallback={<PageLoader />}><SubPage /></Suspense>} />
        </Route>
        {/* Скрытая страница демонстрации дизайна — не в основном Layout */}
        <Route path="/design-showcase-vkp2024" element={<Suspense fallback={<PageLoader />}><Showcase /></Suspense>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App