import { Dispatch } from 'react'

export type OnClickInvite = (id: number) => void

export type Invitations = {
	invites: number[]
	success: boolean
}

export type User = {
	id: number
	email: string
	first_name: string
	last_name: string
	avatar: string
}

export interface SuccessProps {
	count: number
	setSuccess: Dispatch<boolean>
}

export interface UsersProps {
	items: User[]
	invites: number[]
	loading: boolean
	success: boolean
	setSuccess: Dispatch<boolean>
	onClickInvite: OnClickInvite
}

export interface UserProps {
	user: User
	success: boolean
	setSuccess: Dispatch<boolean>
	isInvited: boolean
	onClickInvite: OnClickInvite
}
