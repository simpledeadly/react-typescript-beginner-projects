import { FC } from 'react'
import { ProgressProps } from '../types'

export const ProgressComponent: FC<ProgressProps> = ({ periods, periodStyles }) =>  {
	return (
		<div className='progress__bar'>
			{periods.map((period, index) => (
				<div key={index} style={{
					...periodStyles(period),
					position: 'absolute',
					backgroundColor: period.color,
				}} className='progress__period' />
			))}
		</div>
	)
}