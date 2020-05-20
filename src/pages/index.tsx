import React from "react"
import {Layout} from "../components"
import PageProps from "../models/PageProps"
import { graphql } from "gatsby"

// export default () => <div>Hello world!</div>

export const query = graphql`
{
  __typename
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
          slug
        }
      }
    }
  }
}
`
export default ({data}: PageProps) => {
  return (
    <Layout>
      Hello world!
    </Layout>
  )
}