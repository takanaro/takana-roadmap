import React from 'react';
import { Layout, Header, Article } from '../components';
// import PageProps from '../models/PageProps';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import { DateTime } from 'schema-dts';

// export default () => <div>Hello world!</div>

type PostData = {
  author: any;
  contentfulid: number;
  description: {
    description: string;
  };
  tags: any;
  title: string;
  updatedAt: DateTime;
};

type PageProps = {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string;
      };
    };
    allContentfulEntryPost: {
      nodes: PostData[]; //{
      // contentfulid: number;
      // title: string;
      // updatedAt: Date;
      // tags: string[];
      // author: {
      //   name: string;
      // };
      // description: {
      //   description: string;
      // };
      // };
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
      nodes {
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
      }
    }
  }
`;

export default (props: PageProps) => {
  const posts = props.data.allContentfulEntryPost.nodes;
  console.log(posts);

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
      {posts.map((item) => {
        return (<Article key={item.contentfulid} title={item.title} date={item.updatedAt} excerpt={item.description.description} slug={`${item.contentfulid}`} timeToRead={2} category={item.tags}  ></Article>);
      })}
      {/* <Helmet title={`Homepage | ${config.siteTitle}`} /> */}
      Hello world!
    </Layout>
  );
};
