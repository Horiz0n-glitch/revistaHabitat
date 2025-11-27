'use server'

import { z } from 'zod'
import { Resend } from 'resend'

const contactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: 'El asunto debe tener al menos 5 caracteres' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(prevState: any, formData: FormData) {
  console.log('[v0] Starting contact form submission...')
  
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
    if (process.env.RESEND_API_KEY) {
      console.log('[v0] RESEND_API_KEY found. Attempting to send email...')
      
      const data = await resend.emails.send({
        from: 'Revista Habitat <onboarding@resend.dev>',
        to: 'yosuanmulti@gmail.com',
        replyTo: email,
        subject: `Nuevo contacto: ${subject}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone || 'No especificado'}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      })

      console.log('[v0] Resend API response:', data)

      if (data.error) {
        console.error('[v0] Resend returned an error:', data.error)
        throw new Error(data.error.message)
      }
      
      console.log('[v0] Email sent successfully to yosuanmulti@gmail.com')
    } else {
      console.log('[v0] RESEND_API_KEY is missing. Simulating email send to yosuanmulti@gmail.com')
      // Simulate delay if no API key
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.',
    }
  } catch (error) {
    console.error('[v0] Error sending email:', error)
    return {
      success: false,
      message: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.',
    }
  }
}
