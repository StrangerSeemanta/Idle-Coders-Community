module.exports = {
  root: true,
<<<<<<< HEAD
  env: { browser: true, es2020: true },
=======
  env: { browser: true, es2020: true ,"node":true},
>>>>>>> 41bde3095bee20d09bcd4f13479997fadcdbb916
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
