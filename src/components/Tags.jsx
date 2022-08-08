/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Tags = () => {
  const CODING_TEST_TAG = ["백준", "코딩테스트", "코테", "프로그래머스", "BOJ"]

  const data = useStaticQuery(graphql`
    query TagQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `)

  const tags = {}

  data.allMarkdownRemark.nodes.forEach(node => {
    for (const tag of node.frontmatter.tags) {
      if (CODING_TEST_TAG.includes(tag)) continue
      if (tags[tag]) tags[tag] += 1
      else tags[tag] = 1
    }
  })

  console.log(tags)

  return Object.keys(tags).map(key => <div>{`${key} | ${tags[key]}`}</div>)
}

export default Tags
