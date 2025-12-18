/**
 * Validation utility functions for form inputs
 * Centralized validation logic to keep code DRY
 */

export type ValidationResult = {
  isValid: boolean
  error?: string
}

/**
 * Email validation using regex
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email is required" }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email" }
  }
  
  return { isValid: true }
}

/**
 * Password validation with configurable minimum length
 */
export const validatePassword = (
  password: string, 
  options: { minLength?: number; requireStrength?: boolean } = {}
): ValidationResult => {
  const { minLength = 6, requireStrength = false } = options

  if (!password) {
    return { isValid: false, error: "Password is required" }
  }
  
  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` }
  }
  
  if (requireStrength) {
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      return { 
        isValid: false, 
        error: "Password must include uppercase, lowercase, and number" 
      }
    }
  }
  
  return { isValid: true }
}

/**
 * Confirm password validation
 */
export const validateConfirmPassword = (
  password: string, 
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: "Please confirm your password" }
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" }
  }
  
  return { isValid: true }
}

/**
 * Name validation
 */
export const validateName = (name: string): ValidationResult => {
  const trimmedName = name.trim()
  
  if (!trimmedName) {
    return { isValid: false, error: "Name is required" }
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" }
  }
  
  return { isValid: true }
}

/**
 * URL validation (for portfolio, website links, etc.)
 */
export const validateUrl = (
  url: string, 
  options: { required?: boolean } = {}
): ValidationResult => {
  const { required = false } = options
  
  if (!url) {
    if (required) {
      return { isValid: false, error: "URL is required" }
    }
    return { isValid: true }
  }
  
  const urlRegex = /^https?:\/\/.+\..+/
  if (!urlRegex.test(url)) {
    return { isValid: false, error: "Please enter a valid URL (including http:// or https://)" }
  }
  
  return { isValid: true }
}

/**
 * Generic required field validation
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} is required` }
  }
  
  return { isValid: true }
}

/**
 * Validate multiple fields at once
 * Returns an object with field names as keys and error messages as values
 */
export const validateFields = <T extends Record<string, unknown>>(
  validators: Record<keyof T, () => ValidationResult>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {}
  
  for (const [field, validator] of Object.entries(validators)) {
    const result = validator()
    if (!result.isValid && result.error) {
      errors[field as keyof T] = result.error
    }
  }
  
  return errors
}
