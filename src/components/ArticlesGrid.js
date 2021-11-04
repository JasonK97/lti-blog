import React from "react"
import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../GraphQL/Queries"
import { Link } from "react-router-dom"

function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS)

  if (loading) return <h1>Loading ...</h1>
  if (error) return `${error}`

  return (
    <div>
      {data.allArticles.edges.map((article) => (
        <div key={article.node._meta.id} className="articleTile">
          <Link className="contReading" to={`/${article.node._meta.uid}`}>
            <img
              className="articleImg"
              src={article.node.feature_image.url}
              alt={article.node.feature_image.alt}
              width="100%"
            />
            <div className="textContent">
              <h1>{article.node.title[0].text}</h1>
              <h3>Published : {article.node.published_at.substring(0, 10)}</h3>
              <div>
                {article.node.body.find((b) => b.type === "inline_text")?.primary?.description?.map(({ text }, index) => {
                    if (index === 0) {
                      return <p key={index}>{text.substring(0, 190)}...<br /></p>
                    }
                    return ''
                  })}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Posts
