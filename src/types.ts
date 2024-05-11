import { Dispatch } from 'react'

export type handleChooseVariantType = (idx: number) => void

export type Question = {
	title: string
	variants: string[]
	correct: number
}

export interface ResultProps {
  correct: number,
  setCorrect: Dispatch<number>,
  setStep: Dispatch<number>
}

export interface QuestionProps {
  step: number,
  question: Question,
  handleChooseVariant: handleChooseVariantType
}