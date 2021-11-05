import React from 'react'
import '../App.css'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'

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
      props = {className: 'blue'};
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
      {/* {data.allArticles.edges.map((article) => (
        <div key={article.node._meta.id} className='a'>
            <img
              className='article-image'
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width='30%'
            />
            <div className='article-heading'>
              <h1>{article.node.title[0].text}</h1>
              <h4>{article.node.published_at.substring(0, 10)}</h4>
            </div>
            <div className='article-content'>
              <RichText render={article.node.body.filter(b => b.type === 'inline_text')?.primary?.description} htmlSerializer={htmlSerializer} /><br />
              <Link className='back-btn' to='/'><strong>Go Back ...</strong></Link>
            </div>
        </div>
      ))} */}
      <img 
        className='article-image'
        src={data.article.feature_image.url}
        alt={data.article.feature_image.alt}
        width='30%' 
      />
      <div className='article-heading'>
        <h1>{data.article.title[0].text}</h1>
        <h4>{data.article.published_at.substring(0, 10)}</h4>
      </div>
      <div className='article-content'>
        <RichText render={data.article.body.filter(b => b.type === 'inline_text')[0].primary?.description} htmlSerializer={htmlSerializer} /><br />
        <Link className='back-btn' to='/'><strong>Go Back ...</strong></Link>
      </div>
    </div>
  )
}

export default ArticleDetail
