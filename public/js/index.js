document.getElementById('login-button').addEventListener('click', async() => {
    const form = document.getElementById('login-form');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        }).then(response => response.json())
        .then((response) => {
            console.log(response['code']);

            if (response['code'] == 0) {
                form.innerHTML += `
                <label for="register" style="align-self: center; color: red;">Email ou senha incorretos</label>                
                `;
            } else if (response['code'] == 1) {
                window.location.href = '/inicio';
            }

        });
});