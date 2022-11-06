import { css } from '@emotion/css'
import theme from '@/theme'

export default css`
  background-color: ${theme.colors.theme.main};
  color: ${theme.colors.theme.sub};
  /* font-family: $baseFontFamily; */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 40px;
    color: ${theme.colors.theme.sub};
  }
  h1 {
    border-bottom: 3px solid ${theme.colors.theme.sub};
    padding: 0.3em 0;
  }
  h2 {
    border-left: 5px solid ${theme.colors.theme.sub};
    border-bottom: none;
    padding: 0.1em 0.1em 0.1em 0.3em;
  }
  p {
    font-size: 1.6rem;
    line-height: 2;
  }
  pre {
    color: ${theme.colors.grand.white};
    background-color: ${theme.colors.grand.black};
  }
  table {
    tr {
      background-color: ${theme.colors.grand.white};
    }
  }
`
