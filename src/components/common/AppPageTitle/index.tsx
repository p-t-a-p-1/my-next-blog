import { Heading } from '@chakra-ui/react'
import React from 'react'

type AppPageTitleProps = {
  label: string
}
const AppPageTitle: React.FC<AppPageTitleProps> = (props) => {
  const { label } = props
  return (
    <Heading
      as='h1'
      py={{ base: '4rem', md: '8rem' }}
      fontSize={{ base: '2.4rem', md: '4rem' }}
      fontWeight='bold'
      letterSpacing='0.08em'
      color='theme.sub'
    >
      {label}
    </Heading>
  )
}

export default AppPageTitle
