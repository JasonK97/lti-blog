import React from 'react'
import '../App.css'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

const ArticleHeading = styled.div`text-align: center;`
const ArticleContent = styled.div`padding: 0% 30% 3% 30%;`
const HyperlinkStyle = styled.a`
  color: rgb(183, 26, 4);
  &:hover {
    color: rgb(100, 100, 100);
    text-decoration: none;
  }
`
const BackButton = styled.button`
  background-color:rgb(230, 230, 230);
  border-radius: 5px;
  border: none;
  padding: 5px;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color:rgb(189, 189, 189);
    box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    transform: translate3d(0px, -1px, 0px);
  }
`

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontFamily: 'filson-pro',
  fontWeight: '600'
}
const articleImage = {
  display: 'block',
  marginTop: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
  borderRadius: '10px'
}

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

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>              
      <img 
        style={articleImage}
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
        <BackButton><Link style={linkStyle} to='/'>Go Back ...</Link></BackButton>
      </ArticleContent>
    </div>
  )
}

export default ArticleDetail
