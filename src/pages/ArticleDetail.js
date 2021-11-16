import React from 'react'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { color, shadow } from 'styled-system'

const ArticleHeading = styled.div`text-align: center;`
const ArticleContent = styled.div`
  padding: 0 25% 3% 25%;

  @media (max-width: 1000px) {
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
const LoadingAnim = styled.h3`
  margin-top: 50%;
  margin-bottom: 50%;
  display: flex;
  justify-content: center;
`
const BackButton = styled(Link)`
  ${color}
  border-radius: 3px;
  border: none;
  padding: 5px;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
  font-family: filson-pro;
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.colors.grey[2]};
    ${shadow}
    transform: translate3d(0px, -1px, 0px);
  }
`
const ArticleImage = styled.img`
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 5px;
  
  @media (max-width: 1000px) {
    width: 75%;
  }
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

  if (loading) return <LoadingAnim><Messaging color='black'/></LoadingAnim>
  if (error) return `${error}`

  return (
    <div>
      <ArticleImage
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width='30%' 
      />
      <ArticleHeading>
        <h1>{data.article.title[0].text}</h1>
        <h4>{data.article.published_at.substring(0, 10)}</h4>
      </ArticleHeading>
      <ArticleContent>
        {data.article.body.filter(b => b.type === 'inline_text').map((content, index) => {
          return <RichText key={index} render={content.primary.description} htmlSerializer={htmlSerializer} />
        })}<br />
        <BackButton 
          to='/' 
          color='black' 
          bg='grey.3' 
          boxShadow={[0]}
        >
          Go Back ...
        </BackButton>
      </ArticleContent>
    </div>
  )
}

export default ArticleDetail
