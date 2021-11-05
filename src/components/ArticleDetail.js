import React from 'react'
import '../App.css'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { RichText, Elements } from 'prismic-reactjs'
import { Link, useParams } from 'react-router-dom'
import { linkResolver } from '../prismic-configuration'

// Function to add a unique key to props
const propsWithUniqueKey = function(props, key) {
  return Object.assign(props || {}, { key })
}

// HTML Serializer
// This function changes the way that the HTML is loaded
export const htmlSerializer = function(type, element, content, children, key) {
  
  var props = {}

  switch (type) {
    case Elements.heading1: // Heading 1
      return React.createElement('h1', propsWithUniqueKey(props, key), children)
      
    case Elements.heading2: // Heading 2
      return React.createElement('h2', propsWithUniqueKey(props, key), children)
      
    case Elements.heading3: // Heading 3
      return React.createElement('h3', propsWithUniqueKey(props, key), children)

    case Elements.listItem: // Unordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children)
      
    case Elements.oListItem: // Ordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children)

    // Add a class to paragraph elements
    case Elements.paragraph:
      return React.createElement('p', propsWithUniqueKey(props, key))

    // Don't wrap images in a <p> tag
    case Elements.image: 
      props = { src: element.url , alt: element.alt || '' }
      return React.createElement('img', propsWithUniqueKey(props, key))

    // Add a class to hyperlinks
    case Elements.hyperlink:
      const targetAttr = element.data.target ? { target: element.data.target } : {}
      const relAttr = element.data.target ? { rel: 'noopener' } : {}
      props = Object.assign({
        className: 'link-class',
        href: element.data.url || linkResolver(element.data)
      }, targetAttr, relAttr)
      return React.createElement('a', propsWithUniqueKey(props, key), children)

    // return null to stick with default behaviour
    default:
      return null
  }
}

function ArticleDetail() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
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
              <RichText render={article.node.body.find((b) => b.type === 'inline_text')?.primary?.description} linkResolver={linkResolver} /><br />
              <Link className='back-btn' to='/'><strong>Go Back ...</strong></Link>
            </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleDetail
