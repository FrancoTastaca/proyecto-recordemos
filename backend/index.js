const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
