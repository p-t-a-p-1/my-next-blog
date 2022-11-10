import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'
import hljs from 'highlight.js'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { Item } from '.'
import AppHead from '@/components/common/AppHead'
import usePageConfig from '@/hooks/usePageConfig'
import { client } from '@/libs/client'
import Style from '@/styles/markdownStyle'
import 'highlight.js/styles/hybrid.css'
import 'github-markdown-css/github-markdown.css'

type Data = {
  data: Item
  highlightedBody: string
}

const BlogDetail: NextPage<Data> = (props) => {
  const { data, highlightedBody } = props

  usePageConfig({
    pankuzu: [
      {
        label: 'blog',
        path: '/blog',
      },
      {
        label: data.slug,
        path: `/blog/${data._id}`,
      },
    ],
  })

  return (
    <>
      <AppHead title={data.meta.title} description={data.meta.description} />
      <Box as='article' mb='8rem'>
        <Box as='header'>
          <Flex fontSize='7.5rem' justify='center' align='center' lineHeight='1'>
            {data.emoji.value}
          </Flex>
          <Heading
            as='h1'
            mt='3.2rem'
            fontSize='3rem'
            letterSpacing='0.04em'
            color='theme.sub'
            textAlign='center'
          >
            {data.title}
          </Heading>
          <Flex
            mt='1.6rem'
            justify='center'
            columnGap='1.6rem'
            rowGap='0.8rem'
            color='theme.sub'
            fontSize='1.8rem'
          >
            {dayjs(data._sys.updatedAt).format('YYYY/MM/DD')}
          </Flex>
          <Flex
            mt='1.6rem'
            justify='center'
            columnGap='0.8rem'
            rowGap='0.8rem'
            color='theme.sub'
            fontSize='1.8rem'
          >
            {data.categories.map((category, index) => (
              <Text key={`category-${index}`}>#{category.name}</Text>
            ))}
          </Flex>
        </Box>
        <Box
          as='main'
          mt='3.2rem'
          p={{ base: '1.6rem', md: '3.2rem' }}
          borderRadius='0.8rem'
          // backgroundColor='white'
          borderWidth='0.2rem'
          borderColor='theme.sub'
          dangerouslySetInnerHTML={{
            __html: highlightedBody,
          }}
          className={`${Style} markdown-body`}
        />
        <Flex as='footer' mt='3.2rem' justify='center'>
          <NextLink href='/blog' legacyBehavior passHref>
            <Link _hover={{ opacity: '0.7' }} fontSize='1.8rem' color='theme.sub' fontWeight='bold'>
              BLOG一覧へ
            </Link>
          </NextLink>
        </Flex>
      </Box>
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const postsResponse = await client.getContents<Item>({
    appUid: 'meBlog',
    modelUid: 'article',
  })

  const ids = postsResponse.items.map((item) => `/blog/${item._id}`)
  return {
    paths: ids,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    }
  }

  const postResponse = await client.getContent<Item>({
    appUid: 'meBlog',
    modelUid: 'article',
    contentId: context.params.id,
  })

  const $ = cheerio.load(postResponse.body, { decodeEntities: false })
  $('h2, h3').each((index, elm) => {
    $(elm).html()
    $(elm).addClass('headings')
    $(elm).attr('id', `${index}`)
  })
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    props: {
      data: postResponse,
      highlightedBody: $.html(),
    },
  }
}

export default BlogDetail
