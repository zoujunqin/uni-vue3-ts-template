const cssMacro = require('weapp-tailwindcss/css-macro');

module.exports = {
  prefix: '',
  darkMode: 'dark',
  corePlugins: {
    preflight: false
  },
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
  },
  plugins: [
    cssMacro({
      variantsMap: {
        wx: 'MP-WEIXIN',
        '-wx': {
          value: 'MP-WEIXIN',
          negative: true
        }
        // mv: {
        //   value: 'H5 || MP-WEIXIN'
        // },
        // '-mv': {
        //   value: 'H5 || MP-WEIXIN',
        //   negative: true
        // }
      }
    })
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': 'var(--color-primary)',
        'color-primary-disable': 'var(--color-primary-disable)',
        'color-primary-hover': 'var(--color-primary-hover)',
        'color-primary-active': 'var(--color-primary-active)',
        'color-success': 'var(--color-success)',
        'color-success-disable': 'var(--color-success-disable)',
        'color-success-hover': 'var(--color-success-hover)',
        'color-success-active': 'var(--color-success-active)',
        'color-warning': 'var(--color-warning)',
        'color-warning-disable': 'var(--color-warning-disable)',
        'color-warning-hover': 'var(--color-warning-hover)',
        'color-warning-active': 'var(--color-warning-active)',
        'color-error': 'var(--color-error)',
        'color-error-disable': 'var(--color-error-disable)',
        'color-error-hover': 'var(--color-error-hover)',
        'color-error-active': 'var(--color-error-active)',
        'text-color': 'var(--text-color)',
        'text-color-regular': 'var(--text-color-regular)',
        'text-color-inverse': 'var(--text-color-inverse)',
        'text-color-grey': 'var(--text-color-grey)',
        'text-color-placeholder': 'var(--text-color-placeholder)',
        'text-color-disable': 'var(--text-color-disable)',
        'text-color-tip': 'var(--text-color-tip)',
        'text-color-content': 'var(  --text-color-content)',
        'text-color-main': 'var(--text-color-main)',
        'text-color-success': 'var(--text-color-success)',
        'text-color-theme': 'var(--text-color-theme)',
        'bg-color': 'var(--bg-color)',
        'bg-color-grey': 'var(--bg-color-grey)',
        'bg-color-hover': 'var(--bg-color-hover)',
        'bg-color-mask': 'var(--bg-color-mask)',
        'bg-color-primary': 'var(--bg-color-primary)',
        'bg-color-success': 'var(--bg-color-success)',
        'bg-color-warning': 'var(--bg-color-warning)',
        'bg-color-error': 'var(--bg-color-error)',
        'border-color': 'var(--border-color)',
        'shadow-button-color': 'var(--shadow-button-color)',
        'shadow-card-color': 'var(--shadow-card-color)',
        'color-title': 'var(--color-title)',
        'color-subtitle': 'var(--color-subtitle)',
        'color-paragraph:': 'var(--color-paragraph:)'
      },
      fontSize: {
        'font-size-sm': 'var(--font-size-sm)',
        'font-size-base': 'var(--font-size-base)',
        'font-size-regular': 'var(--font-size-regular)',
        'font-size-lg': 'var(--font-size-lg)',
        'font-size-20': 'var(--font-size-20)',
        'font-size-title': 'var(--font-size-title)',
        'font-size-subtitle': 'var(--font-size-subtitle)',
        'font-size-paragraph': 'var(--font-size-paragraph)'
      },
      height: {
        'navbar-height': 'var(--navbar-height)'
      }
    },
    boxShadow: {
      button: '0 4px 6px var(--shadow-button-color)',
      card: '0 6px 20px 0 var(--shadow-card-color)'
    }
  }
};
