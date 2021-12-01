import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../GraphQL/Queries'
import { Link } from 'react-router-dom'
import { Messaging } from 'react-cssfx-loading/lib'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { 
  compose, 
  color, 
  border, 
  space, 
  typography, 
  layout 
} from 'styled-system'

import { Box } from '../components/Box'
import { Grid } from '../components/Grid'
import { Flex } from '../components/Flex'
import { Heading } from '../components/Heading'
import { Text } from '../components/Text'


const ArticleTile = styled.div`
  ${compose(border, space, typography, layout)}
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows[4]};
    background-color: ${props => props.theme.colors.gray[50]};
  }
`
const ContReading = styled(Link)`
  ${color}
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  ${ArticleTile}:hover & {
    color: ${props => props.theme.colors.blue[800]};
  }
`
const GridImage = styled.img`${border}`


function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <Flex mt={['60%', null, null, '20%', null]} justifyContent='center'><Messaging color='black' /></Flex>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <Grid
          as={motion.div}
          whileHover={{ y: -5 }}
          whileTap={{ y: 2 }}
          transition={{ duration: .2 }}
          key={article.node._meta.id}
          textAlign='center'
          my={3.75}
          mx={['5%', null, null, '25%', null]}
          pb={2}
        >
          <ArticleTile 
            borderWidth={0.5}
            borderStyle='solid'
            borderColor='gray.100' 
            borderRadius={3}
          >
            <ContReading to={`/${article.node._meta.uid}`} color='black'>
              <GridImage
                borderTopLeftRadius={2.75}
                borderTopRightRadius={2.75}
                src={article.node.feature_image.url}
                alt={article.node.feature_image.alt}
                width='100%'
              />
              <Box 
                px={5.25} 
                pb={3.75}
              >
                <Heading as='h2' fontSize={['2xl', null, null, '3xl', null]}>{article.node.title[0].text}</Heading>
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
