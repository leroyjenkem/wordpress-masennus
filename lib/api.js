const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, {variables} = {}) {

  const headers = { 'Content-Type': 'application/json'} ;

  const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({query, variables}),
  });

  const json = await res.json();
  if(json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
  }

  return json.data;

}
//export async function fetchAPI(query, { variables } = {}) {
//    const headers = { 'Content-Type': 'application/json' }
//
//    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
//      headers[
//        'Authorization'
//      ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
//    }
//
//    const res = await fetch(API_URL, {
//      method: 'POST',
//      headers,
//      body: JSON.stringify({
//        query,
//        variables,
//      }),
//    })
//
//    const json = await res.json()
//    if (json.errors) {
//      console.error(json.errors)
//      throw new Error('Failed to fetch API')
//    }
//    return json.data
//  }

  export async function getPages(){
    const data = await fetchAPI(
        `query allPages {
          pages(where: {status: PUBLISH, orderby: {field: MENU_ORDER, order: ASC}}) {
            edges {
              node {
                id
                slug
                title(format: RENDERED)
                content(format: RENDERED)
                uri
              }
            }
          }
        }
      `,
        {
          variables: {},
        }
      );
    return data?.pages?.edges;
}

//export async function postsByCategory(params){
//  const data = await fetchAPI(`
//  query postsCategories($categoryName:  {$eq: params.slug} {
//    posts(
//      where: {categoryName: $categoryName, orderby: {field: MENU_ORDER, order: ASC}}
//    ) {
//      edges {
//        node {
//          title(format: RENDERED)
//          slug
//          excerpt(format: RENDERED)
//          content(format: RENDERED)
//          uri
//        }
//      }
//    }
//  }
//  `)
//}

export async function getAllPages() {
  const data = await fetchAPI(`
      query allPages {
        pages(where: {status: PUBLISH, orderby: {field: MENU_ORDER, order: ASC}}) {
              edges {
                  node {
                      slug
                  }
              }
          }
      }
  `);
  return data?.pages;
}

export async function getPage(page) {
  const data = await fetchAPI(`
      query pageBySlug($uri: String) {
          pageBy(uri: $uri) {
              title(format: RENDERED)
              content(format: RENDERED)
          }
      }
      `,
      {
          variables: {
              uri: "/index.php/" + page
          }
      }
  );
  return data;
}

//export async function getAllPosts() {
//  const data = await fetchAPI(`
//      query allPosts {
//        posts(where: {status: PUBLISH, orderby: {field: MENU_ORDER, order: ASC}}) {
//              edges {
//                  node {
//                      uri
//                  }
//              }
//          }
//      }
//  `);
//  return data?.posts;
//}

export async function getPosts(page) {
    const data = await fetchAPI(`
    query allPostsByCategory($uri: String) {
        posts(where: {categoryName: $uri, orderby: {field: DATE, order: ASC}}) {
          pageInfo {
            offsetPagination {
              hasMore
              hasPrevious
              total
            }
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            node {
              title(format: RENDERED)
              content(format: RENDERED)
              id
            }
          }
        }
      }
        `,
        {
            variables: {
                uri:  page
            }
        }
    );
    return data?.posts;
  }

  //export async function getSinglePost({ page, post }){
  //  const data = await fetchAPI(`
  //  query getSinglePost {
  //    post(id: "/wordpress-masennusohjeet/wordpressin-asentaminen/", idType: URI) {      
  //            title(format: RENDERED)
  //            content(format: RENDERED)
  //            slug
  //            id
  //            uri
  //      }
  //    }
  //  `,        {
  //    variables: {
  //        uri:  "/index.php/" + page + post
  //    }
  //}
  //);
  //  return data?.post;
//}