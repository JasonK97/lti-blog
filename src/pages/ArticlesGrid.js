import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { compose, color, shadow, border, space, typography } from 'styled-system'

const TextContent = styled.div`
  ${space}

  @media (max-width: 1024px) {
    h1 {
      font-size: 24px;
    }
  }
`
const ArticleTile = styled.div`
  ${compose(border, space, typography)}
  transition: all 0.2s ease-in-out;

  &:hover {
    ${shadow}
    transform: translate3d(0px, -1px, 0px);
  }
`
const ContReading = styled(Link)`
  ${color}
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  ${ArticleTile}:hover & {
    color: ${props => props.theme.colors.blue};

  }
`
const LoadingAnim = styled.h3`
  ${space}
  display: flex;
  justify-content: center;
`
const GridImage = styled.img`
  ${border}
`

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <LoadingAnim mt={[12]}><Messaging color='black' /></LoadingAnim>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        // grey.3 dot notation picks up nested value.
        // 'theme.colors.grey[3]'
        <ArticleTile 
          key={article.node._meta.id}
          textAlign='center'
          boxShadow={[1]} 
          border={[0]} 
          borderColor='grey.3' 
          borderRadius={[4]}
          mt={[4, 4]}
          mr={[12, 9]}
          mb={[3, 3]}
          ml={[12, 9]}
          pb={[3]}
        >
          <ContReading to={`/${article.node._meta.uid}`} color='black'>
            <GridImage
              borderTopLeftRadius={[4]}
              borderTopRightRadius={[4]}
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width='100%'
            />
            <TextContent 
              pr={[8, 3]} 
              pb={[3, 3]} 
              pl={[8, 3]}
            >
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
          </ContReading>
        </ArticleTile>
      ))}
    </div>
  )
}

export default Posts
