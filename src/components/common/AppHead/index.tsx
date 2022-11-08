import type { NextPage } from 'next'
import Head from 'next/head'

interface MyHeadProps {
  title?: string
  thumbnailUrl?: string
  description?: string
}

const AppHead: NextPage<MyHeadProps> = ({ title, thumbnailUrl, description }) => {
  const siteName = 'ptap1'
  if (title === undefined) {
    title = siteName
  } else {
    title = `${title} - ${siteName}`
  }

  if (thumbnailUrl === undefined) {
    thumbnailUrl = 'https://www.ptap1.com/ogp.png'
  }

  if (description === undefined) {
    description =
      '札幌市在住のフロントエンドエンジニアのブログサイトです。主にVue.jsやNuxtJSの記事を書いております。'
  }

  return (
    <Head>
      <title>{title}</title>
      <meta property='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content='ptap1' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://www.ptap1.com' />
      <meta property='og:image' content={thumbnailUrl} />
      <meta property='og:description' content={description} />
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:site' content='@mavs_hako' />
    </Head>
  )
}

export default AppHead
