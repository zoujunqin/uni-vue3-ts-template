const cssMacro = require('weapp-tailwindcss/css-macro');

module.exports = {
  prefix: 'hx-',
  darkMode: 'hx-dark',
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
        'color-primary': 'var(--hx-color-primary)',
        'color-primary-disable': 'var(--hx-color-primary-disable)',
        'color-primary-hover': 'var(--hx-color-primary-hover)',
        'color-primary-active': 'var(--hx-color-primary-active)',
        'color-success': 'var(--hx-color-success)',
        'color-success-disable': 'var(--hx-color-success-disable)',
        'color-success-hover': 'var(--hx-color-success-hover)',
        'color-success-active': 'var(--hx-color-success-active)',
        'color-warning': 'var(--hx-color-warning)',
        'color-warning-disable': 'var(--hx-color-warning-disable)',
        'color-warning-hover': 'var(--hx-color-warning-hover)',
        'color-warning-active': 'var(--hx-color-warning-active)',
        'color-error': 'var(--hx-color-error)',
        'color-error-disable': 'var(--hx-color-error-disable)',
        'color-error-hover': 'var(--hx-color-error-hover)',
        'color-error-active': 'var(--hx-color-error-active)',
        'text-color': 'var(--hx-text-color)',
        'text-color-regular': 'var(--hx-text-color-regular)',
        'text-color-inverse': 'var(--hx-text-color-inverse)',
        'text-color-grey': 'var(--hx-text-color-grey)',
        'text-color-placeholder': 'var(--hx-text-color-placeholder)',
        'text-color-disable': 'var(--hx-text-color-disable)',
        'text-color-tip': 'var(--hx-text-color-tip)',
        'bg-color': 'var(--hx-bg-color)',
        'bg-color-grey': 'var(--hx-bg-color-grey)',
        'bg-color-hover': 'var(--hx-bg-color-hover)',
        'bg-color-mask': 'var(--hx-bg-color-mask)',
        'bg-color-primary': 'var(--hx-bg-color-primary)',
        'bg-color-success': 'var(--hx-bg-color-success)',
        'bg-color-warning': 'var(--hx-bg-color-warning)',
        'bg-color-error': 'var(--hx-bg-color-error)',
        'border-color': 'var(--hx-border-color)',
        'shadow-button-color': 'var(--hx-shadow-button-color)',
        'shadow-card-color': 'var(--hx-shadow-card-color)',
        'color-title': 'var(--hx-color-title)',
        'color-subtitle': 'var(--hx-color-subtitle)',
        'color-paragraph:': 'var(--hx-color-paragraph:)'
      },
      fontSize: {
        'font-size-sm': 'var(--hx-font-size-sm)',
        'font-size-base': 'var(--hx-font-size-base)',
        'font-size-regular': 'var(--hx-font-size-regular)',
        'font-size-lg': 'var(--hx-font-size-lg)',
        'font-size-title': 'var(--hx-font-size-title)',
        'font-size-subtitle': 'var(--hx-font-size-subtitle)',
        'font-size-paragraph': 'var(--hx-font-size-paragraph)'
      },
      height: {
        'navbar-height': 'var(--hx-navbar-height)',
        'tabbar-height': 'var(--hx-tabbar-height)'
      }
    },
    boxShadow: {
      button: '0 4px 6px var(--hx-shadow-button-color)',
      card: '0 6px 20px 0 var(--hx-shadow-card-color)'
    }
  }
};
