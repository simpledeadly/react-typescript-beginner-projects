import { FC } from 'react'
import { questions } from '../data'
import { QuestionProps } from '../types'

export const Game: FC<QuestionProps> = ({ step, question, handleChooseVariant }) => {
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