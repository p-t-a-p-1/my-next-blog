import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
// eslint-disable-next-line import/named
import { Content, Contents } from 'newt-client-js'
import type { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import AppPageTitle from '@/components/common/AppPageTitle'
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
  console.log(props)
  return (
    <Box>
      <AppPageTitle label='BLOG' />
      <Flex mt='40px' mb='80px' direction='column' rowGap='32px'>
        {props.items.map((item, index) => (
          <NextLink href={`/blog/${item._id}`} key={`blogCard-${index}`} legacyBehavior passHref>
            <Link
              sx={{
                '.cardWrapper:hover': {
                  backgroundColor: 'theme.sub',
                  color: 'theme.main',
                  '.cardEmoji': {
                    borderRadius: '8px',
                    fontSize: '5rem',
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
              >
                <Flex
                  w='10rem'
                  h='10rem'
                  align='center'
                  justify='center'
                  fontSize='3.2rem'
                  transition='0.3s'
                  className='cardEmoji'
                >
                  {item.emoji.value}
                </Flex>
                <Flex direction='column' flex='1'>
                  <Heading as='h3' fontSize='1.8rem' letterSpacing='0.08em' fontWeight='bold'>
                    {item.title}
                  </Heading>
                  <Flex justify='space-between' mt='auto'>
                    <Text>{dayjs(item._sys.updatedAt).format('YYYY/MM/DD')}</Text>
                    <Flex columnGap='8px'>
                      {item.categories.map((category, index) => (
                        <Text key={`category-${index}`}>#{category.name}</Text>
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
