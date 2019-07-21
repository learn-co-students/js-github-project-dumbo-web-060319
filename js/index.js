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
  // Get the ul from the page
  let userList = document.querySelector('#user-list');
  // get the array of users
  let usersArr = users.items;
  // find the one we're looking for
  // FIND EXACT USER YOU SEARCH FOR -- this is NOT what they asked haha
  let foundUser = usersArr.find(
    user => user.login.toLowerCase() === searchedName.toLowerCase()
  );
  // loop through array
  usersArr.forEach(user => {
    // create li
    let userItem = document.createElement('li');
    // append userItem to userList
    userList.append(userItem);
    // Add a unique id to the li
    userItem.id = `user-${user.id}`;
    // add a class
    userItem.classList.add('user-list-item');
    // add inner html that will hold the username, avatar, and profile link
    userItem.innerHTML = `
    <img src=${user.avatar_url} alt=${user.login} class="user-avatar">
    <a href=${user.html_url} target="_blank">
      <p>${user.login}</p>
    </a>
    `;
    console.log(user);
  });
  // get user repos endpoint
  let userReposUrl = foundUser.repos_url;
  // call our fetch repos method
  fetchRepos(userReposUrl);
}

function fetchRepos(reposUrl) {
  console.log(reposUrl);
  // fetch url
  fetch(reposUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Doesn't require a key but they ask for us to add this in our headers.
      Accept: 'application/vnd.github.v3+json'
    }
  })
    // Parse response into JSON
    .then(res => res.json())
    // call our handleRepos function
    .then(handleRepos);
}

function handleRepos(repoListData) {
  // Find the container to attach the repos to
  let reposList = document.querySelector('#repos-list');
  // loop through our data
  repoListData.forEach(repoObject => {
    // create an li
    let repo = document.createElement('li');
    // append to the UL, reposList
    reposList.append(repo);
    // debugger;
    repo.classList.add('repo-list-item');
    repo.innerHTML = `
    <a href=${repoObject.html_url} target="_blank">
      <p>${repoObject.full_name}</p>
    </a>
    `;
  });
}

/* RESULTS - AN ARRAY OF OBJECTS, THIS IS THE FIRST ONE:
0:
archive_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/{archive_format}{/ref}"
archived: false
assignees_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/assignees{/user}"
blobs_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/git/blobs{/sha}"
branches_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/branches{/branch}"
clone_url: "https://github.com/Lexscher/activerecord-validations-lab-dumbo-web-060319.git"
collaborators_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/collaborators{/collaborator}"
comments_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/comments{/number}"
commits_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/commits{/sha}"
compare_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/compare/{base}...{head}"
contents_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/contents/{+path}"
contributors_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/contributors"
created_at: "2019-06-30T23:07:05Z"
default_branch: "master"
deployments_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/deployments"
description: null
disabled: false
downloads_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/downloads"
events_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/events"
fork: true
forks: 0
forks_count: 0
forks_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/forks"
**full_name: "Lexscher/activerecord-validations-lab-dumbo-web-060319"
git_commits_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/git/commits{/sha}"
git_refs_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/git/refs{/sha}"
git_tags_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/git/tags{/sha}"
git_url: "git://github.com/Lexscher/activerecord-validations-lab-dumbo-web-060319.git"
has_downloads: true
has_issues: false
has_pages: false
has_projects: true
has_wiki: false
homepage: null
hooks_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/hooks"
**html_url: "https://github.com/Lexscher/activerecord-validations-lab-dumbo-web-060319"
id: 194569516
issue_comment_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/issues/comments{/number}"
issue_events_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/issues/events{/number}"
issues_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/issues{/number}"
keys_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/keys{/key_id}"
labels_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/labels{/name}"
language: "Ruby"
languages_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/languages"
license: null
merges_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/merges"
milestones_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/milestones{/number}"
mirror_url: null
name: "activerecord-validations-lab-dumbo-web-060319"
node_id: "MDEwOlJlcG9zaXRvcnkxOTQ1Njk1MTY="
notifications_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/notifications{?since,all,participating}"
open_issues: 0
open_issues_count: 0
owner: {login: "Lexscher", id: 35089689, node_id: "MDQ6VXNlcjM1MDg5Njg5", avatar_url: "https://avatars3.githubusercontent.com/u/35089689?v=4", gravatar_id: "", …}
private: false
pulls_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/pulls{/number}"
pushed_at: "2019-07-01T03:47:09Z"
releases_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/releases{/id}"
size: 47
ssh_url: "git@github.com:Lexscher/activerecord-validations-lab-dumbo-web-060319.git"
stargazers_count: 0
stargazers_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/stargazers"
statuses_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/statuses/{sha}"
subscribers_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/subscribers"
subscription_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/subscription"
svn_url: "https://github.com/Lexscher/activerecord-validations-lab-dumbo-web-060319"
tags_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/tags"
teams_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/teams"
trees_url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319/git/trees{/sha}"
updated_at: "2019-07-01T03:47:10Z"
url: "https://api.github.com/repos/Lexscher/activerecord-validations-lab-dumbo-web-060319"
watchers: 0
watchers_count: 0
__proto__: Object
 */
