import { FC } from 'react'
import { SuccessProps } from '../types'

export const Success: FC<SuccessProps> = ({ count, setSuccess }) => {
	const onBack = () => {
		setSuccess(false)
		window.location.reload()
	}

	return (
		<div className='success-block'>
			<img src='/assets/success.svg' alt='Success' />
			<h3>Успешно!</h3>
			<p>{count} пользователям отправлено приглашение.</p>
			<button onClick={() => onBack()} className='send-invite-btn'>Назад</button>
		</div>
	)
}
