import React from 'react'
import '../App.css'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

const ArticleHeading = styled.div`text-align: center;`
const ArticleContent = styled.div`padding: 0% 30% 3% 30%;`
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
      // props = {className: 'blue'};
      return React.createElement('p', propsWithUniqueKey(props, key), children)

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
        className='article-image'
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
