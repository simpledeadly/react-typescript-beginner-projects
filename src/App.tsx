import { FC, useState } from 'react'
import { Game, Result } from './components'
import { questions } from './data'
import { Question, handleChooseVariantType } from './types'

export const App: FC = () => {
  const [step, setStep] = useState<number>(0)
  const [correct, setCorrect] = useState<number>(0)
  const question: Question = questions[step]

  const handleChooseVariant: handleChooseVariantType = idx => {
    setStep(step + 1)
    if (idx === question.correct) {
      setCorrect(correct + 1)
    }
  }

  return (
    <div className="App">
      {step !== questions.length ? (
          <Game step={step} question={question} handleChooseVariant={handleChooseVariant} />
        ) : (
          <Result correct={correct} setCorrect={setCorrect} setStep={setStep} />
        )
      }
    </div>
  )
}
