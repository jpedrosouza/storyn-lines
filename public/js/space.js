const spaceId = document.getElementById('title').className;
const postsContainer = document.getElementById('posts-container');

(function() {
    getPosts()
}());

async function getPosts() {
    await fetch('/post/get-posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                space_id: spaceId
            })
        }).then(response => response.json())
        .then((response) => {
            response.forEach((post) => {
                postsContainer.innerHTML += `
                <div class="post slow-transition">
                <span>${post['users']['username']} - 07/02/2021 - 03:47</span>
                <span>${post['content']}</span>
                </div>
                `;
            })
        });
}

document.getElementById('like-deslike').addEventListener('click', async() => {
    var likeButton = document.getElementById('like-deslike');

    likeButton.innerHTML = '';

    if (likeButton.className.toString() == 'material-icons like') {
        console.log('Like post' + likeButton.className.toString());

        likeButton.innerHTML = 'favorite';

        likeButton.className = 'material-icons deslike';

        await fetch('/space/add-space-like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                space_id: spaceId
            })
        });
    } else if (likeButton.className.toString() == 'material-icons deslike') {
        console.log('Deslike post');

        likeButton.innerHTML = 'favorite_border';

        likeButton.className = 'material-icons like';

        await fetch('/space/remove-space-like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                space_id: spaceId
            })
        });
    }
});

document.getElementById('send-button').addEventListener('click', async() => {
    const content = document.getElementById('text').value;

    await fetch('/post/create-post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ space_id: spaceId, content: content })
        }).then(response => response.json())
        .then((response) => {
            console.log(response);
        });

    document.getElementById('text').value = '';
});