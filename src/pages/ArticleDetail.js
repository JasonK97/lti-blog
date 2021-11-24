import React from 'react'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { htmlSerializer } from '../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { compose, color, space, border, typography, layout } from 'styled-system'

import { Flex } from '../components/Flex'
import { Heading } from '../components/Heading'
import { Box } from '../components/Box'


const BackButton = styled(Link).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['borderRadius'].includes(prop)
    && defaultValidatorFn(prop),
})`
  ${compose(color, space, border, typography)}
  text-decoration: none;

  &:hover {
    box-shadow: ${props => props.theme.shadows[2]};
    background-color: ${props => props.theme.colors.gray[400]};
  }
`
// const BackButton = motion(Button)
const ArticleImage = styled.img`
  ${compose(space, border, layout)}
`


function ArticleDetail() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <Flex mt={['60%', null, null, '20%', null]} justifyContent='center'><Messaging color='black'/></Flex>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        display='block'
        mt={[0, null, null, 4.25, null]}
        mx={[0, null, null, 'auto', null]}
        borderRadius={2}
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width={['100%', null, null, '50%', null]}
      />
      <Heading as='h1' fontSize={['2xl', null, null, '3xl', null]} textAlign='center'>{data.article.title[0].text}</Heading>
      <Heading as='h4' textAlign='center'>{data.article.published_at.substring(0, 10)}</Heading>
      <Box
        px={['5%', null, null, '25%', null]} 
        pb={'2%'}
      >
        {data.article.body.filter(b => b.type === 'inline_text').map((content, index) => {
          return <RichText key={index} render={content.primary.description} htmlSerializer={htmlSerializer} />
        })}<br />
        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ y: 2 }}
          style={{ background: 'transparent', border: 'none' }}
        >
          <BackButton 
            to='/'
            p={2.25}
            color='black'
            fontFamily='filson-pro'
            fontSize={'md'}
            fontWeight='bold'
            bg='gray.100'
            borderRadius={1.5}
          >
            Go Back ...
          </BackButton>
        </motion.button>
      </Box>
    </div>
  )
}

export default ArticleDetail
