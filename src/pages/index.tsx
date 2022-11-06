import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import AppPageTitle from '@/components/common/AppPageTitle'

type ProfileItemProps = {
  name: string
  value: string
}
const ProfileItem: React.FC<ProfileItemProps> = ({ name, value }) => (
  <Flex py='16px' direction={{ base: 'column', md: 'row' }} align='center' color='theme.sub'>
    <Text
      fontSize='1.8rem'
      letterSpacing='0.08em'
      fontWeight='bold'
      w={{ base: '100%', md: '20%' }}
    >
      {name}
    </Text>
    <Text flex='1' fontSize='1.6rem' letterSpacing='0.08em' fontWeight='bold'>
      {value}
    </Text>
  </Flex>
)

export default function Home() {
  return (
    <Box>
      <AppPageTitle label='HOME' />
      <Box>
        <ProfileItem name='Place' value='北海道札幌市' />
        <ProfileItem name='Job' value='フロントエンドエンジニア' />
        <ProfileItem name='Like' value='Vue.js/NuxtJSを利用したWebサイト制作やWebサービス開発' />
      </Box>
    </Box>
  )
}
