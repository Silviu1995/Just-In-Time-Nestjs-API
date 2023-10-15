import { UserRole } from "../user.role.enum"

export class UserRetrived {
    id: number
    firstName: string
    lastName: string
    email: string
    role: UserRole
    accessToken: string
}