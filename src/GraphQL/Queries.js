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

export function getDetails(slug) {
  var GET_POST_DETAILS = gql`
    query getArticle($n: String = "${slug}") {
      allArticles(uid: $n, lang: "en-us") {
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

  return GET_POST_DETAILS
}
