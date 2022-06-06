/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <div className="bio-social">
        <a href="https://github.com/dding-g" target="_blank">
          <StaticImage
            src="../images/github.png"
            alt="github"
            width={20}
            height={20}
            href="ASD"
          />
        </a>
        <a
          href="https://opaque-planarian-7f9.notion.site/About-dding-g-776f9cfa976147db9befff2dc15249ee"
          target="_blank"
        >
          <StaticImage
            src="../images/notion.png"
            alt="github"
            width={20}
            height={20}
          />
        </a>
      </div>
      <div>
        <p>조명근</p>
        <small>area409@gmail.com</small>
        <small>웹 개발자, 프론트엔드</small>
      </div>
    </div>
  )
}

export default Bio
