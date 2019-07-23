let userListElement = document.querySelector('#user-list')
let userRepoList = document.querySelector('#repos-list')

// FORM EVENTLISTENER
  let form = document.querySelector('#github-form');
      form.addEventListener('submit', event => {
        event.preventDefault();
        let userList = event.target.search.value;

        // CALL USERLIST FETCH & SLAP USER LIST w/ Img to DOM
          fetchUserList(userList).then(dataList => {
              userListElement.innerHTML = '';
              dataList.items.forEach(user => {
                let li = document.createElement('li');
                let img = document.createElement('img');
                img.src = user.avatar_url;
                li.dataset = user;
                li.dataset.user =`${user.login}`;
                li.append(img);
                let hTag = document.createElement('h2')
                hTag.innerText = `${user.login}`;
                li.append(hTag)
                userListElement.append(li);
              });
           })
      })

// USER REPO EVENTLISTENER
userListElement.addEventListener('click', (event) => {
  userRepoList.innerHTML = '';
  if (event.target.tagName === 'H2'|| event.target.tagName === 'IMG') {
    let userName = event.target.parentElement.dataset.user;

          // CALL USER REPO FETCH & SLAP REPO LIST to DOM
            fetchUserRepos(userName).then(repos => {
              repos.forEach(repo => {
                console.log(repo);
                let repoLi = document.createElement('li')
                repoLi.innerHTML = `<h3>Name: ${repo.name}</h3> <p>${repo.git_url}</p>`
                userRepoList.append(repoLi)
              });
            })
        };
      })


// FETCHES
    // User REPO Fetch
      const fetchUserRepos = (user) => {
        return fetch(`https://api.github.com/users/${user}/repos`, {
          Accept: 'application/vnd.github.v3+json'
        })
        .then(resp => resp.json())
      }

    // List of Users Fetch
      const fetchUserList = (user) => {
        return fetch(`https://api.github.com/search/users?q=${user}`, {
          Accept: 'application/vnd.github.v3+json'
        })
        .then(resp => resp.json())
      }
