import React from 'react';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import Post from '../models/Post';

interface ContentfulSeo {
  postNode: any;
  postPath: string;
  postSEO: boolean;
}

export const ContentfulSeo = (props: ContentfulSeo) => {
  const { postNode, postPath, postSEO } = props;
  let title;
  let description;
  let image;
  let postURL;
  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;
  if (postSEO) {
    title = postNode.title;
    description = postNode.description.description;
    image = config.siteBanner;
    postURL = config.siteUrl + realPrefix + `\/${postPath}\/${postNode.contentfulid}`;
  } else {
    title = config.siteTitle;
    description = config.siteDescription;
    image = config.siteBanner;
  }
  image = config.siteUrl + realPrefix + image;
  const blogURL = config.siteUrl + config.pathPrefix;
  return (
    <Helmet>
      <html lang={config.siteLanguage} />
      <title>{config.siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:locale" content={config.ogLanguage} />
      <meta property="og:site_name" content={config.ogSiteName ? config.ogSiteName : ''} />
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/* <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ''} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
