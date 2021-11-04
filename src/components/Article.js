import React from 'react'
import '../App.css'
import { useQuery } from '@apollo/client'
import { getDetails } from '../GraphQL/Queries'
import { Link, useParams } from 'react-router-dom'

function Article() {
  const { articleUid } = useParams()
  const { loading, error, data } = useQuery(getDetails(articleUid))

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <div key={article.node._meta.id} className="a">
            <img
              className="a"
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width="30%"
            />
            <div className="t">
              <h1>{article.node.title[0].text}</h1>
              <h3>Published : {article.node.published_at.substring(0, 10)}</h3>
              <div>
                {article.node.body.find((b) => b.type === "inline_text")?.primary?.description?.map(({ text }, index) => {
                    return <p key={index}>{text}<br /></p>
                })}
              </div>
            </div>
            <Link className='contReading' to='/'><strong>Go Back ...</strong></Link>
        </div>
      ))}
    </div>
  )
}

export default Article
