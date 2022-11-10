import { Box, Button, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { MdOutlineColorLens } from 'react-icons/md'
import { useRecoilValue } from 'recoil'
import { pageConfigState, PageConfigType } from '@/store/pageConfig'

const HEADER_LINKS = [
  {
    label: 'Blog',
    path: '/blog',
    icon: null,
    isExternal: false,
  },
  {
    label: 'Twitter',
    path: 'https://twitter.com/hako_mavs',
    icon: FaTwitter,
    isExternal: true,
  },
  {
    label: 'GitHub',
    path: 'https://github.com/p-t-a-p-1',
    icon: FaGithub,
    isExternal: true,
  },
]

type LayoutProps = {
  children: React.ReactNode
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pageConfig = useRecoilValue<PageConfigType>(pageConfigState)
  const router = useRouter()
  return (
    <Flex flexDirection='column' minH='100vh' background='theme.main'>
      <Flex
        as='header'
        px={{ base: '1.6rem', md: '4rem' }}
        py='16px'
        justify='space-between'
        align='center'
        position='fixed'
        top='0'
        left='0'
        w='100%'
        backdropFilter='blur(20px)'
        backgroundColor='transparent'
      >
        <Heading as='h1' display='flex' alignItems='center' columnGap='0.8rem'>
          <NextLink href='/' legacyBehavior passHref>
            <Link _hover={{ opacity: '0.7' }} fontSize='1.8rem' color='theme.sub'>
              p-t-a-p-1
            </Link>
          </NextLink>
          {pageConfig.pankuzu &&
            pageConfig.pankuzu.map((item, index) => (
              <>
                <Text fontSize='1.8rem' color='theme.sub'>
                  /
                </Text>
                <NextLink href={item.path} legacyBehavior passHref key={`pankuzu-${index}`}>
                  <Link fontSize='1.8rem' color='theme.sub' _hover={{ opacity: '0.7' }}>
                    {item.label}
                  </Link>
                </NextLink>
              </>
            ))}
        </Heading>
        <Box as='nav'>
          <Flex columnGap={{ base: '1.6rem', md: '3.2rem' }}>
            {HEADER_LINKS.map((item, index) => (
              <NextLink href={item.path} key={`headerItem-${index}`} legacyBehavior passHref>
                <Link _hover={{ textDecoration: 'none' }} isExternal={item.isExternal}>
                  <Flex
                    align='center'
                    columnGap='0.8rem'
                    fontWeight='bold'
                    transition='color 0.3s ease-in-out'
                    position='relative'
                    fontSize='1.6rem'
                    color='theme.sub'
                    _hover={{
                      _after: {
                        backgroundColor: 'theme.sub',
                        transform: 'scaleX(1)',
                        textDecoration: 'none',
                      },
                    }}
                    _after={{
                      content: '""',
                      position: 'absolute',
                      left: '0',
                      bottom: '-2px',
                      width: '100%',
                      height: '2px',
                      display: 'block',
                      transformOrigin: 'left',
                      transform: 'scaleX(0)',
                      transition: 'all 0.25s cubic-bezier(0.65, 0.05, 0.36, 1)',
                    }}
                  >
                    {item.label}
                    {item.icon && <Icon as={item.icon} />}
                  </Flex>
                </Link>
              </NextLink>
            ))}
          </Flex>
        </Box>
      </Flex>
      <Box
        as='main'
        pt='8rem'
        flex='1 0 auto'
        maxW='100rem'
        mx='auto'
        w='full'
        px={{ base: '1.6rem', md: '4rem' }}
      >
        {children}
      </Box>
      <Button
        position='fixed'
        bottom='0'
        right='0'
        zIndex='100'
        variant='ghost'
        borderColor='theme.sub'
        borderWidth='1px'
        backgroundColor='theme.main'
        onClick={() => {
          router.reload()
        }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        w='4rem'
        h='4rem'
        color='theme.sub'
        _hover={{
          color: 'theme.main',
          backgroundColor: 'theme.sub',
        }}
      >
        <Icon as={MdOutlineColorLens} fontSize='2.4rem' />
      </Button>
    </Flex>
  )
}

export default Layout
