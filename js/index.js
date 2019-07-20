console.log('Running...');

// GET - URL endpoints
const BASE_URL = 'https://api.github.com/';
const SEARCH_QUERY_URL = `${BASE_URL}search/users?q=`;

// NOT NEEDED, repos_url available upon search.
// const USER_REPOS_HEAD = `${BASE_URL}users/`;
// const USER_REPOS_TAIL = '/repos';

// Fire these once the dom has loaded.
document.addEventListener('DOMContentLoaded', event => {
  handleForm();
});

// Funtion handles submit on form
function handleForm() {
  // find form
  let form = document.querySelector('#github-form');
  // add event listener
  form.addEventListener('submit', event => {
    // prevent default submit action
    event.preventDefault();
    // get a hold of that value
    let inputVal = event.target.search.value;
    // call our search handling function
    handleSearch(inputVal);
  });
}

// Funtion handles username search
function handleSearch(username) {
  // Fetch our search query and concatenate link with the username from form.
  fetch(`${SEARCH_QUERY_URL + username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Doesn't require a key but they ask for us to add this in our headers.
      Accept: 'application/vnd.github.v3+json'
    }
  })
    // Parse response into JSON
    .then(res => res.json())
    // Call our git hub user handling function
    // Pass the username so we can compare it with the search
    .then(data => handleGitHubUser(data, username));
}

// This will parse through our search, find the exact match, then fetch our user's Repos
function handleGitHubUser(users, searchedName) {
  // check our response status
  let invalidResponse = users.incomplete_results; // false if we have a valid response
  // if we have an invalid response, return the error
  if (invalidResponse) {
    return 'INVALID SEARCH';
  }
  // get the array of users
  let usersArr = users.items;
  // find the one we're looking for
  let foundUser = usersArr.find(
    user => user.login.toLowerCase() === searchedName.toLowerCase()
  );

  console.log(foundUser);
}
/* RESPONSE
{login: "Lexscher", id: 35089689, node_id: "MDQ6VXNlcjM1MDg5Njg5", avatar_url: "https://avatars3.githubusercontent.com/u/35089689?v=4", gravatar_id: "", …}
avatar_url: "https://avatars3.githubusercontent.com/u/35089689?v=4"
events_url: "https://api.github.com/users/Lexscher/events{/privacy}"
followers_url: "https://api.github.com/users/Lexscher/followers"
following_url: "https://api.github.com/users/Lexscher/following{/other_user}"
gists_url: "https://api.github.com/users/Lexscher/gists{/gist_id}"
gravatar_id: ""
html_url: "https://github.com/Lexscher"
id: 35089689
login: "Lexscher"
node_id: "MDQ6VXNlcjM1MDg5Njg5"
organizations_url: "https://api.github.com/users/Lexscher/orgs"
received_events_url: "https://api.github.com/users/Lexscher/received_events"
repos_url: "https://api.github.com/users/Lexscher/repos"
score: 112.73647
site_admin: false
starred_url: "https://api.github.com/users/Lexscher/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/Lexscher/subscriptions"
type: "User"
url: "https://api.github.com/users/Lexscher"
__proto__: Object
*/
