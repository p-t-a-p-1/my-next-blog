// import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { pageConfigState, PageConfigType } from '@/store/pageConfig'

const usePageConfig = (pageConfigOption: PageConfigType) => {
  // const location = useRouter()

  const setPageConfig = useSetRecoilState<PageConfigType>(pageConfigState)
  useEffect(() => {
    setPageConfig({
      pankuzu: pageConfigOption.pankuzu || [],
    })

    return () => {
      setPageConfig({
        pankuzu: [],
      })
    }
  }, [pageConfigOption, setPageConfig])
}

export default usePageConfig
