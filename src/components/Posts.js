import React from "react"
import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../GraphQL/Queries"
import { RichText, Elements } from "prismic-reactjs"
import { linkResolver } from "../prismic-configuration"

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
      props = {className: 'paragraph-class'}
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

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>
      {/* <RichText render={data.allArticles.edges} linkResolver={linkResolver} /> */}
      {/* <p>Description : {article.node.body[1].primary.description.text}</p>*/}
      {data.allArticles.edges.map((article) => (
        <div key={article.node._meta.id} class="articleTile">
          <h1>{article.node.title[0].text}</h1>
          <img
            src={article.node.feature_image.url}
            alt={article.node.feature_image.alt}
            width="500px"
          />
        </div>
      ))}
    </div>
  )
}

export default Posts
