import React from 'react';
import { graphql } from 'gatsby';
import { LogUtils } from '../utils/logutils';
import PathContext from '../models/PathContext';
import { Layout, Header } from '../components';
import { BreadcrumbList, ListItem, Thing, WithContext } from 'schema-dts';
// import { JsonLd } from 'react-schemaorg';
import { Helmet } from 'react-helmet';
import { JsonLD } from '../components/JsonLD';
import { ContentfulSeo } from '../components/seo';

interface Props {
  data: {
    contentfulEntryPost: any;
  };
  pathContext: PathContext;
}

export const EntryPostTemplate = (props: Props) => {
  const postData = props.data.contentfulEntryPost;
  const breadcrumbLists: WithContext<BreadcrumbList>[] = [];

  postData.categoryId?.map((element: any) => {
    const listItems: WithContext<ListItem>[] = [];
    element.fields.JsonLD.map((node: any) => {
      const listItem: WithContext<ListItem> = {
        '@context': 'https://schema.org',
        '@type': 'ListItem',
        position: node.position,
        name: node.name,
        item: node.item,
      };
      listItems.push(listItem);
    });
    breadcrumbLists.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: listItems,
    });
  });

  return (
    <Layout>
      <JsonLD breadList={breadcrumbLists}></JsonLD>
      <ContentfulSeo postPath="entry" postNode={postData} postSEO={true} />

      <div>{postData.title}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.body.childMarkdownRemark.html }} />
    </Layout>
  );
};

export const postQuery = graphql`
  query PostQuery($slug: Int) {
    __typename
    contentfulEntryPost(contentfulid: { eq: $slug }) {
      id
      body {
        childMarkdownRemark {
          html
        }
      }
      title
      description {
        description
        childMarkdownRemark {
          html
        }
      }
      updatedAt
      contentfulid
      childContentfulEntryPostBodyTextNode {
        body
        childMarkdownRemark {
          html
        }
      }
      categoryId {
        fields {
          JsonLD {
            _type
            position
            name
            item
          }
        }
        contentfulid
      }
    }
  }
`;

export default EntryPostTemplate;
