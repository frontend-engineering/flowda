/* eslint-disable */
export default {
  displayName: 'schema',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/schema',
  moduleNameMapper: {
    'zod-prisma-types': '../../.yalc/zod-prisma-types/dist/bundle/generator',
  },
}
