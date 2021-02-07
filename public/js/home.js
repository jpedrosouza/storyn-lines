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
                <div class="space" id="${element['id']}">
                    <span class="space-title">${element['space_name']}</span>
                    <img src="/assets/images/comment.svg">
                    <span>${element['posts']}</span>
                    <img src="/assets/images/favorite.svg">
                    <span>${element['likes']}</span>
                </div>
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
                <div class="space" id="${element['id']}">
                    <span class="space-title">${element['space_name']}</span>
                    <img src="/assets/images/comment.svg">
                    <span>${element['posts']}</span>
                    <img src="/assets/images/favorite.svg">
                    <span>${element['likes']}</span>
                </div>
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

                getSpaces();
            });
    }
});