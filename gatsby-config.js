'use strict';
// strictモードではグローバル変数の定義ができなくなるらしい

// TypeScriptのモジュールを読み込めるようにする
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'esnext',
  },
});

// dotファイルから環境変数を取得
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = require('./config/SiteConfig').default;
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

// プレビューモードで起動する場合(下書きも公開する)
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

module.exports = {
  pathPrefix: pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    pathPrefix,
    title: config.siteTitle,
    titleAlt: config.siteTitleAlt,
    description: config.siteDescription,
    logo: config.siteLogo,
    headline: config.siteHeadline,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.userTwitter,
    facebook: config.ogSiteName,
    menuLinks: [
      {
        "name": "Blog",
        "link": "/blog"
      },
      {
        "name": "Profile",
        "link": "/profile"
      }
    ]
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`, // Typescriptを使うために必要
      options: {
        isTSX: true, // defaults to false
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
        ignore: [`**/*.txt`], //拡張子txtは含まない
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    `gatsby-transformer-remark`, // MarkDown変換プラグイン
    `gatsby-transformer-sharp`, // 画像処理ライブラリ、画像のサイズ変更等が可能になる
    `gatsby-plugin-react-helmet`, // Helmet使うために必要
    'gatsby-plugin-sharp', // 画像処理低レベルのヘルパープラグイン
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleAlt,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
};
