let GITHUB_API_USER = 'https://api.github.com/users/'
let GITHUB_API_USER_SEARCH = 'https://api.github.com/search/users?q='
let githubForm = document.querySelector('#github-form');
let usersList = document.querySelector('#user-list');
let users = document.querySelector('.user');

function githubUserSearch(user) {
  fetch(GITHUB_API_USER_SEARCH + user)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    renderUserResults(myJson);
  });
}

function addUserListener(user) {
  user.addEventListener('click', function(e) {
    e.preventDefault();
    githubRepoSearch(user)
  });
}

function renderUserResults(userJson) {
  // console.log(userJson);
  userJson.items.forEach(function(elem) {
    a = document.createElement('a');
    t = document.createTextNode(elem.login);
    li = document.createElement('li');

    a.title = elem.login;
    a.dataset.repos_url = elem.repos_url;
    a.href = elem.repos_url;

    addUserListener(a);

    a.appendChild(t);
    li.appendChild(a);
    usersList.appendChild(li);
  });
}

function githubRepoSearch(repoUrl) {
  // console.log(repoUrl);
  fetch(repoUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    renderUserResults(myJson);
  });
}

githubForm.addEventListener('submit', function(e) {
  console.log(e.target);
  e.preventDefault();
  githubUserSearch(e.target.children[0].value);
});

document.addEventListener('DOMContentLoaded', function(e) {
  document.querySelector('#search').focus();
});
