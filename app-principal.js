const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let webhooks = ['http://localhost:4000/webhook'];

app.post('/register', (req, res) => {
  const { nombre, email } = req.body;

  console.log(`Nuevo registro: ${nombre} - ${email}`);

  webhooks.forEach((url) => {
    axios.post(url, { nombre, email })
      .then(() => console.log(`Webhook enviado a ${url}`))
      .catch((err) => console.error(`Error al enviar webhook: ${err.message}`));
  });

  res.status(200).send({ message: 'Usuario registrado y notificación enviada.' });
});

app.post('/webhooks', (req, res) => {
  const { url } = req.body;
  webhooks.push(url);
  console.log(`🔗 Webhook registrado: ${url}`);
  res.status(200).send({ message: 'Webhook registrado correctamente.' });
});

app.listen(PORT, () => {
  console.log(`Servidor principal en http://localhost:${PORT}`);
});
