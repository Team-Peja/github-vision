module.exports = `
{
  viewer {
    login
    name
    avatarUrl
    email
    createdAt
    updatedAt
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(last: 100) {
      totalCount
      nodes {
        id
        name
        forkCount
        languages(first: 10) {
          totalCount
          totalSize
          edges {
            size
            node {
              name
            }
          }
        }
        ... on Repository {
          ref(qualifiedName: "master") {
            target {
              ... on Commit {
                history(first: 50) {
                  totalCount
                  edges {
                    node {
                      id
                      additions
                      deletions
                      author {
                        user {
                          login
                        }
                        date
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`