import { Button } from 'antd'
import { FC, useEffect, useState } from 'react'
import { PeriodsList, ProgressComponent } from './components'
import { PeriodStyles, PeriodWithProgress } from './types'
import { getRandomColor1 } from './utils'

export const App: FC = () => {
  const [dayStart, setDayStart] = useState<Date | null>(null)
  const [dayEnd, setDayEnd] = useState<Date | null>(null)
  const [periods, setPeriods] = useState<PeriodWithProgress[]>([])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPeriods((prevPeriods) =>
        prevPeriods.map((period) => {
          if (period.startTime && !period.endTime) { // Если период начался и ещё не закончился
            const now = new Date();
            const updatedDuration = (now.getTime() - period.startTime.getTime()) / 1000;
            return { ...period, duration: updatedDuration };
          }
          return period;
        })
      );
    }, 1000); // Обновляем каждую секунду
  
    return () => clearInterval(intervalId); // Очистка ресурсов
  }, []);

  const handleStartDay = () => {
    setDayStart(new Date())
    setDayEnd(null)
  }

  const handleEndDay = () => {
    const end = new Date()
    setDayEnd(end)
    if (dayStart) {
      const duration = (end.getTime() - dayStart.getTime()) / 1000
      console.log(`День завершился. Продолжительность: ${duration.toFixed(2)} секунд.`)
    }
    console.log(periods)
  }

  const handleStartPeriod = () => {
    if (!dayStart) {
      console.log('Необходимо начать день.')
      return
    }
    const newPeriod: PeriodWithProgress = {
      id: periods.length + 1,
      name: `Период ${periods.length + 1}`,
      startTime: new Date(),
      endTime: null,
      color: getRandomColor1(),
      duration: 0
    }
    setPeriods([...periods, newPeriod])
  }

  const handleEndPeriod = () => {
    const end = new Date()
    setPeriods(currentPeriods => {
      const lastIndex = currentPeriods.length - 1
      const lastPeriod = currentPeriods[lastIndex]
      if (lastPeriod.startTime) {
        const duration = (end.getTime() - lastPeriod.startTime.getTime()) / 1000
        console.log(`Период '${lastPeriod.name}' завершен. Продолжительность: ${duration.toFixed(2)} секунд.`)
      }
      // Установить время окончания для последнего периода
      return currentPeriods.map((period, index) =>
        index === lastIndex ? { ...period, endTime: end } : period
      )
    })
  }

  const periodStyles: PeriodStyles = (period) => {
    if (!period.startTime || !dayStart) return {}
    const startSeconds = (period.startTime.getTime() - dayStart.getTime()) / 1000
    let endSeconds = (period.endTime ? period.endTime.getTime() : new Date().getTime()) - dayStart.getTime()
    endSeconds = Math.min(endSeconds, (dayEnd ? dayEnd.getTime() : new Date().getTime()) - dayStart.getTime()) / 1000
    const startPercentage = (startSeconds / (60)) * 100
    const durationPercentage = ((endSeconds - startSeconds) / (60)) * 100
    return {
      left: `${startPercentage}%`,
      width: `${durationPercentage}%`,
    }
  }

  return (
    <div className='App'>
      <ProgressComponent periods={periods} periodStyles={periodStyles} />
      <div className="btns">
        <Button
          onClick={handleStartDay}
          disabled={!!dayStart && !dayEnd}  // dayStart != null && dayEnd == null
          size='small'
          className='btn'
        >
          Начать день
        </Button>
        <Button
          onClick={handleEndDay}
          disabled={!dayStart || !!dayEnd}  // dayStart == null || dayEnd != null
          size='small'
          className='btn'
        >
          Закончить день
        </Button>
        <Button
          onClick={handleStartPeriod} 
          disabled={!dayStart || !!dayEnd}  // dayStart == null || dayEnd != null
          size='small'
          className='btn'
        >
          Начать период
        </Button>
        <Button
          onClick={handleEndPeriod} 
          disabled={periods.length === 0 || !!(periods[periods.length - 1].endTime)}  // periods.length == 0 || periods[periods.length - 1].endTime != null
          size='small'
          className='btn'
        >
          Закончить период
        </Button>
      </div>
      <PeriodsList periods={periods} />
    </div>
  )
}
