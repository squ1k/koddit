import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  uploadTaskFile,
  submitTaskAnswer,
  submitQuizAnswers,
  getQuizResults
} from '../lessonApi'

// Мокаем delay функцию
vi.mock('../delay', () => ({
  default: vi.fn(() => Promise.resolve())
}))

// Мокаем store
vi.mock('@/app/store/store', () => ({
  saveQuizResult: vi.fn(),
  getQuizResult: vi.fn(() => ({
    quizId: 'test-quiz',
    correctCount: '2',
    total: '3'
  }))
}))

describe('lessonApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('uploadTaskFile', () => {
    it('should upload file successfully for valid file', async () => {
      // Создаем mock файл
      const fileContent = 'test content'
      const blob = new Blob([fileContent], { type: 'application/pdf' })
      const mockFile = new File([blob], 'test.pdf', { type: 'application/pdf' })

      const result = await uploadTaskFile('task1', 'student1', mockFile)

      expect(result.success).toBe(true)
      expect(result.fileUrl).toContain('https://storage.example.com')
      expect(result.message).toBe('Файл успешно загружен')
    })

    it('should reject file that is too large', async () => {
      // Создаем большой файл
      const largeContent = 'x'.repeat(15 * 1024 * 1024) // 15MB
      const blob = new Blob([largeContent], { type: 'application/pdf' })
      const mockFile = new File([blob], 'large.pdf', { type: 'application/pdf' })

      const result = await uploadTaskFile('task1', 'student1', mockFile)

      expect(result.success).toBe(false)
      expect(result.message).toContain('слишком большой')
    })

    it('should reject file with invalid extension', async () => {
      const blob = new Blob(['test content'], { type: 'application/octet-stream' })
      const mockFile = new File([blob], 'test.exe', { type: 'application/octet-stream' })

      const result = await uploadTaskFile('task1', 'student1', mockFile)

      expect(result.success).toBe(false)
      expect(result.message).toContain('Недопустимый тип файла')
    })
  })

  describe('submitTaskAnswer', () => {
    it('should submit text answer successfully', async () => {
      const answer = { textAnswer: 'My answer' }

      const result = await submitTaskAnswer('task1', 'student1', answer)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Ответ успешно отправлен')
    })

    it('should submit file answer successfully', async () => {
      const answer = { fileUrl: 'https://example.com/file.pdf' }

      const result = await submitTaskAnswer('task1', 'student1', answer)

      expect(result.success).toBe(true)
      expect(result.message).toBe('Ответ успешно отправлен')
    })
  })

  describe('submitQuizAnswers', () => {
    it('should check quiz answers and return results', async () => {
      const answers = {
        'q1': 'opt1',
        'q2': 'opt2',
        'q3': 'opt3' // неправильный ответ
      }

      const result = await submitQuizAnswers('quiz1', 'student1', answers)

      expect(result.success).toBe(true)
      expect(result.correctCount).toBe(2)
      expect(result.total).toBe(3)
      expect(result.results).toHaveProperty('q1')
      expect(result.results).toHaveProperty('q2')
      expect(result.results).toHaveProperty('q3')
    })
  })

  describe('getQuizResults', () => {
    it('should return quiz results when available', async () => {
      const result = await getQuizResults('quiz1', 'student1')

      expect(result).not.toBeNull()
      expect(result?.quizId).toBe('test-quiz')
      expect(result?.correctCount).toBe(2)
      expect(result?.total).toBe(3)
      expect(result?.percentage).toBe(67) // Math.round(2/3 * 100)
    })

    it('should return null when no results available', async () => {
      // Мокаем отсутствие результатов
      vi.mocked(await import('@/app/store/store')).getQuizResult.mockReturnValueOnce(null)

      const result = await getQuizResults('quiz1', 'student1')

      expect(result).toBeNull()
    })
  })
})