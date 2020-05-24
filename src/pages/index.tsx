import React from 'react';
import { Layout, Header } from '../components';
// import PageProps from '../models/PageProps';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Navbar from '../components/Navbar';

// export default () => <div>Hello world!</div>

type PageProps =  {
  data: {
    site: {
      siteMetadata: {
        siteUrl: string;
      }
    }
    allContentfulEntryPost: {
      nodes: {
        contentfulid: number;
        title: string;
        updatedAt: Date;
        tags: string[];
        author: {
          name: string;
        };
        description: {
          description: string;
        };
      };
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


// updatedAt(formatString: "YYYY-MM-DD")
export const query = graphql`
  query IndexQuery {
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
  return (
    <Layout>
      <div itemScope itemType="https://schema.org/WebSite">
        <meta content={props.data.site.siteMetadata.siteUrl} itemProp="url"></meta>
      </div>
      <Header>たかなろーどまっぷ</Header>
      <Helmet title={`Homepage | ${config.siteTitle}`} />
      Hello world!

    </Layout>
  );
};
