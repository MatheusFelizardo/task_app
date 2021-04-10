module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
       'custom': '200px 1fr 130px 90px',
       'new': '200px 1fr 60px',
      },
      width: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
       },
       height: {
         '90vh': '90vh'
       },
       maxHeight: {
         '30rem': '30rem'
       }
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark']
    },
  },
  plugins: [],
}
