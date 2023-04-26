module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: false,
        ClassDeclaration: false,
        ArrowFunctionExpression: false,
        FunctionExpression: false,
      },
    }],
    'one-var': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn', {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-useless-constructor': 'off',
    'no-use-before-define': 'off',
    'object-curly-spacing': 2,
    'linebreak-style': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': 'off',
    'no-empty': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    camelcase: 'off',
    'no-param-reassign': [2, { props: false }],
    'max-len': 0,
    'no-continue': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'consistent-return': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': [2, { ignore: ['^#'] }],
    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
      },
      typescript: {},
    },
  },
};
