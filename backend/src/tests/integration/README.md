# Proyecto Recuerdame - Backend

## Tests de Integración de Controllers

Este documento describe los tests de integración para los controllers en el proyecto Recuerdame.

### Estructura de Archivos

- `src/tests/integration/controllers/auth.integration.test.js`: Contiene los tests de integración para los endpoints de autenticación.
- `src/tests/integration/controllers/cuidador.integration.test.js`: Contiene los tests de integración para los endpoints de cuidadores.
- `src/tests/integration/controllers/medicamento.integration.test.js`: Contiene los tests de integración para los endpoints de medicamentos.
- `src/tests/integration/controllers/pastillero.integration.test.js`: Contiene los tests de integración para los endpoints de pastilleros.
- `src/tests/integration/controllers/vademecum.integration.test.js`: Contiene los tests de integración para los endpoints de vademecum.

### Descripción de los Tests

#### Pruebas de Autenticación - Integración

Este conjunto de pruebas verifica la funcionalidad de los endpoints de autenticación.

- **Configuración Inicial**
  - `beforeAll`: Configura la aplicación, inicia el servidor en un puerto aleatorio y inicializa los usuarios de prueba.
  - `afterAll`: Limpia los usuarios de prueba, cierra la conexión a la base de datos y detiene el servidor HTTP.

- **Tests de Registro**
  - `POST /auth/sign-up`
    - `Debería registrar un nuevo usuario correctamente`: Verifica que un nuevo usuario pueda registrarse correctamente.
    - `Debería fallar al registrar un usuario con datos inválidos`: Verifica que se manejen los errores de validación al registrar un usuario.

- **Tests de Inicio de Sesión**
  - `POST /auth/sign-in`
    - `Debería permitir iniciar sesión con credenciales válidas`: Verifica que un usuario pueda iniciar sesión correctamente con credenciales válidas.
    - `Debería rechazar inicio de sesión con credenciales inválidas`: Verifica que se manejen los errores de autenticación al iniciar sesión con credenciales inválidas.

- **Tests de Cierre de Sesión**
  - `POST /auth/sign-out`
    - `Debería cerrar sesión correctamente`: Verifica que la cookie JWT sea limpiada y que se devuelva una respuesta de éxito al cerrar sesión.

- **Tests de Inicio de Sesión con QR**
  - `POST /auth/loginPacienteConQR`
    - `Debería permitir iniciar sesión con un código QR válido`: Verifica que un usuario pueda iniciar sesión correctamente utilizando un código QR.

#### Pruebas de Cuidador - Integración

Este conjunto de pruebas verifica la funcionalidad de los endpoints de cuidadores.

- **Generar QR**
  - `POST /api/cuidador/generarQR`
    - `Debería generar un código QR correctamente`: Verifica que se genere un código QR correctamente.

#### Pruebas de Medicamento Cuidador - Integración

Este conjunto de pruebas verifica la funcionalidad de los endpoints de medicamentos.

- **Agregar Medicamento**
  - `POST /api/medicamento/agregar`
    - `Debería agregar un nuevo medicamento correctamente`: Verifica que se pueda agregar un nuevo medicamento correctamente.

- **Obtener Medicamentos**
  - `GET /api/medicamento`
    - `Debería obtener la lista de medicamentos`: Verifica que se pueda obtener la lista de medicamentos correctamente.

- **Actualizar Medicamento**
  - `PUT /api/medicamento/modificar/:id`
    - `Debería actualizar un medicamento existente`: Verifica que se pueda actualizar un medicamento existente correctamente.

- **Eliminar Medicamento**
  - `DELETE /api/medicamento/borrar/:id`
    - `Debería eliminar un medicamento existente`: Verifica que se pueda eliminar un medicamento existente correctamente.

#### Pruebas de Pastillero - Integración

Este conjunto de pruebas verifica la funcionalidad de los endpoints de pastilleros.

- **Crear Pastillero**
  - `POST /api/pastilleroAlarma`
    - `Debería crear un nuevo pastillero correctamente`: Verifica que se pueda crear un nuevo pastillero correctamente.

- **Obtener Pastilleros**
  - `GET /api/pastilleroAlarma`
    - `Debería obtener la lista de pastilleros`: Verifica que se pueda obtener la lista de pastilleros correctamente.

- **Actualizar Pastillero**
  - `PUT /api/pastilleroAlarma/:id`
    - `Debería actualizar un pastillero existente`: Verifica que se pueda actualizar un pastillero existente correctamente.

- **Eliminar Pastillero**
  - `DELETE /api/pastilleroAlarma/:id`
    - `Debería eliminar un pastillero existente`: Verifica que se pueda eliminar un pastillero existente correctamente.

#### Pruebas de Vademecum - Integración

Este conjunto de pruebas verifica la funcionalidad de los endpoints de vademecum.

- **Obtener Vademecum para Desplegable**
  - `GET /api/vademecum/desplegable`
    - `Debería obtener el vademecum para desplegable correctamente`: Verifica que se pueda obtener el vademecum para desplegable correctamente.

- **Listar Vademecum según Tipo**
  - `GET /api/vademecum/listarSegunTipo`
    - `Debería listar el vademecum según tipo correctamente`: Verifica que se pueda listar el vademecum según tipo correctamente.

- **Obtener Droga para Desplegable**
  - `GET /api/vademecum/drogaDesplegable`
    - `Debería obtener la droga para desplegable correctamente`: Verifica que se pueda obtener la droga para desplegable correctamente.

- **Leer Vademecum por ID**
  - `GET /api/vademecum/:id`
    - `Debería obtener el vademecum por ID correctamente`: Verifica que se pueda obtener el vademecum por ID correctamente.

### Ejecución de los Tests

Para ejecutar los tests de integración, utiliza el siguiente comando:

```bash
npm test
```