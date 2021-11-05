import React from 'react'
import { Elements } from 'prismic-reactjs'

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

    case Elements.heading4: // Heading 4
      return React.createElement('h4', propsWithUniqueKey(props, key), children)
      
    case Elements.heading5: // Heading 5
      return React.createElement('h5', propsWithUniqueKey(props, key), children)
      
    case Elements.heading6: // Heading 6
      return React.createElement('h6', propsWithUniqueKey(props, key), children)

    case Elements.preformatted: // Preformatted
      return React.createElement('pre', propsWithUniqueKey(props, key), children)
      
    case Elements.strong: // Strong
      return React.createElement('strong', propsWithUniqueKey(props, key), children)
      
    case Elements.em: // Emphasis
      return React.createElement('em', propsWithUniqueKey(props, key), children)

    case Elements.listItem: // Unordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children)
      
    case Elements.oListItem: // Ordered List Item
      return React.createElement('li', propsWithUniqueKey(props, key), children)

    case Elements.list: // Unordered List
      return React.createElement('ul', propsWithUniqueKey(props, key), children)
      
    case Elements.oList: // Ordered List
      return React.createElement('ol', propsWithUniqueKey(props, key), children)

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

// This function handles Links to each page
export const linkResolver = (doc) => {
    return '/'
}