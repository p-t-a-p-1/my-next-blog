import { atom } from 'recoil'

export type PageConfigType = {
  pankuzu?: {
    label: string
    path: string
  }[]
}

export const pageConfigState = atom<PageConfigType>({
  key: 'pageConfig',
  default: {
    pankuzu: [],
  },
})
