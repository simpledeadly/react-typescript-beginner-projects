export interface PeriodWithProgress {
	id: number
	name: string
	startTime: Date | null
	endTime: Date | null
	color: string
	duration?: number
}

export type PeriodStyles = (period: PeriodWithProgress) => {
	left?: string
	width?: string
}

export type ProgressProps = {
	periods: PeriodWithProgress[]
	periodStyles: PeriodStyles
}

export type FindValueByKey = (
	array: PeriodWithProgress[],
	keyToFind: string,
	valueToMatch: number,
	keyToGet?: string
) => PeriodWithProgress | undefined
