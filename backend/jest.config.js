// jest.config.js
export default {
  transform: {},
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: ['**/tests/**/*.test.js'] // Ajustar esto según la ubicación de tus archivos de prueba
}
