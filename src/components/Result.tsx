import { FC } from 'react'
import { questions } from '../data'
import { ResultProps } from '../types'

export const Result: FC<ResultProps> = ({ correct, setCorrect, setStep }) => (
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