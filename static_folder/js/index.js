document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.querySelector(".login-button");
  const registerButton = document.querySelector(".register-button");
  const registerLink = document.querySelector('#register-link');

  loginButton.addEventListener("click", goToLoginPage);
  registerButton.addEventListener("click", goToRegisterPage);
  registerLink.addEventListener('click', goToRegisterPage);

  async function goToLoginPage(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const userData = {
      usuario: username,
      contraseña: password
    };

    const requestUrl = 'http://127.0.0.1:5000/users/login';

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        localStorage.setItem('username', username);
        window.location.href = './index.html';
      } else {
        const responseData = await response.json();
        console.error('Error en la solicitud:', responseData.error);
        alert('Error de inicio de sesión. Verifica tus credenciales o asegúrate de que el servidor esté en ejecución.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de inicio de sesión. Verifica tus credenciales o asegúrate de que el servidor esté en ejecución.');
    }
  }

  function goToRegisterPage(event) {
    event.preventDefault();
    window.location.href = './registro.html';
  }
});
