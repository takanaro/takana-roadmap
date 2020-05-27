import React from 'react';
import { Layout, Header, Article } from '../components';
// import PageProps from '../models/PageProps';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import { DateTime } from 'schema-dts';
import Img from 'gatsby-image';

// export default () => <div>Hello world!</div>

type PostData = {
  node: {
    author: any;
    contentfulid: number;
    description: {
      description: string;
    };
    tags: any;
    title: string;
    updatedAt: DateTime;
    heroImage: any;
  };
};

type PageProps = {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    allContentfulEntryPost: {
      edges: PostData[];
    };
    firstProject: {
      title: string;
      slug: string;
    };
    threeProjects: {
      nodes: {
        title: string;
        slug: string;
      }[];
    };
    aboutUs: String;
    instagram: String;
  };
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allContentfulEntryPost(sort: { fields: updatedAt, order: DESC }) {
      edges {
        node {
          contentfulid
          title
          updatedAt
          tags
          author {
            name
          }
          description {
            description
          }
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`;

export default (props: PageProps) => {
  const posts = props.data.allContentfulEntryPost.edges;

  return (
    <Layout>
      <div itemScope itemType="https://schema.org/WebSite">
        <meta content={props.data.site.siteMetadata.siteUrl} itemProp="url"></meta>
      </div>
      <Helmet
        title={config.siteTitle}
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      ></Helmet>
      {posts.map((node, index) => {
        const item = node.node;
        return (
          <React.Fragment key={index}>
            {item.heroImage.fluid ? <Img alt="" fluid={item.heroImage.fluid} /> : null}
            <Article
              key={item.contentfulid}
              title={item.title}
              date={item.updatedAt}
              excerpt={item.description.description}
              slug={`${item.contentfulid}`}
              timeToRead={2}
              category={item.tags}
            ></Article>
          </React.Fragment>
        );
      })}
    </Layout>
  );
};
