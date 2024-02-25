module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (si vous en utilisez dans votre projet)
    '^@components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    // Transformer pour les fichiers `.js`, `.jsx`, `.ts`, et `.tsx`
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
};
