import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import styled from 'styled-components'
import { compose, color, shadow, border, space, typography, layout } from 'styled-system'

import { Box } from '../components/Box'
import { Grid } from '../components/Grid'
import { Flex } from '../components/Flex'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'


const ArticleTile = styled.div`
  ${compose(border, space, typography, layout)}
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
const GridImage = styled.img`${border}`


function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <Flex mt={12} display='flex' justifyContent='center'><Messaging color='black' /></Flex>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <Grid
          key={article.node._meta.id}
          display='grid'
          textAlign='center'
          mt={4}
          mr={[9, 12]}
          mb={3}
          ml={[9, 12]}
          pb={3}
        >
          {/* grey.3 dot notation picks up nested value.
             'theme.colors.grey[3]' */}
          <ArticleTile 
            boxShadow={1} 
            borderWidth={0}
            borderStyle='solid'
            borderColor='grey.3' 
            borderRadius={4}
          >
            <ContReading to={`/${article.node._meta.uid}`} color='black'>
              <GridImage
                borderTopLeftRadius={4}
                borderTopRightRadius={4}
                src={article.node.feature_image.url}
                alt={article.node.feature_image.alt}
                width='100%'
              />
              <Box 
                pr={8} 
                pb={3} 
                pl={8}
              >
                <Heading as='h2'>{article.node.title[0].text}</Heading>
                <Heading as='h3'>Published : {article.node.published_at.substring(0, 10)}</Heading>
                <div>
                  {article.node.body.find((b) => b.type === 'inline_text')?.primary?.description?.map(({ text }, index) => {
                      if (index === 0) {
                        return <Text as='p' key={index}>{text.substring(0, 190)}...<br /></Text>
                      }
                      return ''
                    })}
                </div>
              </Box>
            </ContReading>
          </ArticleTile>
        </Grid>
      ))}
    </div>
  )
}

export default Posts
