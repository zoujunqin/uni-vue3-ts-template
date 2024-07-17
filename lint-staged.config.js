module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.vue': [
    'eslint --fix',
    'prettier --write',
    'stylelint --fix --allow-empty-input'
  ],
  'src/**/*.{scss,less,styl,html}': [
    'prettier --write',
    'stylelint --fix --allow-empty-input'
  ]
};
