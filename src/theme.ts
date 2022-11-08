const COLOR_SET = [
  {
    main: '#1530b6',
    sub: 'cyan',
  },
  {
    main: '#1d17a0',
    sub: 'hotpink',
  },
  {
    main: '#2d1791',
    sub: 'springgreen',
  },
  {
    main: '#0e11c9',
    sub: 'orange',
  },
  {
    main: '#554252',
    sub: 'cyan',
  },
  {
    main: '#130841',
    sub: 'red',
  },
]

const randomIndex = Math.floor(Math.random() * COLOR_SET.length)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // fonts: {
  //   heading: '"BIZ UDPGothic", sans-serif;',
  //   body: '"BIZ UDPGothic", sans-serif;',
  // },
  colors: {
    theme: {
      main: COLOR_SET[randomIndex].main,
      sub: COLOR_SET[randomIndex].sub,
    },
    text: {
      headline: '#1C1F21',
      body: '#494C4F',
      sub: '#747678',
      white: '#FFFFFF',
    },
    grand: {
      grayDark: '#222624',
      gray: '#747678',
      grayLight: '#DFE1E4',
      graySuperLight: '#F7F8FA',
      white: '#FFFFFF',
      success: '#27AE60',
      error: '#EB5757',
      warning: '#F2C94C',
      pink: '#FFA397',
      blue: '#7FC7DE',
      blueLight: '#2F80ED',
      yellow: '#FFC774',
      orange: '#CB7224',
      orangeLight: '#fcf6f1',
      green: '#34C759',
      black: '#1C1F21',
      blackLight: '#0C000C',
      red: '#FF2800',
      purple: '#AA00AA',
      notification: '#B33636',
    },
  },
}
