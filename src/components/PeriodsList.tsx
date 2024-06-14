import { ColorPicker, Modal } from 'antd'
import { FC, SetStateAction, useState } from 'react'
import { FindValueByKey, PeriodWithProgress } from '../types'

type PeriodsProps = {
	periods: PeriodWithProgress[]
}

export const PeriodsList: FC<PeriodsProps> = ({ periods }) =>  {
	const [modal, setModal] = useState<boolean>(false)
	const [activePeriod, setActivePeriod] = useState<PeriodWithProgress | null | undefined>(null)

	const findValueByKey: FindValueByKey = (array, keyToFind, valueToMatch, keyToGet) => {
    const obj = array.find((item: any) => item[keyToFind] === valueToMatch)

    // if (keyToGet) {
    //   return obj[keyToGet]
    // } else {
    //   return obj
    // }
		return obj
  }

  const showModal = (id: number) => {
    setModal(true)
		const periodToFind: SetStateAction<PeriodWithProgress | null | undefined> = findValueByKey(periods, 'id', id)
		setActivePeriod(periodToFind)
  }

  const handleExit = () => {
    setModal(false)
  }
	
	const handleEditPeriod = () => {
		// TODO: decompose
	}

	return (
		<ul className='periods__list'>
			{periods.map((period, index) => (
				<>
					<li key={index} className='periods__list__element'>
						<span className='badge' style={{ background: period.color }}>ㅤ</span>
						<p onClick={() => showModal(period.id)} style={{ fontWeight: 'bold' }}>{period.name}</p>
						<p style={{ fontSize: '14px', color: '#a0a0a0' }}>{period.duration}</p>
					</li>
					{activePeriod && (
						<Modal title={activePeriod.name} open={modal} onOk={handleExit} onCancel={handleExit}>
							<div className="modal__content">
								<div className="element">
									<p><strong>Название:</strong></p><p style={{ marginLeft: '0.25rem' }}>{activePeriod && activePeriod.name}</p><p onClick={handleEditPeriod} style={{ marginLeft: '0.25rem', color: 'red', cursor: 'pointer' }}>Edit</p>
								</div>
								<div className="element">
									<p><strong>Продолжительность:</strong></p><p style={{ marginLeft: '0.25rem' }}>{activePeriod ? activePeriod.duration + ' секунд' : 'No duration'}</p><p style={{ marginLeft: '0.25rem', color: 'red', cursor: 'pointer' }}>Edit</p>
								</div>
								<div className="element">
									<p><strong>Начало:</strong></p><p style={{ marginLeft: '0.25rem' }}>{activePeriod && activePeriod.startTime?.toLocaleString()}</p><p style={{ marginLeft: '0.25rem', color: 'red', cursor: 'pointer' }}>Edit</p>
								</div>
								<div className="element">
									<p><strong>Конец:</strong></p><p style={{ marginLeft: '0.25rem' }}>{activePeriod && activePeriod.endTime?.toLocaleString()}</p><p style={{ marginLeft: '0.25rem', color: 'red', cursor: 'pointer' }}>Edit</p>
								</div>
								<div className="element">
									<p><strong>Цвет:</strong></p><p style={{ marginLeft: '0.25rem' }}>{activePeriod.color && <ColorPicker defaultValue={activePeriod.color} showText />}</p><p style={{ marginLeft: '0.25rem', color: 'red', cursor: 'pointer' }}>Edit</p>
								</div>
							</div>
						</Modal>
					)}
				</>
			))}
		</ul>
	)
}