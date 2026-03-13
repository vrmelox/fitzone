// src/lib/validations.ts (avec Zod)
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe minimum 8 caractères')
})

export const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Mot de passe minimum 8 caractères'),
  firstName: z.string().min(2, 'Prénom minimum 2 caractères'),
  lastName: z.string().min(2, 'Nom minimum 2 caractères'),
  phone: z.string().optional()
})

export const memberSchema = z.object({
  membershipType: z.enum(['basic', 'premium', 'vip']),
  emergencyContact: z.string().min(10, 'Contact d\'urgence requis'),
  medicalNotes: z.string().optional()
})