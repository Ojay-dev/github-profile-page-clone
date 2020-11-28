let content = `{
  viewer {
    login
    repositories(orderBy: {field: UPDATED_AT, direction: DESC}, last: 20, privacy: PUBLIC, isFork: true) {
      edges { 
        node {
          id
          url
          name
          forkCount
          isPrivate
          projectsUrl
          description
          updatedAt
          languages(first: 1) {
            nodes {
              name
              color
            }
          }
        }
      }
      totalCount
    }
    twitterUsername
    name
    bio
    avatarUrl
    company
    following {
      totalCount
    }
    followers {
      totalCount
    }
    location
    organizations(first: 5) {
      edges {
        node {
          id
          avatarUrl
        }
      }
    }
  }
}


`;

export async function fetchGitHubData() {
  // GraphQL query parameters and headers
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer 'GITHUB TOKEN HERE'",
    },
    body: JSON.stringify({
      query: content,
    }),
  };

  try {
    const loader = document.querySelector(".loader");

    // Fetch data for user
    let res = await fetch(`https://api.github.com/graphql`, options);
    res = await res.json();
    console.log(res);
    if (res.message) {
      throw new Error(res.message + " - please input github token inside code");
    } else {
      setTimeout(() => {
        loader.style.cssText =
          "visibility: hidden; opacity: 0; transition: visibility 0s 2s, opacity 2s linear;";
      }, 1000);
    }

    return res.data.viewer;
  } catch (error) {
    alert(error);
  }
}
