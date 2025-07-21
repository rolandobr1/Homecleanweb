'use server';

import * as z from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields.',
    };
  }

  const { fullName, email, message } = validatedFields.data;
  
  try {
    const data = await resend.emails.send({
      from: 'Web Contacto <onboarding@resend.dev>',
      to: ['valdezrolando93@gmail.com'],
      subject: `Nuevo mensaje de ${fullName} desde la web`,
      reply_to: email,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });
    
    return { success: true, data };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      error: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo más tarde.',
    };
  }
}

const registrationFormSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
});

export async function sendRegistrationEmail(formData: z.infer<typeof registrationFormSchema>) {
  const validatedFields = registrationFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Campos inválidos.',
    };
  }

  const { fullName, email, phone, message } = validatedFields.data;

  try {
    const data = await resend.emails.send({
      from: 'Registro Web <onboarding@resend.dev>',
      to: ['valdezrolando93@gmail.com'],
      subject: `Nuevo registro para distribuidor: ${fullName}`,
      reply_to: email,
      html: `
        <h1>Nuevo Registro de Distribuidor</h1>
        <p>Una persona ha mostrado interés en ser distribuidor de Home Clean.</p>
        <h2>Datos del solicitante:</h2>
        <ul>
          <li><strong>Nombre Completo:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Teléfono:</strong> ${phone}</li>
        </ul>
        <h2>Mensaje:</h2>
        <p>${message}</p>
      `,
    });

    return { success: true, data };

  } catch (error) {
    console.error('Error sending registration email:', error);
    return {
      error: 'Hubo un problema al enviar el registro. Por favor, inténtalo más tarde.',
    };
  }
}
