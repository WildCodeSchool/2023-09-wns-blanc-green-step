import { User } from "../entities/user.entity"

export type CustomContext = {
    user: User,
    token: string
}