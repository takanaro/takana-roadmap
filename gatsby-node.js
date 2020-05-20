// エクストラクト
const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { LogUtil } = require(`./src/utils/LogUtil`);

// 渡しているnodeは、gatsby内部のオブジェクト。独自で定義したものを渡すと怒られる。
exports.onCreateNode = ({ node, getNode, actions }) => {
  //アクションオブジェクトからcreateNodeFieldを取り出す。
  const { createNodeField } = actions;

  // Ensures we are processing only markdown files
  if (node.internal.type === 'MarkdownRemark') {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    // `data/faqs`以下のファイル名をパスに変換する。
    const relativeFilePath = createFilePath({
      node, //何を
      getNode, //どうやって　onCreateNodeからのgetNodeをここに渡す。
      // basePath: `blog`,
      trailingSlash: false,
    });
    LogUtil.log(relativeFilePath);

    createNodeField({
      node,
      name: `collection`,
      value: getNode(node.parent).sourceInstanceName
    })

    // Creates new query'able field with name of 'slug'
    // ファイルをslugというnodeとして、作成する。
    createNodeField({
      node,
      name: 'slug',
      value: `${relativeFilePath}`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  console.log('[Log]: Exec createPages.');
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  const postTemplate = path.resolve('./src/templates/Post.tsx');
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            fields {
              slug
              collection
            }
            frontmatter {
              date
              title
            }
            timeToRead
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) return Promise.reject(result.errors);

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(({ node }, index) => {
      const next = index === 0 ? null : posts[index - 1].node;
      const prev = index === posts.length - 1 ? null : posts[index + 1].node;

      createPage({
        path: `${node.fields.collection}${node.fields.slug}`,
        component: path.resolve('./src/templates/Post.tsx'),
        context: {
          slug: `${node.fields.slug}`,
          prev,
          next,
        },
      });
    });
  });
  console.log(JSON.stringify(result, null, '\t'));
};
