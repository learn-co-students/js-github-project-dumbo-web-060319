console.log('Running...');

// GET - URL endpoints
const BASE_URL = 'https://api.github.com/';
const SEARCH_QUERY_URL = `${BASE_URL}search/users?q=`;
const USER_REPOS_HEAD = `${BASE_URL}users/`;
const USER_REPOS_TAIL = '/repos';

// Fire these once the dom has loaded.
document.addEventListener('DOMContentLoaded', event => {
  formHandler();
});

// Funtion handles submit on form
function formHandler() {
  // find form
  let form = document.querySelector('#github-form');
  // add event listener
  form.addEventListener('submit', event => {
    // prevent default submit action
    event.preventDefault();
    // get a hold of that value
    let inputVal = event.target.search.value;
    // call our search handling function
    searchHandler(inputVal);
  });
}

// Funtion handles username search
function searchHandler(username) {
  fetch(`${SEARCH_QUERY_URL + username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Doesn't require a key but they ask for us to add this in our headers.
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then(res => res.json())
    .then(data => console.log(data));
}

// Responds with
/*
{total_count: 1, incomplete_results: false, items: Array(1)}
incomplete_results: false
items: Array(1)
0: {login: "Lexscher", id: 35089689, node_id: "MDQ6VXNlcjM1MDg5Njg5", avatar_url: "https://avatars3.githubusercontent.com/u/35089689?v=4", gravatar_id: "", …}
length: 1
__proto__: Array(0)
total_count: 1
__proto__: Object
*/
