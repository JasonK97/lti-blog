import React from 'react'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { compose, color, shadow, space, border, typography, flexbox, layout } from 'styled-system'


const ArticleHeading = styled.div`${typography}`
const ArticleContent = styled.div`
  ${space}

  @media (max-width: 1024px) {
    padding: 0 10% 3% 10%;
  }
`
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
  
  @media (max-width: 1024px) {
    width: 75%;
  }
`
const LoadingAnim = styled.h3`
  ${compose(space, flexbox, layout)}
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

  if (loading) return <LoadingAnim mt={[12]} display='flex' justifyContent='center'><Messaging color='black'/></LoadingAnim>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        mt={[4]}
        mr={[16]}
        ml={[16]}
        borderRadius={[2]}
        display='block'
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width='50%'
      />
      <ArticleHeading textAlign='center'>
        <h1>{data.article.title[0].text}</h1>
        <h4>{data.article.published_at.substring(0, 10)}</h4>
      </ArticleHeading>
      <ArticleContent 
        pr={[12]} 
        pb={[9]} 
        pl={[12]}
      >
        {data.article.body.filter(b => b.type === 'inline_text').map((content, index) => {
          return <RichText key={index} render={content.primary.description} htmlSerializer={htmlSerializer} />
        })}<br />
        {/* grey.3 dot notation picks up nested value.
            'theme.colors.grey[3]' */}
        <BackButton 
          to='/'
          p={[1]}
          color='black'
          fontWeight={[5]}
          bg='grey.3' 
          boxShadow={[0]}
          borderRadius={[0]}
        >
          Go Back ...
        </BackButton>
      </ArticleContent>
    </div>
  )
}

export default ArticleDetail
