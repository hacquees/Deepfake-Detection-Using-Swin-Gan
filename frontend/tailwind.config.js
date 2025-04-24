/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eeeef4',
          100: '#d1d1e3',
          200: '#a3a3c7',
          300: '#7575ab',
          400: '#4d4d8f',
          500: '#343473',
          600: '#2a2a5c',
          700: '#222246',
          800: '#1a1a2e', // Brand primary
          900: '#13131f',
        },
        secondary: {
          50: '#edf1f7',
          100: '#d2dceb',
          200: '#a6b9d6',
          300: '#7996c2',
          400: '#4d73ad',
          500: '#365891',
          600: '#2b4673',
          700: '#223555',
          800: '#16213e', // Brand secondary
          900: '#0f172e',
        },
        accent: {
          50: '#edf0f5',
          100: '#d2dbe8',
          200: '#a5b7d1',
          300: '#7893ba',
          400: '#4c6fa3',
          500: '#395585',
          600: '#2e4468',
          700: '#23334d',
          800: '#0f3460', // Brand accent
          900: '#0c1f3a',
        },
        success: {
          100: '#d4edda',
          500: '#28a745',
          900: '#145523',
        },
        warning: {
          100: '#fff3cd',
          500: '#ffc107',
          900: '#856404',
        },
        error: {
          100: '#f8d7da',
          500: '#dc3545',
          900: '#721c24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      spacing: {
        '18': '4.5rem',
        '68': '17rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};