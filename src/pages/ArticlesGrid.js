import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { color, shadow, border } from 'styled-system'

// const Box = styled.div`
//   ${color}
//   ${shadow}
//   padding: 15px;
// `

const TextContent = styled.div`
  padding: 0px 40px 15px 40px;

  @media (max-width: 1024px) {
    padding: 0 15px 15px 15px;
    h1 {
      font-size: 24px;
    }
  }
`
const ArticleTile = styled.div`
  ${border}
  border-radius: 10px;
  text-align: center;
  padding: 0px 0px 15px 0px;
  margin: 20px 30% 15px 30%;
  transition: all 0.2s ease-in-out;

  &:hover {
    ${shadow}
    transform: translate3d(0px, -1px, 0px);
    
  }

  @media (max-width: 1024px) {
    margin: 20px 5% 15px 5%;
  }
`
const ContReading = styled(Link)`
  text-decoration: none;
  ${color}
  transition: all 0.2s ease-in-out;

  ${ArticleTile}:hover & {
    color: ${props => props.theme.colors.blue};

  }
`
const LoadingAnim = styled.h3`
  ${color}
  margin-top: 50%;
  margin-bottom: 50%;
  display: flex;
  justify-content: center;
`
const GridImage = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <LoadingAnim><Messaging color='black' /></LoadingAnim>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <ArticleTile key={article.node._meta.id} boxShadow={[1]} borderWidth={[1]} borderColor='grey.3'>
          <ContReading to={`/${article.node._meta.uid}`} color='black'>
            <GridImage
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width='100%'
            />
            <TextContent>
              <h1>{article.node.title[0].text}</h1>
              <h3>Published : {article.node.published_at.substring(0, 10)}</h3>
              {/* <Box color='red' bg='grey.2' boxShadow={[1]}>
                Test Box
              </Box> */}
              <div>
                {article.node.body.find((b) => b.type === 'inline_text')?.primary?.description?.map(({ text }, index) => {
                    if (index === 0) {
                      return <p key={index}>{text.substring(0, 190)}...<br /></p>
                    }
                    return ''
                  })}
              </div>
            </TextContent>
          </ContReading>
        </ArticleTile>
      ))}
    </div>
  )
}

export default Posts
