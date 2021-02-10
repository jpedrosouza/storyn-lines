(async function() {
    getSpacesFamous();
    getSpacesNews();
}())

async function getSpacesFamous() {
    const famousSpaces = document.getElementById('famous-spaces');

    famousSpaces.innerHTML = '';

    await fetch('/space/get-home-spaces-famous', { method: 'GET' })
        .then(response => response.json())
        .then(response => {
            response.forEach((element) => {
                console.log(element);

                famousSpaces.innerHTML += `
                <a href="/space?id=${element['id']}" class="space">
                    <span class="space-title">${element['space_name']}</span>
                    <img src="/assets/images/comment.svg">
                    <span>${element['posts']}</span>
                    <img src="/assets/images/favorite.svg">
                    <span>${element['likes']}</span>
                </a>
                `;
            });
        });
}

async function getSpacesNews() {
    const newSpaces = document.getElementById('new-spaces');

    newSpaces.innerHTML = '';

    await fetch('/space/get-home-spaces-news', { method: 'GET' })
        .then(response => response.json())
        .then(response => {
            response.forEach((element) => {
                console.log(element);

                newSpaces.innerHTML += `
                <a href="/space?id=${element['id']}" class="space">
                    <span class="space-title">${element['space_name']}</span>
                    <img src="/assets/images/comment.svg">
                    <span>${element['posts']}</span>
                    <img src="/assets/images/favorite.svg">
                    <span>${element['likes']}</span>
                </a>
                `;
            });
        });
}


document.getElementById('create-space').addEventListener('click', async() => {
    var spaceName = window.prompt('Informe o nome do seu Space', '');

    if (spaceName != null && spaceName.length > 0) {
        var fetchData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ space_name: spaceName })
        };

        await fetch('/space/create-space', fetchData)
            .then(response => response.json())
            .then((response) => {

                getSpacesNews();
            });
    }
});