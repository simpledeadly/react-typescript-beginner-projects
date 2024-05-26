import { FC, useEffect, useState } from 'react'
import { Success } from './components/Success'
import { Users } from './components/Users/Users'
import { OnClickInvite, User } from './types'

// список пользователей: https://reqres.in/api/users

export const App: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [invites, setInvites] = useState<number[]>([])
	const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(res => setUsers(res.data))
    setLoading(false)
  }, [])

  const onClickInvite: OnClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites(prev => prev.filter(_id => _id !== id))
    } else {
      setInvites(prev => [...prev, id])
    }
  }

  return (
    <div className="App">
      {!success ? (
          <Users loading={loading} items={users} invites={invites} success={success} setSuccess={setSuccess} onClickInvite={onClickInvite} />
        ) : (
          <Success count={invites.length} setSuccess={setSuccess} />
        )
      }
    </div>
  )
}