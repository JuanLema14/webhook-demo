const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'juan.lema1408@gmail.com',
    pass: 'lwpz acng jsqt tsmf'
  }
});

function getHtmlTemplate(nombre, email) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f9fafc; padding: 2rem;">
      <div style="background: white; padding: 1.5rem; border-radius: 10px; max-width: 500px; margin: auto; box-shadow: 0 0 15px rgba(0,0,0,0.05);">
        <h2 style="color: #4f8cff;">🎉 Nuevo Registro</h2>
        <p style="font-size: 1.1rem;">Se ha registrado un nuevo usuario con los siguientes datos:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <p style="margin-top: 1rem;">Este mensaje fue generado automáticamente desde el sistema de registros.</p>
      </div>
    </div>
  `;
}

app.post('/webhook', async (req, res) => {
  const { nombre, email } = req.body;
  console.log('Webhook recibido con datos:', req.body);

  try {
    await transporter.sendMail({
      from: 'juan.lema1408@gmail.com',
      to: email,
      subject: 'Registro exitoso',
      html: getHtmlTemplate(nombre, email)
    });

    console.log('Correo enviado correctamente');
    res.status(200).send('Webhook recibido y correo enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar correo');
  }
});

app.listen(4000, () => {
  console.log('Webhook Receiver escuchando en http://localhost:4000/webhook');
});
