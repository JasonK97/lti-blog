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


const BackButton = styled(Link)`
  ${compose(color, space, border, typography)}
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: ${props => props.theme.shadows[0]};
    background-color: ${props => props.theme.colors.grey[2]};
    transform: translate3d(0px, -1px, 0px);
  }
`
const ArticleImage = styled.img`
  ${compose(space, border, layout)}
`


function ArticleDetail() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <Flex mt={12} justifyContent='center'><Messaging color='black'/></Flex>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        display='block'
        mt={[0, 4]}
        mx={[0, 16]}
        borderRadius={2}
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width={[19, 9]}
      />
      <Heading as='h1' fontSize={[2, 3]} textAlign='center'>{data.article.title[0].text}</Heading>
      <Heading as='h4' textAlign='center'>{data.article.published_at.substring(0, 10)}</Heading>
      <Box
        pr={[10, 12]} 
        pb={9} 
        pl={[10, 12]}
      >
        {data.article.body.filter(b => b.type === 'inline_text').map((content, index) => {
          return <RichText key={index} render={content.primary.description} htmlSerializer={htmlSerializer} />
        })}<br />
        {/* grey.3 dot notation picks up nested value.
            'theme.colors.grey[3]' */}
        <BackButton 
          to='/'
          p={1}
          color='black'
          fontWeight={5}
          bg='grey.3'
          borderRadius={[0, 3]}
        >
          Go Back ...
        </BackButton>
      </Box>
    </div>
  )
}

export default ArticleDetail
