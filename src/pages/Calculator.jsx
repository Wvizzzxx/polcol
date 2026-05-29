import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  IconCalculator, IconCheck, IconPlus, 
  IconTrash, IconCamera, IconArrowRight, IconStar, IconInfoCircle,
  IconChevronDown, IconX, IconUpload
} from '@tabler/icons-react'
import SpecialtyCard3D from '../components/SpecialtyCard3D'

const EXAM_NAMES = [
  'Математика',
  'Русский язык',
  'Физика',
  'Информатика',
  'Химия',
  'Биология',
  'История',
  'Обществознание',
  'Английский язык',
  'Литература',
  'География',
  'Экономика',
  'Право',
]

const SPECIALTIES = [
  { code: '09.02.07', name: 'Информационные системы и программирование', minScore: 4.5, budget: 30, paid: 10 },
  { code: '09.02.06', name: 'Сетевое и системное администрирование', minScore: 4.3, budget: 25, paid: 10 },
  { code: '09.02.05', name: 'Прикладная информатика', minScore: 4.3, budget: 25, paid: 10 },
  { code: '15.02.08', name: 'Технология машиностроения', minScore: 4.0, budget: 20, paid: 10 },
  { code: '15.02.10', name: 'Мехатроника и мобильная робототехника', minScore: 4.2, budget: 20, paid: 10 },
  { code: '38.02.01', name: 'Экономика и бухгалтерский учёт', minScore: 4.0, budget: 25, paid: 10 },
  { code: '09.02.02', name: 'Компьютерные системы и комплексы', minScore: 4.0, budget: 20, paid: 10 },
  { code: '08.02.01', name: 'Строительство и эксплуатация зданий и сооружений', minScore: 3.7, budget: 15, paid: 5 },
  { code: '10.02.04', name: 'Электрооборудование', minScore: 3.7, budget: 15, paid: 5 },
  { code: '23.02.03', name: 'Монтаж и эксплуатация внутренних систем', minScore: 3.7, budget: 15, paid: 5 },
  { code: '19.02.09', name: 'Гостиничный бизнес', minScore: 3.5, budget: 15, paid: 10 },
  { code: '43.02.10', name: 'Гостеприимство', minScore: 3.5, budget: 10, paid: 10 },
]

