module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true
};