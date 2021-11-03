import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  {
    allArticles(sortBy: published_at_DESC) {
      edges {
        node {
          feature_image
          _meta {
            id
            uid
          }
          title
          body {
            ... on ArticleBodyInline_text {
              type
              label
              primary {
                description
              }
            }
          }
          published_at
        }
      }
    }
  }
`;
