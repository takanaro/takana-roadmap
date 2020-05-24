export default {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'たかなろーどまっぷ', // Navigation and Site Title
  siteTitleAlt: 'たかなろーどまっぷ', // Alternative Site title for SEO
  siteUrl: 'https://takanaro.com', // Domain of your site. No trailing slash!
  siteLanguage: 'ja', // Language Tag on <html> element
  siteBanner: '/assets/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  defaultBg: '/assets/bg.png', // default post background header
  favicon: 'static/favicon.ico', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'たかなろがそこそこできるエンジニアになるまでのロードマップを書き綴ります。生活の知恵、サイト運用、かゆいところに手が届くアプリケーションなどを紹介していきます。また、Skype、LINE等を常時つないでオンライン勉強会も行う予定。ちなみに本サイトは静的サイトジェネレータのGatsbyを使用しています。', // Your site description
  author: 'たかなろ', // Author for schemaORGJSONLD
  siteLogo: '/assets/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@takanar0', // Twitter Username - Optional
  ogSiteName: 'たかなろーどまっぷ', // Facebook Site Name - Optional
  ogLanguage: 'ja_JP', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#3498DB',
  backgroundColor: '#2b2e3c',

  // Settings for typography.ts
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',

  // Social media
  siteFBAppID: '',

  //
  Google_Tag_Manager_ID: 'GTM-XXXXXXX',
  POST_PER_PAGE: 4,
};
