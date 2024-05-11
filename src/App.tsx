import { Dispatch, FC, useState } from 'react'
import './index.scss'

type Question = {
  title: string,
  variants: string[],
  correct: number
}

const questions: Question[] = [
  {
    title: 'Что такое useState?',
    variants: [
      'Это функция для хранения данных компонента',
      'Это глобальный стейт',
      'Это когда ты никому не нужен'
    ],
    correct: 0,
  },
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
]

interface ResultProps {
  correct: number,
  setCorrect: Dispatch<number>,
  setStep: Dispatch<number>
}

const Result: FC<ResultProps> = ({ correct, setCorrect, setStep }) => (
  <div className="result">
    <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt='hurray' />
    <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
    <button onClick={() => {
      setStep(0)
      setCorrect(0)
    }}>
      Попробовать снова
    </button>
  </div>
)

interface QuestionProps {
  step: number,
  question: Question,
  handleChooseVariant: (idx: number) => void
}

const Game: FC<QuestionProps> = ({ step, question, handleChooseVariant }) => {
  const percentage = Math.round(step / questions.length * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map<JSX.Element>(
          (variant, index) => (
            <li onClick={() => handleChooseVariant(index)} key={index}>{variant}</li>
          ))
        }
      </ul>
    </>
  )
}

export const App: FC = () => {
  const [step, setStep] = useState<number>(0)
  const [correct, setCorrect] = useState<number>(0)
  const question: Question = questions[step]

  const handleChooseVariant = (idx: number): void => {
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
