import { FC, useState } from 'react'
import { UsersProps } from '../../types'
import { Skeleton } from './Skeleton'
import { User } from './User'

export const Users: FC<UsersProps> = ({ items, invites, loading, success, setSuccess, onClickInvite }) => {
  const [value, setValue] = useState<string>('')

  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Find user ..."
        />
      </div>
      {loading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter(user => {
              const fullName = (user.first_name + user.last_name).toLowerCase()
              return fullName.includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())
            })
            .map<JSX.Element>(user => (
              <User key={user.id} user={user} success={success} setSuccess={setSuccess} isInvited={invites.includes(user.id)} onClickInvite={onClickInvite} />
            ))
          }
        </ul>
      )}
      <button className="send-invite-btn" onClick={() => setSuccess(true)} disabled={invites.length === 0}>{invites.length === 0 ? 'Select users' : 'Send invite'}</button>
    </>
  )
}
