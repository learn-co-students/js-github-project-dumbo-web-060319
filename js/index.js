const SEARCH = document.querySelector('#search');
const USER_LIST = document.querySelector('#user-list');
const REPO_LIST = document.querySelector('#repos-list');

// puts together the proper elements of an individual user to display
function stitchUser(user) {
	let li = document.createElement('li');
	li.id = `${user.login}`;
	let img = document.createElement('img');
	img.setAttribute('src', `${user.avatar_url}`);
	li.append(img);
	li.append(`${user.login}: ${user.html_url}`);
	return li;
}

// loops through top results
function iterateUsers(searchJson) {
	console.log(searchJson.items);
	USER_LIST.innerHTML = "";
	for (user of searchJson.items) {
		console.log(stitchUser(user));
		USER_LIST.append(stitchUser(user));
	}
}
//searching for the value entered by the user with this fetch get request
function fetchUsers() {
	fetch(`https://api.github.com/search/users?q=${SEARCH.value}`)
	.then(resp => resp.json())
	.then(iterateUsers)
}

document.addEventListener("submit", event => {
	event.preventDefault();
	USER_LIST.hidden = false;
	REPO_LIST.hidden = true;
	fetchUsers();
});

function createRepo(repo) {
	let li = document.createElement('li');
	li.innerText = `${repo.name} in ${repo.language}`;
	return li;
}

// displays the repo of the selected github account repo to the screen
function showRepos(repoJson) {
	USER_LIST.hidden = true;
	REPO_LIST.hidden = false;
	REPO_LIST.innherHTML = "";
	for (repo of repoJson) {
		REPO_LIST.append(createRepo(repo));
	}
}

// gets the json file from the specified api get request
function fetchRepos(userId) {
	fetch(`https://api.github.com/users/${userId}/repos`)
	.then(resp => resp.json())
	.then(showRepos);
}

document.addEventListener("click", event => {
	if (event.target.tagName === "IMG") {
		fetchRepos(event.target.parentElement.id);
	}
})