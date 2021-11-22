import React from 'react'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { htmlSerializer } from '../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
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
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: ${props => props.theme.shadows[3]};
    background-color: ${props => props.theme.colors.gray[400]};
    transform: translate3d(0px, -1px, 0px);
  }
`
const ArticleImage = styled.img`
  ${compose(space, border, layout)}
`


function ArticleDetail() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <Flex mt={['60%', '20%']} justifyContent='center'><Messaging color='black'/></Flex>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        display='block'
        mt={[0, 4.25]}
        mx={[0, 'auto']}
        borderRadius={2}
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width={['100%', '50%']}
      />
      <Heading as='h1' fontSize={['xl', '3xl']} textAlign='center'>{data.article.title[0].text}</Heading>
      <Heading as='h4' textAlign='center'>{data.article.published_at.substring(0, 10)}</Heading>
      <Box
        pr={['5%', '25%']} 
        pb={'5%'} 
        pl={['5%', '25%']}
      >
        {data.article.body.filter(b => b.type === 'inline_text').map((content, index) => {
          return <RichText key={index} render={content.primary.description} htmlSerializer={htmlSerializer} />
        })}<br />
        <BackButton 
          to='/'
          p={2.25}
          color='black'
          fontWeight='bold'
          bg='gray.200'
          borderRadius={1.5}
        >
          Go Back ...
        </BackButton>
      </Box>
    </div>
  )
}

export default ArticleDetail
