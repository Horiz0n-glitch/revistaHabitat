'use server'

import { z } from 'zod'
import { createItem } from '@directus/sdk'
import { getDirectusClient } from '@/lib/directus/client'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
})

export async function sendContactEmail(prevState: any, formData: FormData) {
  console.log('[v0] Starting contact form submission via Directus...')

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    console.log('[v0] Validation failed:', validatedFields.error.flatten().fieldErrors)
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Por favor revisa los campos del formulario',
    }
  }

  const { name, email, phone, subject, message } = validatedFields.data

  try {
    const client = getDirectusClient()

    // Create the item in Directus
    // Note: The collection 'mensajes_contacto' must exist in Directus
    // and the Public role (or the token user) must have create permissions
    await client.request(createItem('mensajes_contacto', {
      nombre: name,
      email: email,
      telefono: phone,
      asunto: subject,
      mensaje: message,
      estado: 'nuevo',
      fecha_creacion: new Date().toISOString()
    }))

    console.log('[v0] Message saved to Directus successfully')

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
    }
  } catch (error) {
    console.error('[v0] Error saving message to Directus:', error)
    return {
      success: false,
      message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
    }
  }
}
