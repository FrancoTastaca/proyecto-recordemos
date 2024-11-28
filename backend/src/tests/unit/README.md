# Proyecto Recuerdame - Backend
## Tests Unitarios

Este documento describe los tests unitarios para el proyecto Recuerdame.

### Estructura de Archivos

- `src/tests/unit/unit.test.js`: Contiene los tests unitarios para la funcionalidad del proyecto.

### Descripción de los Tests

#### Pruebas Unitarias

Este conjunto de pruebas verifica la funcionalidad de las unidades individuales del proyecto.

- **Validar correcto codificación y decodificación de QR**
  - `Debería codificar y decodificar un código QR correctamente`: Verifica que un código QR se codifique y decodifique correctamente.

- **Validar que el hasheo de password sea correcto**
  - `Debería hashear y verificar una contraseña correctamente`: Verifica que una contraseña se hashee y verifique correctamente.

### Ejecución de los Tests

Para ejecutar los tests unitarios, utiliza el siguiente comando:

```bash
npm test