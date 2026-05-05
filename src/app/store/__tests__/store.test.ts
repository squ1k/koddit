import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  login,
  logout,
  useUser,
  setPageTitle,
  usePageTitle,
  saveQuizResult,
  getQuizResult,
  getAllQuizResults,
  markContentViewed,
  isContentViewed,
  getAllViewedContent,
  topUpBalance,
  payForCourse
} from '../store'

// Мокаем useSyncExternalStore
vi.mock('react', () => ({
  useSyncExternalStore: vi.fn((subscribe, getSnapshot) => getSnapshot())
}))

describe('store', () => {
  beforeEach(() => {
    // Очищаем localStorage и sessionStorage перед каждым тестом
    localStorage.clear()
    sessionStorage.clear()

    // Сбрасываем состояние
    logout()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('authentication', () => {
    it('should login user and set balance', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 'student1'
      }

      login(mockUser)

      expect(useUser()).toEqual(mockUser)
    })

    it('should logout user', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 'student1'
      }

      login(mockUser)
      expect(useUser()).toEqual(mockUser)

      logout()
      expect(useUser()).toBeNull()
    })
  })

  describe('page title', () => {
    it('should set and get page title', () => {
      const title = 'Test Page'

      setPageTitle(title)
      expect(usePageTitle()).toBe(title)
    })
  })

  describe('quiz results', () => {
    it('should save and retrieve quiz results', () => {
      const quizId = 'quiz1'
      const correctCount = 8
      const total = 10

      saveQuizResult(quizId, correctCount, total)

      const result = getQuizResult(quizId)
      expect(result).toEqual({
        quizId,
        correctCount: correctCount.toString(),
        total: total.toString()
      })
    })

    it('should get all quiz results', () => {
      saveQuizResult('quiz1', 8, 10)
      saveQuizResult('quiz2', 5, 5)

      const allResults = getAllQuizResults()
      expect(Object.keys(allResults)).toHaveLength(2)
      expect(allResults['quiz1']).toBeDefined()
      expect(allResults['quiz2']).toBeDefined()
    })
  })

  describe('content viewing', () => {
    it('should mark content as viewed', () => {
      const contentId = 'lesson1'

      expect(isContentViewed(contentId)).toBe(false)

      markContentViewed(contentId)

      expect(isContentViewed(contentId)).toBe(true)
    })

    it('should get all viewed content', () => {
      markContentViewed('lesson1')
      markContentViewed('lesson2')

      const viewedContent = getAllViewedContent()
      expect(viewedContent['lesson1']).toBe(true)
      expect(viewedContent['lesson2']).toBe(true)
    })
  })

  describe('balance management', () => {
    it('should top up balance', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 'student1'
      }

      // Устанавливаем начальный баланс в localStorage перед логином
      localStorage.setItem('koddit_balance', JSON.stringify({ 'student1': 100 }))

      login(mockUser)

      topUpBalance(50)

      // Проверяем, что баланс обновился (через localStorage)
      const storedBalances = JSON.parse(localStorage.getItem('koddit_balance') || '{}')
      expect(storedBalances['student1']).toBe(150)
    })
  })

  describe('course payment', () => {
    it('should pay for course successfully', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 's1' // Используем правильный profileId
      }

      // Устанавливаем баланс перед логином (больше цены курса 3000)
      localStorage.setItem('koddit_balance', JSON.stringify({ 's1': 4000 }))

      login(mockUser)

      const result = payForCourse('e2', 's1') // Используем неоплаченный enrollment e2

      expect(result.success).toBe(true)
      expect(result.message).toContain('Курс оплачен')

      // Проверяем обновление баланса
      const storedBalances = JSON.parse(localStorage.getItem('koddit_balance') || '{}')
      expect(storedBalances['s1']).toBe(1000) // 4000 - 3000 = 1000
    })

    it('should fail payment when insufficient balance', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 's1'
      }

      // Устанавливаем низкий баланс
      localStorage.setItem('koddit_balance', JSON.stringify({ 's1': 10 }))

      login(mockUser)

      const result = payForCourse('e2', 's1')

      expect(result.success).toBe(false)
      expect(result.message).toBe('Недостаточно средств на балансе')
    })

    it('should fail payment for already paid course', () => {
      const mockUser = {
        id: '1',
        phone: '+1234567890',
        password: 'password',
        role: 'student' as const,
        profileId: 's1'
      }

      login(mockUser)

      // Устанавливаем баланс и помечаем курс как оплаченный
      localStorage.setItem('koddit_balance', JSON.stringify({ 's1': 200 }))
      localStorage.setItem('koddit_enrollments', JSON.stringify({
        'e1': { paid: true, paidUntil: '2024-12-31' }
      }))

      const result = payForCourse('e1', 's1')

      expect(result.success).toBe(false)
      expect(result.message).toBe('Курс уже оплачен')
    })
  })
})