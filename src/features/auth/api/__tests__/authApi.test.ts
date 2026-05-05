import { describe, it, expect, vi } from 'vitest'
import { authApi } from '../authApi'

vi.mock('@/shared/api/delay', () => ({
  default: vi.fn(() => Promise.resolve())
}))

describe('authApi', () => {
  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const phone = '+7 992 346-65-45'
      const password = 'pass123'

      const result = await authApi.login(phone, password)

      expect(result).toBeDefined()
      expect(result.phone).toBe(phone)
      expect(result.role).toBeDefined()
      expect(result.profileId).toBeDefined()
    })

    it('should throw error with incorrect credentials', async () => {
      const phone = '+7 992 346-65-45'
      const password = 'wrongpassword'

      await expect(authApi.login(phone, password)).rejects.toThrow('Неверный телефон или пароль')
    })

    it('should throw error with non-existent phone', async () => {
      const phone = '+9999999999'
      const password = 'pass123'

      await expect(authApi.login(phone, password)).rejects.toThrow('Неверный телефон или пароль')
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      const result = await authApi.logout()

      expect(result).toBe(true)
    })
  })
})