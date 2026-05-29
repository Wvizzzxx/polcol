import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Showcase from './pages/Showcase'
import Home from './pages/Home'
import About from './pages/About'
import Abiturientam from './pages/Abiturientam'
import Studentam from './pages/Studentam'
import Roditelyam from './pages/Roditelyam'
import Sotrudnikam from './pages/Sotrudnikam'
import News from './pages/News'
import Contacts from './pages/Contacts'
import Sveden from './pages/Sveden'
import ITCube from './pages/ITCube'
import SubPage from './pages/SubPage'
import Calculator from './pages/Calculator'
import Specialties from './pages/Specialties'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Основной сайт */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          
          {/* Основные разделы */}
          <Route path="abiturientam" element={<Abiturientam />} />
          <Route path="studentam" element={<Studentam />} />
          <Route path="roditelyam" element={<Roditelyam />} />
          <Route path="sotrudnikam" element={<Sotrudnikam />} />
          <Route path="sveden" element={<Sveden />} />
          <Route path="it-cube" element={<ITCube />} />
          <Route path="news" element={<News />} />
          <Route path="contacts" element={<Contacts />} />
          
          {/* Сведения об ОО - подстраницы */}
          <Route path="sveden/common" element={<SubPage />} />
          <Route path="sveden/struct" element={<SubPage />} />
          <Route path="sveden/document" element={<SubPage />} />
          <Route path="sveden/education" element={<SubPage />} />
          <Route path="sveden/eduStandarts" element={<SubPage />} />
          <Route path="sveden/managers" element={<SubPage />} />
          <Route path="sveden/employees" element={<SubPage />} />
          <Route path="sveden/dsreda" element={<SubPage />} />
          <Route path="sveden/grants" element={<SubPage />} />
          <Route path="sveden/paid_edu" element={<SubPage />} />
          <Route path="sveden/budget" element={<SubPage />} />
          <Route path="sveden/vacant" element={<SubPage />} />
          <Route path="sveden/cooperation" element={<SubPage />} />
          <Route path="sveden/food" element={<SubPage />} />
          <Route path="sveden/legMap" element={<SubPage />} />
          
          {/* Абитуриентам - подстраницы */}
          <Route path="abiturientam/priemnaya-komissiya" element={<SubPage />} />
          <Route path="abiturientam/den-otkrytykh-dverej" element={<SubPage />} />
          <Route path="abiturientam/spetsialnosti" element={<Specialties />} />
          <Route path="abiturientam/obshhezhitie-dlya-inogorodnikh-studentov" element={<SubPage />} />
          <Route path="abiturientam/proforientatsiya" element={<SubPage />} />
          <Route path="abiturientam/test-na-professionalnoe-samoopredelenie" element={<SubPage />} />
          <Route path="abiturientam/obyavleniya" element={<SubPage />} />
          <Route path="abiturientam/napravleniya-obucheniya" element={<SubPage />} />
          <Route path="abiturientam/spisok-postupleniya" element={<SubPage />} />
          <Route path="abiturientam/o-kolledzhe" element={<SubPage />} />
          
          {/* Студентам - подстраницы */}
          <Route path="studentam/raspisanie-zanyatij" element={<SubPage />} />
          <Route path="studentam/raspisanie-zvonkov" element={<SubPage />} />
          <Route path="studentam/dokumenty" element={<SubPage />} />
          <Route path="studentam/promezhutochnaya-i-itogovaya-attestatsiya" element={<SubPage />} />
          <Route path="studentam/praktika" element={<SubPage />} />
          <Route path="studentam/studencheskaya-zhizn" element={<SubPage />} />
          <Route path="studentam/studencheskiy-sovet" element={<SubPage />} />
          <Route path="studentam/trudoustrojstvo-vypusknikov" element={<SubPage />} />
          <Route path="studentam/metodicheskie-materialy" element={<SubPage />} />
          <Route path="studentam/olimpiady-i-konkursy" element={<SubPage />} />
          <Route path="studentam/volonterskoe-dvizhenie" element={<SubPage />} />
          <Route path="studentam/tsentr-karery" element={<SubPage />} />
          <Route path="studentam/zaochnoe-obuchenie" element={<SubPage />} />
          <Route path="studentam/chempionatnoe-dvizhenie" element={<SubPage />} />
          
          {/* Родителям - подстраницы */}
          <Route path="roditelyam/pitanie-i-zdorovye" element={<SubPage />} />
          <Route path="roditelyam/vospitatelynaya-rabota" element={<SubPage />} />
          <Route path="roditelyam/klassnye-rukovoditeli" element={<SubPage />} />
          <Route path="roditelyam/obyavleniya" element={<SubPage />} />
          <Route path="roditelyam/dokumenty" element={<SubPage />} />
          <Route path="roditelyam/meropriyatiya" element={<SubPage />} />
          <Route path="roditelyam/den-otkrytykh-dverey" element={<SubPage />} />
          
          {/* Сотрудникам - подстраницы */}
          <Route path="sotrudnikam/attestatsii" element={<SubPage />} />
          <Route path="sotrudnikam/dokumenty" element={<SubPage />} />
          <Route path="sotrudnikam/metodicheskie-materialy" element={<SubPage />} />
          <Route path="sotrudnikam/obyavleniya" element={<SubPage />} />
          <Route path="sotrudnikam/meropriyatiya" element={<SubPage />} />
          <Route path="sotrudnikam/konkurs-master-goda" element={<SubPage />} />
          <Route path="sotrudnikam/muzey" element={<SubPage />} />
          <Route path="sotrudnikam/peredovye-pedagogicheskie-tekhnologii" element={<SubPage />} />
          <Route path="sotrudnikam/obuchenie-sotrudnikov" element={<SubPage />} />
          <Route path="sotrudnikam/vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya" element={<SubPage />} />
          
          {/* IT-Куб - подстраницы */}
          <Route path="it-cube/o-tsentre" element={<SubPage />} />
          <Route path="it-cube/novosti" element={<SubPage />} />
          <Route path="it-cube/napravleniya-i-programmy" element={<SubPage />} />
          <Route path="it-cube/dokumenty" element={<SubPage />} />
          <Route path="it-cube/pedagogi" element={<SubPage />} />
          <Route path="it-cube/raspisanie" element={<SubPage />} />
          <Route path="it-cube/meropriyatiya" element={<SubPage />} />
          <Route path="it-cube/kontakty" element={<SubPage />} />
          
          {/* Отдельные страницы */}
          <Route path="obrazovatelnoe-kreditovanie" element={<SubPage />} />
          <Route path="informatsiya-dlya-invalidov-i-lits-s-ovz" element={<SubPage />} />
          <Route path="worldskills-russia" element={<SubPage />} />
          <Route path="abilimpiks" element={<SubPage />} />
          <Route path="mnogofunktsionalnyy-tsentr-prikladnykh-kvalifikatsiy" element={<SubPage />} />
          <Route path="it-masterskie" element={<SubPage />} />
          <Route path="proekt-uspekh-kazhdogo-rebenka" element={<SubPage />} />
          <Route path="sedo-obrazovanie-33" element={<SubPage />} />
          <Route path="elektronnoe-obuchenie" element={<SubPage />} />
          <Route path="vospitatelnaya-rabota" element={<SubPage />} />
          <Route path="demonstratsionnyy-ekzamen" element={<SubPage />} />
          <Route path="akkreditatsiya" element={<SubPage />} />
          <Route path="pro-corrup" element={<SubPage />} />
          <Route path="vakansii-kolledzha" element={<SubPage />} />
          <Route path="postuplenie" element={<SubPage />} />
          <Route path="prochie-dokumenty" element={<SubPage />} />
          <Route path="otzyvy" element={<SubPage />} />
          <Route path="faq" element={<SubPage />} />
          <Route path="nauchno-issledovatelyskaya-deyatelynost" element={<SubPage />} />
          <Route path="politika-obrabotki-personalnykh-dannykh" element={<SubPage />} />
          <Route path="o-kolledzhe/dostizheniya" element={<SubPage />} />
          <Route path="o-kolledzhe/foto-i-videomaterialy" element={<SubPage />} />
          <Route path="o-kolledzhe/sotrudnichestvo" element={<SubPage />} />
          <Route path="elektronnaya-informatsionno-obrazovatelnaya-sreda" element={<SubPage />} />
          <Route path="virtualnyy-kabinet-proforientatsii" element={<SubPage />} />
          <Route path="virtualnyy-kabinet-po-proforientatsii" element={<SubPage />} />
          <Route path="anons" element={<SubPage />} />
          <Route path="promo" element={<SubPage />} />
          <Route path="search" element={<SubPage />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="specialties" element={<Specialties />} />
          <Route path="torgi-po-223-fz" element={<SubPage />} />
          <Route path="obrabotka-pdn" element={<SubPage />} />
          <Route path="vnutrennyaya-sistema-otsenki-kachestva-obrazovaniya" element={<SubPage />} />
          <Route path="obuchenie-grazhdan-predpensionnogo-vozrasta" element={<SubPage />} />
          <Route path="novye-vozmozhnosti-dlya-kazhdogo" element={<SubPage />} />
          <Route path="partnery" element={<SubPage />} />
          <Route path="edinoe-okno-dlya-molodykh-semey" element={<SubPage />} />
          <Route path="news-departament" element={<SubPage />} />
          
          {/* Catch-all для любых других путей */}
          <Route path="*" element={<SubPage />} />
        </Route>
        {/* Скрытая страница демонстрации дизайна — не в основном Layout */}
        <Route path="/design-showcase-vkp2024" element={<Showcase />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App