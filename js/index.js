const form = document.querySelector('form')


function fetchUsers(users) {
  fetch (`https://api.github.com/search/users?q=${users}`, {
    headers: {
      "Accept": "application/vnd.github.v3+json"
    }
  })
  .then(resp => resp.json())
  .then(showUserInfoOnDom)
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  let users = document.querySelector('#search').value;
  
  // console.log(fetchUsers(users))
  fetchUsers(users)
})


function showUserInfoOnDom(data) {
  const userUl = document.querySelector('#user-list');
  const userLi = document.createElement('li');
  userUl.innerHTML = '';
  for (user of data.items) {
    userLi.innerHTML = `
        <img src="${user.avatar_url}">
        <a href="${user.html_url}">${user.login}</a>
    `;
    userUl.append(userLi);
    showUserRepoOnDom(user.repos_url)
  }

}

function showUserRepoOnDom(data) {
  const ul = document.querySelector('#repos-list')
  fetch (`${data}`, {
    headers: {
      "Accept": "application/vnd.github.v3+json"
    }
  })
  .then(resp => resp.json())
  .then(function(repos){
    for(repo of repos) {
      const li = document.createElement('li');
      li.innerHTML =` <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>`
      ul.append(li)
    }
  })



  console.log(data)

}






