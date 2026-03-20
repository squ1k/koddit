import { users } from "@/entities/user/model/users"
import type { User } from "@/shared/types/user"

import delay from "@/shared/api/delay"


export const authApi = {

  async login(phone: string, password: string): Promise<User> {

    await delay()

    const user = users.find(
      u =>
        u.phone === phone &&
        u.password === password
    )

    if (!user) {
      throw new Error("Неверный телефон или пароль")
    }

    return user as User

  },

  async logout() {

    await delay()

    return true

  }

}