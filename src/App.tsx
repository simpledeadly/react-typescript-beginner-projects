import { Squircle } from '@squircle-js/react'
import { Dispatch, FC, ReactNode, useState } from 'react'
import './index.scss'

interface ModalProps { modal: boolean, setModal: Dispatch<boolean>, children: ReactNode }

const Modal: FC<ModalProps> = ({ modal, setModal, children }) => (
  <div className={`overlay animated ${modal && 'show'}`}>
    <Squircle
      cornerRadius={15}
      cornerSmoothing={1}
      className="modal"
    >
      { children }
      <Squircle
        cornerRadius={10}
        cornerSmoothing={1}
        className="close-modal-btn"
        onClick={() => setModal(false)}
      >
        Закрыть
      </Squircle>
    </Squircle>
  </div>
)

export const App: FC = () => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className="App">
      <Squircle
        cornerRadius={10}
        cornerSmoothing={1}
        className="open-modal-btn"
        onClick={() => setModal(true)}
      >
        Открыть модалку
      </Squircle>
      <Modal modal={modal} setModal={setModal}>
        <h1>Modal!</h1>
        <p>Yes, it works.</p>
      </Modal>
    </div>
  )
}