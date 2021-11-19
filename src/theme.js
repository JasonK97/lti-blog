// const colors = {
//   ltiRed: '#B71A05',
//   darkGrey: '#323232',
//   mediumDarkGrey: '#595959',
//   mediumGrey: '#BDBDBD',
//   lightGrey: '#E6E6E6',
//   black: '#000000',
//   ltiBlue: '#0A415C'
// }

// const shadows = [
//   '3px 3px 10px 0 rgba(0, 0, 0, 0.2)', 
//   '10px 10px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
// ]

// // shadow aliases
// shadows.boxShadowBtn = shadows[0]
// shadows.boxShadowGrid = shadows[1]

// export const theme = { 
//   colors,
//   shadows
// }

///////////////////////////////////////////////////////////////////////////////////
// I kinda like this way better because I get to name the props, but if the array
// is better then that is fine, and I can just do it like that above.
///////////////////////////////////////////////////////////////////////////////////
// shadows: {
//   boxShadowBtn: '3px 3px 10px 0 rgba(0, 0, 0, 0.2)',
//   boxShadowGrid: '10px 10px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
// }

const black = '#000000'
const red = '#B71A05'
const blue = '#0A415C'

export const theme = {
  breakpoints: ['1024px', '2000px'],
  space: [
    0,     // 0
    5,     // 1
    10,    // 2
    15,    // 3
    20,    // 4
    25,    // 5
    30,    // 6
    35,    // 7
    40,    // 8
    '5%',  // 9
    '10%', // 10
    '20%', // 11
    '25%', // 12
    '30%', // 13
    '40%', // 14
    '50%', // 15
    'auto' // 16
  ],
  colors: {
    grey: [
      '#323232',
      '#595959',
      '#BDBDBD',
      '#E6E6E6'
    ],
    red,
    blue,
    black
  },
  shadows: [
    '3px 3px 10px 0 rgba(0, 0, 0, 0.2)',
    '10px 10px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  ],
  borderWidths: ['1px'],
  radii: ['3px', '4px', '5px', '6px', '8px', '10px'],
  fonts: {
    sansSerif: 'filson-pro'
  },
  fontSizes: ['12px', '16px', '24px', '32px', '36px', '42px'],
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  sizes: [
    '5%',  // 0
    '10%', // 1
    '15%', // 2
    '20%', // 3
    '25%', // 4
    '30%', // 5
    '35%', // 6
    '40%', // 7
    '45%', // 8
    '50%', // 9
    '55%', // 10
    '60%', // 11
    '65%', // 12
    '70%', // 13
    '75%', // 14
    '80%', // 15
    '85%', // 16
    '90%', // 17
    '95%', // 18
    '100%' // 19
  ]
}

//////////////////////////////////////////////////////////////////////////////////
// Would it be better to do it this way, or the way in the comments above?
//////////////////////////////////////////////////////////////////////////////////
