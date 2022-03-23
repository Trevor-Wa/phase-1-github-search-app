
let search = document.getElementById('github-form')

search.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(res => res.json())
        .then(res => {

            const users = document.getElementById('user-list')
            const repos = document.getElementById('repos-list')
            repos.innerHTML = ""
            users.innerHTML = ""
            res.items.map(item => {
                let li = document.createElement('li')

                let h2 = document.createElement('h2')
                h2.textContent = item.login

           


                //    Event Listener

                h2.addEventListener('click',e => getRepo(item.login, e))
                let img = document.createElement('img')
                img.src = item.avatar_url

                li.append(h2, img)
                users.append(li)

            })
        })
})




function getRepo(username, e) {
    const repos = document.getElementById('repos-list')
            repos.innerHTML = ""

    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => response.map(repo => {
            let li = document.createElement('li')
            let h1 = document.createElement('h1')
            h1.textContent = repo.name
            
            li.append(h1)
            repos.append(li)

        })
        )
}

