import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
// eslint-disable-next-line import/named
import { Content, Contents } from 'newt-client-js'
import type { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import AppHead from '@/components/common/AppHead'
import AppPageTitle from '@/components/common/AppPageTitle'
import usePageConfig from '@/hooks/usePageConfig'
import { client } from '@/libs/client'

type Sys = {
  createdAt: string
  updatedAt: string
}

type Category = {
  name: string
  slug: string
  _id: string
  _sys: Sys
}

export type Item = {
  author: string | null
  body: string
  categories: Category[]
  meta: {
    title: string
    description: string
  }
  emoji: {
    type: string
    value: string
  }
  // coverImage: {
  //   _id: string
  //   fileName: string
  //   fileSize: number
  //   fileType: string
  //   height: number
  //   src: string
  //   width: number
  // }
  slug: string
  title: string
  _id: string
  _sys: Sys
}

const BlogIndex: NextPage<Contents<Item>> = (props) => {
  usePageConfig({
    pankuzu: [
      {
        label: 'blog',
        path: '/blog',
      },
    ],
  })
  return (
    <>
      <AppHead title='記事一覧' />
      <Box>
        <AppPageTitle label='BLOG' />
        <Flex mt='4rem' mb='8rem' direction='column' rowGap='3.2rem'>
          {props.items.map((item, index) => (
            <NextLink href={`/blog/${item._id}`} key={`blogCard-${index}`} legacyBehavior passHref>
              <Link
                sx={{
                  '.cardWrapper:hover': {
                    backgroundColor: 'theme.sub',
                    color: 'theme.main',
                    '.cardEmoji': {
                      borderRadius: '8px',
                      fontSize: {
                        base: '3.2rem',
                        md: '5rem',
                      },
                    },
                  },
                }}
              >
                <Flex
                  className='cardWrapper'
                  px='1.6rem '
                  py='1.6rem'
                  borderRadius='8px'
                  transition='0.3s'
                  color='theme.sub'
                  columnGap='1.6rem'
                >
                  <Flex
                    w={{ base: '4rem', md: '10rem' }}
                    h={{ base: '4rem', md: '10rem' }}
                    align='center'
                    justify='center'
                    fontSize={{ base: '2.4rem', md: '3.2rem' }}
                    transition='0.3s'
                    className='cardEmoji'
                  >
                    {item.emoji.value}
                  </Flex>
                  <Flex direction='column' flex='1'>
                    <Heading as='h3' fontSize='2rem' letterSpacing='0.08em' fontWeight='bold'>
                      {item.title}
                    </Heading>
                    <Flex justify='space-between' mt='auto'>
                      <Text fontSize='1.8rem'>
                        {dayjs(item._sys.updatedAt).format('YYYY/MM/DD')}
                      </Text>
                      <Flex columnGap='0.8rem'>
                        {item.categories.map((category, index) => (
                          <Text key={`category-${index}`} fontSize='1.8rem'>
                            #{category.name}
                          </Text>
                        ))}
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </Flex>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps<Contents<Item>> = async () => {
  const data = await client.getContents<Item>({
    appUid: 'meBlog',
    modelUid: 'article',
    query: {
      // limit: 4,
    },
  })
  return {
    props: data,
  }
}

export default BlogIndex
