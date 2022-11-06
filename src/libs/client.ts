import { createClient } from 'newt-client-js'

export const client = createClient({
  spaceUid: process.env.SPACE_U_ID || '',
  token: process.env.API_TOKEN || '',
  apiType: 'cdn',
})
