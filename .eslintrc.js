module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'react',
    'react-hooks',
    '@babel'
  ],
  env: {
    jest: true,
    browser: true,
    es6: true
  },
  rules: {
    'linebreak-style': 0,
    'max-len': ['warn',
      { code: 155 }
    ],
    'object-curly-newline': ['warn',
      {
        ObjectExpression: { multiline: true, minProperties: 5 },
        ObjectPattern: {
          multiline: true,
          minProperties: 5
        },
        ImportDeclaration: { multiline: true, minProperties: 6 },
        ExportDeclaration: { multiline: true, minProperties: 6 },
      }
    ],
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 'warn',
    'comma-dangle': 'off',
    'import/prefer-default-export': 0,
    'prefer-promise-reject-errors': 0,
    'padded-blocks': 0,
    'arrow-body-style': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'warn'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@assets', './src/assets'],
          ['@components', './src/components'],
          ['@constants', './src/constants'],
          ['@context', './src/context'],
          ['@helpers', './src/helpers'],
          ['@hooks', './src/hooks'],
          ['@pages', './src/pages'],
          ['@services', './src/services'],
          ['@styles', './src/styles'],
        ]
      }
    }
  }
};
