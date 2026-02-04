import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Cairo"', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        brand: {
          50: '#fff8e7',
          100: '#ffecc2',
          200: '#ffd98a',
          300: '#ffc553',
          400: '#ffb02b',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        night: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        },
        ocean: {
          500: '#0f172a',
          600: '#0b1120'
        }
      }
    }
  },
  plugins: []
}

export default config
