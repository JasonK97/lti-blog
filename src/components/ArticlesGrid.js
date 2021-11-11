import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'

const TextContent = styled.div`padding: 0px 15px 15px 15px;`
const ArticleTile = styled.div`
  border: 1px solid #E6E6E6;
  border-radius: 10px;
  text-align: center;
  padding: 0px 0px 15px 0px;
  margin: 20px 30% 15px 30%;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 10px 10px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0px, -1px, 0px);
  }
  @media (max-width: 1000px) {
    margin: 20px 10% 15px 10%;
  }
`
const LoadingAnim = styled.h3`
  margin-top: 50%;
  margin-bottom: 50%;
  display: flex;
  justify-content: center;
`

const ContReading = {
  textDecoration: 'none',
  color: 'black'
}
const GridImage = {
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px'
}

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <LoadingAnim><Messaging color='#000000' /></LoadingAnim>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <ArticleTile key={article.node._meta.id}>
          <Link style={ContReading} to={`/${article.node._meta.uid}`}>
            <img
              style={GridImage}
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width='100%'
            />
            <TextContent>
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
            </TextContent>
          </Link>
        </ArticleTile>
      ))}
    </div>
  )
}

export default Posts
