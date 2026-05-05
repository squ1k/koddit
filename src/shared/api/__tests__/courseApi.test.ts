import { describe, it, expect } from 'vitest'
import { getCourseById, getCoursesByTeacher, getCoursesByStudent } from '../courseApi'

describe('courseApi', () => {
  describe('getCourseById', () => {
    it('should return course when exists', () => {
      const course = getCourseById('c1')

      expect(course).toBeDefined()
      expect(course?.id).toBe('c1')
      expect(course?.title).toBeDefined()
    })

    it('should return undefined when course does not exist', () => {
      const course = getCourseById('nonexistent')

      expect(course).toBeUndefined()
    })
  })

  describe('getCoursesByTeacher', () => {
    it('should return courses for existing teacher', () => {
      const courses = getCoursesByTeacher('t1')

      expect(courses).toBeDefined()
      expect(Array.isArray(courses)).toBe(true)
      expect(courses.length).toBeGreaterThan(0)
      expect(courses[0].teacherId).toBe('t1')
    })

    it('should return empty array for non-existent teacher', () => {
      const courses = getCoursesByTeacher('nonexistent')

      expect(courses).toEqual([])
    })
  })

  describe('getCoursesByStudent', () => {
    it('should return courses for student with enrollments', () => {
      const courses = getCoursesByStudent('s1')

      expect(courses).toBeDefined()
      expect(Array.isArray(courses)).toBe(true)
      // Проверяем, что возвращаются только определенные курсы
      expect(courses.some(c => c.id === 'c1')).toBe(true)
    })

    it('should return empty array for student without enrollments', () => {
      const courses = getCoursesByStudent('nonexistent')

      expect(courses).toEqual([])
    })
  })
})