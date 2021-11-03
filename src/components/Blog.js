import React, { Component } from "react"
import { RichText } from "prismic-reactjs"
import { linkResolver } from "../prismic-configuration"
import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../GraphQL/Queries"

export class Blog extends Component {

    render() {
        if (this.state.document) {
            const document = this.state.document;
            return (
              <div className="content">
                {RichText.render(document.data.allArticles.edges.node.title[0].text, linkResolver)}
                {RichText.render(document.data.allArticles.edges.node.body[1].primary.description, linkResolver)}
              </div>
            );
          }
          return null;
    }
}

export default Blog
