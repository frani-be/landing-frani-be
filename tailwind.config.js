/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#b55aff',
        'custom-purple-dark': '#8b2db3',
        'custom-light-purple': '#e8d4f9',
        'custom-dark-blue': '#3333a8',
        'custom-light-grey': '#f1f1f1',
        'custom-dark-gray': '#565656',
        'custom-black': '#2f2f2f',
        'laboral': '#2555a3',
        'academica': '#9f2eba',
        'docencia': '#7d1fc7',
        'voluntariados': '#bd2c97',
      },
      fontFamily: {
        'titles': ['"Work Sans"', 'sans-serif'],
        'primary': ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.5em',
        'sm': '0.75em',
        'base': '1em',
        'lg': '1.25em',
        'xl': '1.5em',
        '2xl': '2em',
        '3xl': '2.5em',
        '4xl': '3em',
        '5xl': '4em',
      },
      borderRadius: {
        'small': '7px',
        'medium': '10px',
        'large': '20px',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(45deg, #f1f1f1 40%, #b55aff 100%)',
        'gradient-footer': 'linear-gradient(135deg, #b55aff 0%, #8b2db3 100%)',
      },
      maxWidth: {
        '540': '540px',
        '722': '722px',
        '900': '900px',
        '1220': '1220px',
        '1380': '1380px',
      },
      spacing: {
        '0.25': '0.25rem',
        '0.35': '0.35rem',
        '0.75': '0.75rem',
        '1.2': '1.2rem',
        '2.5': '2.5rem',
      },
    },
  },
  plugins: [],
}
