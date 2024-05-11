import { Dispatch, FC, useState } from 'react'
import './index.scss'

export const App: FC = (): JSX.Element => {
  const [counter, setCounter]: [number, Dispatch<number>] = useState<number>(0)

  return (
    <div className='App'>
      <div>
        <h2>Счётчик:</h2>
        <h1>{counter}</h1>
        <button onClick={(): void => setCounter(counter - 1)} className='minus'>Минус -</button>
        <button onClick={(): void => setCounter(counter + 1)} className='plus'>Плюс +</button>
      </div>
    </div>
  )
}