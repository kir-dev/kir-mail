module.exports = {
  root: true,
  plugins: ['@nx', '@typescript-eslint/eslint-plugin', 'prettier', 'simple-import-sort'],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    eqeqeq: 'error',
    'max-depth': 'error',
    'max-lines': 'warn',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-eval': 'error',
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-negated-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'error',
    'no-useless-concat': 'error',
    'no-void': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-template': 'error',
    yoda: 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
