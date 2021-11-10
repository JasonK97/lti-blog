import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ArticleTile = styled.div`
  border: 1px solid rgb(230, 230, 230);
  border-radius: 15px;
  text-align: center;
  padding: 0px 0px 15px 0px;
  margin: 20px 30% 15px 30%;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 10px 10px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0px, -1px, 0px);
  }
`

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <ArticleTile key={article.node._meta.id}>
          <Link className='cont-reading' to={`/${article.node._meta.uid}`}>
            <img
              className='grid-image'
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width='100%'
            />
            <div className="text-content">
              <h1>{article.node.title[0].text}</h1>
              <h3>Published : {article.node.published_at.substring(0, 10)}</h3>
              <div>
                {article.node.body.find((b) => b.type === 'inline_text')?.primary?.description?.map(({ text }, index) => {
                    if (index === 0) {
                      return <p key={index}>{text.substring(0, 190)}...<br /></p>
                    }
                    return ''
                  })}
              </div>
            </div>
          </Link>
        </ArticleTile>
      ))}
    </div>
  )
}

export default Posts
