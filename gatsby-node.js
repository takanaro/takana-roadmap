// エクストラクト
// const path = require('path');
// const { LogUtils } = require(`./src/utils/logutils`);

exports.sourceNodes = async ({ actions, getNodes, createNodeId, cache, store }) => {
  // LogUtils.log(`Exec sourceNodes`);

  const categoryList = getNodes().filter(node => node.internal.type === `ContentfulCategory`);
  const recursionList = (c_node, parentList, list) => {
    const p_node = parentList.find(l => l.contentfulid === c_node.parentId);
    if (p_node == undefined || p_node == null) return 1;

    position = recursionList(p_node, parentList, list);
    const itemListElm = {
      '@type': `ListItem`,
      position: position,
      name: `${c_node.name}`,
      item: `https://localhost:8000/category/${c_node.contentfulid}`,
    };
    list.push(itemListElm);
    return position + 1;
  };

  let categoryJsonLDList = [];
  categoryList.map(item => {
    let itemListElement = [];
    recursionList(item, categoryList, itemListElement);
    categoryJsonLDList.push({
      categoryId: item.contentfulid,
      itemList: itemListElement,
    });
  });

  categoryList.map((element, index) => {
    const item = categoryJsonLDList.find(obj => obj.categoryId === element.contentfulid);
    actions.createNodeField({
      node: element,
      name: 'JsonLD',
      value: item.itemList,
    });
  });
};

// 渡しているnodeは、gatsby内部のオブジェクト。独自で定義したものを渡すと怒られる。
exports.onCreateNode = ({ node, getNode, actions }) => {
  //アクションオブジェクトからcreateNodeFieldを取り出す。
  const { createNodeField } = actions;

  // Ensures we are processing only markdown files
  if (node && node.internal && node.internal.type === 'MarkdownRemark') {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    // `data/faqs`以下のファイル名をパスに変換する。
    // const relativeFilePath = createFilePath({
    //   node, //何を
    //   getNode, //どうやって　onCreateNodeからのgetNodeをここに渡す。
    //   basePath: `blog`,
    //   trailingSlash: false,
    // });

    // 親のFileNodeを取得して
    const parent = getNode(node.parent);

    // gatsby-config.jsで設定したFileNodeのsourceInstanceNameを
    // MarkdownRemarkのフィールドに引き継ぐ
    // 名前はMarkdownRemarkの他プロパティとかぶらないようにcollectionとしている
    createNodeField({
      node,
      name: 'collection',
      value: parent.sourceInstanceName,
    });

    // LogUtils.log(node);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  // LogUtils.log('Exec createPages');
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info

  // const postTemplate = path.resolve('./src/templates/Post.tsx');
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            excerpt(pruneLength: 250)
            html
            id
            frontmatter {
              date
              title
            }
            timeToRead
          }
        }
      }
      allContentfulEntryPost {
        edges {
          node {
            contentfulid
          }
        }
      }
      allContentfulCategory {
        edges {
          node {
            name
            contentfulid
          }
        }
      }
    }
  `).then(result => {
    if (result.errors || !result.data) {
      throw result.errors;
    }

    const posts = result.data.allMarkdownRemark.edges;
    // posts.forEach(({ node }, index) => {
    //   const next = index === 0 ? null : posts[index - 1].node;
    //   const prev = index === posts.length - 1 ? null : posts[index + 1].node;
    // });

    createContentfulPage(result, actions);
  });
};

let createContentfulPage = (result, actions) => {
  const { createPage } = actions;
  const entryEdges = result.data.allContentfulEntryPost.edges;
  entryEdges.map(edge => {
    createPage({
      path: `/entry/${edge.node.contentfulid}`,
      component: require.resolve('./src/templates/entry-post.tsx'),
      context: {
        slug: edge.node.contentfulid,
      },
    });
  });
  const categoryEdges = result.data.allContentfulCategory.edges;
  categoryEdges.map(edge => {
    createPage({
      path: `/category/${edge.node.contentfulid}`,
      component: require.resolve('./src/templates/Category.tsx'),
      context: {
        slug: edge.node.contentfulid,
      },
    });
  });
};
