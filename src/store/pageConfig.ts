import { atom } from 'recoil'

export type PageConfigType = {
  title?: string
}

export const pageConfigState = atom<PageConfigType>({
  key: 'pageConfig',
  default: {
    title: '',
  },
})