export default function Calculator() {
  const [scores, setScores] = useState([{ subject: '', score: '' }])
  const [avgScore, setAvgScore] = useState(null)
  const [attestatFile, setAttestatFile] = useState(null)
  const [attestatPreview, setAttestatPreview] = useState(null)
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const addExam = () => {
    setScores([...scores, { subject: '', score: '' }])
  }

  const removeExam = (idx) => {
    if (scores.length <= 1) return
    setScores(scores.filter((_, i) => i !== idx))
  }

  const updateExam = (idx, field, value) => {
    const updated = [...scores]
    updated[idx][field] = value
    setScores(updated)
  }

  const getUsedSubjects = (currentIdx) => {
    return scores
      .filter((_, i) => i !== currentIdx)
      .map(s => s.subject)
      .filter(Boolean)
  }

  const getAvailableSubjects = (currentIdx) => {
    const used = getUsedSubjects(currentIdx)
    return EXAM_NAMES.filter(name => !used.includes(name))
  }

  const calculate = () => {
    const validScores = scores
      .filter(s => s.subject && s.score !== '' && !isNaN(Number(s.score)))
      .map(s => ({ ...s, score: Number(s.score) }))

    if (validScores.length === 0) {
      alert('Добавьте хотя бы один экзамен с оценкой')
      return
    }

    const avg = validScores.reduce((sum, s) => sum + s.score, 0) / validScores.length
    setAvgScore(Math.round(avg * 100) / 100)

    const matchingSpecialties = SPECIALTIES.map(spec => {
      const passChance = avg >= spec.minScore ? 'high' 
        : avg >= spec.minScore - 0.2 ? 'medium' 
        : avg >= spec.minScore - 0.5 ? 'low' 
        : 'none'
      
      return {
        ...spec,
        passChance,
        chanceLabel: {
          high: 'Высокий шанс',
          medium: 'Средний шанс',
          low: 'Низкий шанс',
          none: 'Маловероятно',
        }[passChance],
        chanceColor: {
          high: 'text-emerald-600 bg-emerald-50 border-emerald-200',
          medium: 'text-amber-600 bg-amber-50 border-amber-200',
          low: 'text-orange-600 bg-orange-50 border-orange-200',
          none: 'text-red-600 bg-red-50 border-red-200',
        }[passChance],
      }
    })

    matchingSpecialties.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2, none: 3 }
      return order[a.passChance] - order[b.passChance]
    })

    setResults({
      scores: validScores,
      avg,
      specialties: matchingSpecialties,
    })
    setShowResults(true)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAttestatFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setAttestatPreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const removeFile = () => {
    setAttestatFile(null)
    setAttestatPreview(null)
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-official-900 via-official-800 to-official-900">
        <div className="absolute inset-0 official-pattern opacity-30" />
        <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex justify-center mb-6">
            {IconCalculator && <IconCalculator className="w-16 h-16 text-white drop-shadow" />}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="badge-accent inline-block">Калькулятор поступления</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Рассчитайте свои шансы
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto">
            Введите оценки за экзамены, узнайте средний балл и получите список специальностей с вероятностью поступления
          </motion.p>
        </div>
      </section>

      {/* CALCULATOR FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step 1: Exam Scores */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm">1</span>
              <h2 className="text-2xl font-bold text-official">Оценки за экзамены</h2>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {scores.map((exam, idx) => {
                  const available = getAvailableSubjects(idx)
                  return (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <span className="text-sm font-bold text-gray-400 w-6">{idx + 1}</span>
                      
                      {/* Subject dropdown */}
                      <div className="flex-1 relative">
                        <select
                          value={exam.subject}
                          onChange={(e) => updateExam(idx, 'subject', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm appearance-none bg-white"
                        >
                          <option value="">Выберите предмет</option>
                          {available.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                          {exam.subject && !available.includes(exam.subject) && (
                            <option value={exam.subject}>{exam.subject}</option>
                          )}
                        </select>
                        <IconChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Score input */}
                      <div className="w-24 relative">
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="1"
                          value={exam.score}
                          onChange={(e) => updateExam(idx, 'score', e.target.value)}
                          placeholder="1-5"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm text-center font-bold"
                        />
                      </div>

                      {/* Remove button */}
                      {scores.length > 1 && (
                        <button
                          onClick={() => removeExam(idx)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={addExam} 
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-accent-dark bg-accent-50 hover:bg-accent-100 rounded-xl border border-accent-200 transition-all"
            >
              <IconPlus className="w-4 h-4" />
              Добавить предмет
            </motion.button>
          </motion.div>

          {/* Step 2: Upload Attestat */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm">2</span>
              <h2 className="text-2xl font-bold text-official">Фото аттестата</h2>
            </div>

            {!attestatPreview ? (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 hover:border-accent rounded-2xl p-10 text-center transition-all hover:bg-accent-50/30">
                  <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-4">
                    <IconCamera className="w-8 h-8 text-accent" />
                  </div>
                  <p className="font-bold text-official mb-1">Загрузите фото аттестата</p>
<p className="text-gray-400 text-sm mb-4">Сторона с оценками</p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent-dark transition-all">
                    <IconUpload className="w-4 h-4" />
                    Выбрать файл
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </div>
              </label>
            ) : (
              <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                    <img src={attestatPreview} alt="Аттестат" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-official text-sm mb-1">{attestatFile?.name}</p>
                    <p className="text-gray-400 text-xs mb-3">
                      {attestatFile && (attestatFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-emerald-600 text-sm font-semibold flex items-center gap-1.5">
                      <IconCheck className="w-4 h-4" />
                      Файл загружен
                    </p>
                  </div>
                  <button onClick={removeFile} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <IconX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Step 3: Calculate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm">3</span>
              <h2 className="text-2xl font-bold text-official">Результат</h2>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={calculate}
              className="w-full px-8 py-4 bg-gradient-to-r from-accent to-accent-dark text-white font-bold rounded-xl hover:from-accent-dark hover:to-accent transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 text-lg flex items-center justify-center gap-3"
            >
              <IconCalculator className="w-5 h-5" />
              Рассчитать шансы поступления
              <IconArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* RESULTS */}
          <AnimatePresence>
            {showResults && results && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -30 }}
                className="space-y-8"
              >
                {/* Average Score */}
                <div className="bg-gradient-to-br from-official-900 via-official-800 to-official-900 rounded-3xl p-8 text-white text-center">
                  <IconStar className="w-10 h-10 text-accent mx-auto mb-3" />
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Ваш средний балл</p>
                  <p className="text-6xl font-extrabold mb-4">{results.avg}</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {results.scores.map((s, i) => (
                      <div key={i} className="bg-white/10 rounded-xl px-4 py-2 text-center">
                        <p className="text-white/50 text-xs">{s.subject}</p>
                        <p className="font-bold text-lg">{s.score}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Matching Specialties */}
                <div>
                  <h3 className="text-xl font-bold text-official mb-2">Подходящие специальности</h3>
                  <p className="text-gray-400 text-sm mb-6">Нажмите на карточку, чтобы увидеть подробную информацию</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {results.specialties.map((spec, idx) => (
                      <SpecialtyCard3D 
                        key={spec.code} 
                        specialty={spec} 
                        avgScore={results.avg}
                        index={idx} 
                      />
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                  <IconInfoCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-official text-sm mb-1">Важно!</p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Калькулятор предоставляет ориентировочную оценку шансов поступления на основе 
                      среднего балла аттестата. Итоговый конкурсный балл зависит от результатов ЕГЭ/ОГЭ, 
                      индивидуальных достижений и других факторов. Для точной информации обращайтесь 
                      в приёмную комиссию.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <Link to="/abiturientam/priemnaya-komissiya" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20">
                    Подать документы
                    <IconArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}