import React from 'react';
import { Header, Layout} from '../components';
import { Helmet } from 'react-helmet';
import config from '../../config/SiteConfig';
import { Link } from 'gatsby';

export default () => {
  return (
    <Layout>
        <Helmet title={`404 not found | ${config.siteTitle}`} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
        </Header>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};
