import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - APP RECUERDAME 2024 - Documentación 💊⏰💉',
      version: '1.0.0',
      description: 'Documentación de la API del backend de la aplicación del Proyecto PS - APP Recuerdame 2024 - UTN FRLP 🎓'
    },
    tags: [
      { name: 'Auth', description: 'Endpoints de autenticación' },
      { name: 'Cuidador', description: 'Endpoints de cuidadores' },
      { name: 'Persona', description: 'Endpoints de personas' },
      { name: 'Vademecum', description: 'Endpoints de vademecum' },
      { name: 'Pastillero', description: 'Endpoints de pastilleros' },
      { name: 'Medicamento', description: 'Endpoints de medicamentos' },
      { name: 'HistorialDosis', description: 'Endpoints de historial de dosis' },
      { name: 'UpdateFile', description: 'Endpoints para manejar archivos' },
      { name: 'Paciente', description: 'Endpoints de pacientes' },
      { name: 'Usuario', description: 'Endpoints de usuarios' }
    ],
    components: {
      schemas: {
        Persona: {
          type: 'object',
          properties: {
            ID: { type: 'string' },
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            dni: { type: 'string' },
            tipo: { type: 'string' },
            codVinculacion: { type: 'string' }
          }
        },
        Cuidador: {
          type: 'object',
          properties: {
            ID: { type: 'string' },
            relacion_paciente: { type: 'string' },
            especialidad: { type: 'string' },
            contacto: { type: 'string' }
          }
        },
        Vademecum: {
          type: 'object',
          properties: {
            ID: { type: 'string' },
            principio_activo: { type: 'string' },
            marca_comercial: { type: 'string' },
            presentacion: { type: 'string' }
          }
        },
        HistorialDosis: {
          type: 'object',
          properties: {
            ID: { type: 'string' },
            dosisRegistrada: { type: 'string' },
            horaPrimerNotificacion: { type: 'string' },
            horaSegundaNotificacion: { type: 'string' },
            primerTomoDosis: { type: 'boolean' },
            segundoTomoDosis: { type: 'boolean' },
            Pastillero_ID: { type: 'string' }
          }
        },
        Pastillero: {
          type: 'object',
          properties: {
            imagenURL: { type: 'string' },
            PacienteID: { type: 'string' },
            MedCuidadorID: { type: 'string' },
            colorPastillero: { type: 'string' },
            horarioDiario: { type: 'string' },
            dosis: { type: 'string' },
            file: { type: 'string', format: 'binary' }
          }
        },
        Medicamento: {
          type: 'object',
          properties: {
            idVademecum: { type: 'string' },
            notas: { type: 'string' },
            marca: { type: 'string' },
            idCuidador: { type: 'string' },
            file: { type: 'string', format: 'binary' }
          }
        },
        Paciente: {
          type: 'object',
          properties: {
            nombre: { type: 'string' },
            apellido: { type: 'string' },
            dni: { type: 'string' },
            codVinculacion: { type: 'string' },
            historial_medico: { type: 'string' },
            contacto_emergencia: { type: 'string' }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            pushToken: { type: 'string' },
            deviceId: { type: 'string' },
            Persona_ID: { type: 'integer' }
          }
        },
        Auth: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
            confirmPassword: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// PDF Generation Function
export async function generateSwaggerPDF() {
    let browser;
    let serverInstance;
  
    try {
      // Launch Puppeteer with some additional options
      browser = await puppeteer.launch({
        headless: 'new', // Use the new headless mode
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();
      
      // Start your Express server
      const server = express();
      server.use('/api', router);
      const serverPort = 3000;
      serverInstance = server.listen(serverPort);
  
      // Navigate to Swagger UI
      await page.goto(`http://localhost:${serverPort}/api/docs`, { 
        waitUntil: 'networkidle0',
        timeout: 60000
      });
  
      // Expand sections using page.evaluate
      await page.evaluate(() => {
        // Seleccionar todos los botones de operaciones
        const operationButtons = document.querySelectorAll(
          '.opblock-summary-get, .opblock-summary-post, .opblock-summary-put, .opblock-summary-delete'
        );
  
        // Hacer clic en cada botón
        operationButtons.forEach(button => button.click());
      });
  
      // Wait for a short time to ensure all sections are expanded
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
  
      // Generate PDF
      await page.pdf({ 
        path: 'swagger-documentation.pdf', 
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
      });
  
      console.log('PDF documentation generated successfully');
  
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    } finally {
      // Ensure browser and server are closed
      if (browser) await browser.close();
      if (serverInstance) serverInstance.close();
    }
  }
  
  export default router;