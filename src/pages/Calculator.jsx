import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  IconCalculator, IconPlus, 
  IconTrash, IconArrowRight, IconStar, IconInfoCircle
} from '@tabler/icons-react'

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
  { code: '09.02.07', name: 'Информационные системы и программирование', minScore: 4.5, avgPass: 4.7, budget: 30, paid: 10, places: 40 },
  { code: '09.02.06', name: 'Сетевое и системное администрирование', minScore: 4.3, avgPass: 4.5, budget: 25, paid: 10, places: 35 },
  { code: '09.02.05', name: 'Прикладная информатика', minScore: 4.3, avgPass: 4.4, budget: 25, paid: 10, places: 35 },
  { code: '15.02.08', name: 'Технология машиностроения', minScore: 4.0, avgPass: 4.2, budget: 20, paid: 10, places: 30 },
  { code: '15.02.10', name: 'Мехатроника и мобильная робототехника', minScore: 4.2, avgPass: 4.4, budget: 20, paid: 10, places: 30 },
  { code: '38.02.01', name: 'Экономика и бухгалтерский учёт', minScore: 4.0, avgPass: 4.1, budget: 25, paid: 10, places: 35 },
  { code: '09.02.02', name: 'Компьютерные системы и комплексы', minScore: 4.0, avgPass: 4.2, budget: 20, paid: 10, places: 30 },
  { code: '08.02.01', name: 'Строительство и эксплуатация зданий и сооружений', minScore: 3.7, avgPass: 3.9, budget: 15, paid: 5, places: 20 },
  { code: '10.02.04', name: 'Электрооборудование', minScore: 3.7, avgPass: 3.8, budget: 15, paid: 5, places: 20 },
  { code: '23.02.03', name: 'Монтаж и эксплуатация внутренних систем', minScore: 3.7, avgPass: 3.8, budget: 15, paid: 5, places: 20 },
  { code: '19.02.09', name: 'Гостиничный бизнес', minScore: 3.5, avgPass: 3.7, budget: 15, paid: 10, places: 25 },
  { code: '43.02.10', name: 'Гостеприимство', minScore: 3.5, avgPass: 3.6, budget: 10, paid: 10, places: 20 },
]

export default function Calculator() {
  const [scores, setScores] = useState([{ subject: '', score: '' }])
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

  const validScores = useMemo(() =>
    scores.filter(s => s.subject && s.score !== '' && !isNaN(Number(s.score))).map(s => ({ ...s, score: Number(s.score) })),
    [scores]
  )

  const liveAvg = useMemo(() => {
    if (validScores.length === 0) return null
    const avg = validScores.reduce((sum, s) => sum + s.score, 0) / validScores.length
    return Math.round(avg * 100) / 100
  }, [validScores])

  const liveMatchCount = useMemo(() => {
    if (liveAvg === null) return 0
    return SPECIALTIES.filter(s => liveAvg >= s.minScore - 0.5).length
  }, [liveAvg])

  const calculate = () => {
    if (validScores.length === 0) {
      alert('Добавьте хотя бы один экзамен с оценкой')
      return
    }

    const avg = liveAvg

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
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
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
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Live summary bar */}
          {validScores.length > 0 && (
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-lg mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <IconStar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Средний балл</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-official">{liveAvg}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="text-gray-400">{validScores.length} {validScores.length === 1 ? 'предмет' : 'предметов'}</span>
                {liveMatchCount > 0 && (
                  <span className="px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-lg text-[10px] sm:text-xs">
                    Подходит {liveMatchCount} {liveMatchCount === 1 ? 'специальность' : liveMatchCount < 5 ? 'специальности' : 'специальностей'}
                  </span>
                )}
              </div>
            </div>
          )}

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
                      
                      {/* Subject input with datalist */}
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={exam.subject}
                          onChange={(e) => updateExam(idx, 'subject', e.target.value)}
                          list={`subjects-${idx}`}
                          placeholder="Введите или выберите предмет"
                          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm bg-white"
                        />
                        <datalist id={`subjects-${idx}`}>
                          {available.map(name => (
                            <option key={name} value={name} />
                          ))}
                        </datalist>
                      </div>

                      {/* Score buttons */}
                      <div className="flex items-center gap-1">
                        {[2, 3, 4, 5].map(val => (
                          <button
                            key={val}
                            onClick={() => updateExam(idx, 'score', String(val))}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-bold text-sm transition-all ${
                              exam.score === String(val)
                                ? val === 5 ? 'bg-emerald-500 text-white shadow-md'
                                : val === 4 ? 'bg-blue-500 text-white shadow-md'
                                : val === 3 ? 'bg-amber-500 text-white shadow-md'
                                : 'bg-red-400 text-white shadow-md'
                                : 'bg-white border-2 border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
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

          {/* Step 2: Calculate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm">2</span>
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
                  <p className="text-gray-400 text-sm mb-6">Сравните ваш балл со средним проходным</p>
                  <div className="space-y-4">
                    {results.specialties.map((spec, idx) => {
                      const diff = results.avg - spec.avgPass
                      const diffLabel = diff >= 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)
                      const diffColor = diff >= 0.3 ? 'text-emerald-600' : diff >= 0 ? 'text-blue-600' : diff >= -0.3 ? 'text-amber-600' : 'text-red-500'
                      const barWidth = Math.min(100, Math.max(5, (results.avg / 5) * 100))
                      const passBarWidth = Math.min(100, Math.max(5, (spec.avgPass / 5) * 100))
                      
                      return (
                        <motion.div
                          key={spec.code}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-gray-200 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-accent-dark bg-accent-50 px-2 py-0.5 rounded-full">{spec.code}</span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${spec.chanceColor}`}>{spec.chanceLabel}</span>
                              </div>
                              <h4 className="font-bold text-official text-sm leading-snug">{spec.name}</h4>
                            </div>
                            <div className={`text-right flex-shrink-0`}>
                              <p className={`text-lg font-extrabold ${diffColor}`}>{diffLabel}</p>
                              <p className="text-[10px] text-gray-400 font-medium">к проходному</p>
                            </div>
                          </div>

                          {/* Comparison bars */}
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <span className="text-gray-500 font-medium">Ваш балл</span>
                                <span className="font-bold text-official">{results.avg}</span>
                              </div>
                              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${barWidth}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.05 + 0.2, ease: 'easeOut' }}
                                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-[11px] mb-1">
                                <span className="text-gray-500 font-medium">Средний проходной</span>
                                <span className="font-bold text-gray-400">{spec.avgPass}</span>
                              </div>
                              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${passBarWidth}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.05 + 0.3, ease: 'easeOut' }}
                                  className="h-full rounded-full bg-gradient-to-r from-gray-300 to-gray-400"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Info row */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                            <span>Бюджет: {spec.budget} мест</span>
                            <span>Платное: {spec.paid} мест</span>
                          </div>
                        </motion.div>
                      )
                    })}
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