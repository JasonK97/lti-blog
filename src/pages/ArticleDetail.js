import React from 'react'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { compose, color, shadow, space, border, typography, layout } from 'styled-system'

import { Flex } from '../components/Flex'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'


const HyperlinkStyle = styled.a`
  ${color}
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.grey[0]};
  }
`
const BackButton = styled(Link)`
  ${compose(color, space, border, typography)}
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  &:hover {
    ${shadow}
    background-color: ${props => props.theme.colors.grey[2]};
    transform: translate3d(0px, -1px, 0px);
  }
`
const ArticleImage = styled.img`
  ${compose(space, border, layout)}
`


// Function to add a unique key to props
const propsWithUniqueKey = function(props, key) {
  return Object.assign(props || {}, { key })
}

// HTML Serializer
// This function changes the way that the HTML is loaded
export const htmlSerializer = function(type, element, content, children, key) {

  var props = {}

  switch (type) {
    // Add paragraph elements
    case Elements.paragraph:
      return React.createElement('p', propsWithUniqueKey(props, key), children)
    
    // Add a class to hyperlinks
    case Elements.hyperlink:
      const targetAttr = element.data.target ? { target: element.data.target } : {}
      const relAttr = element.data.target ? { rel: 'noopener' } : {}
      props = Object.assign({
          color: 'red',
          href: element.data.url || linkResolver(element.data)
      }, targetAttr, relAttr)
      return React.createElement(HyperlinkStyle, propsWithUniqueKey(props, key), children)

    default:
      return null
  }
}

// This function handles Links to each page
export const linkResolver = (doc) => {
  return '/'
}


function ArticleDetail() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <Flex mt={12} display='flex' justifyContent='center'><Messaging color='black'/></Flex>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        mt={[0, 4]}
        mr={[0, 16]}
        ml={[0, 16]}
        borderRadius={2}
        display='block'
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width={[19, 9]}
      />
      <Heading as='h1' fontSize={[2, 3]} textAlign='center'>{data.article.title[0].text}</Heading>
      <Heading as='h4' textAlign='center'>{data.article.published_at.substring(0, 10)}</Heading>
      <Text 
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
          borderRadius={0}
          boxShadow={0}
        >
          Go Back ...
        </BackButton>
      </Text>
    </div>
  )
}

export default ArticleDetail
