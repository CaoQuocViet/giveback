export interface RegisterAddressData {
  province: string
  district: string
  ward: string
  address: string
}

export interface RegisterCharityData {
  title: string
  description: string
  licenseNumber: string
  licenseDate: string
  licenseIssuer: string
  licenseImageUrl: string
}

export type Role = "DONOR" | "CHARITY" | "BENEFICIARY"

export interface RegisterFormData {
  email: string
  password: string
  phone: string
  fullName: string
  role: Role
  province: string
  district: string
  ward: string
  address: string
  title: string
  description: string
  licenseNumber: string
  licenseDate: string
  licenseIssuer: string
  licenseImageUrl: string
}

// Add validation types
export interface RegisterValidation {
  email: RegExp
  phone: RegExp
  password: {
    minLength: number
    maxLength: number
    pattern: RegExp
  }
}

export const registerValidation: RegisterValidation = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^(0|84)[3-9][0-9]{8}$/,
  password: {
    minLength: 8,
    maxLength: 32,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
}
