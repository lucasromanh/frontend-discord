document.addEventListener('DOMContentLoaded', async function() {
  const editButtons = document.querySelectorAll(".edit-button");
  if (editButtons.length > 0) {
    editButtons.forEach((button) => {
      button.addEventListener("click", goToEditProfilePage);
    });
  }

  const usernamePlaceholder = document.getElementById('usernamePlaceholder');
  const fullnamePlaceholder = document.getElementById('fullnamePlaceholder');
  const nombrePlaceholder = document.getElementById('nombrePlaceholder');
  const apellidoPlaceholder = document.getElementById('apellidoPlaceholder');
  const correoPlaceholder = document.getElementById('correoPlaceholder');
  const editUsernameButton = document.getElementById('editUsernameButton');

  if (usernamePlaceholder && fullnamePlaceholder && nombrePlaceholder && apellidoPlaceholder && correoPlaceholder && editUsernameButton) {
    try {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        usernamePlaceholder.textContent = storedUsername;
        const response = await fetch(`http://127.0.0.1:5000/users/${storedUsername}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          fullnamePlaceholder.textContent = userData.nombre + ' ' + userData.apellido;
          nombrePlaceholder.textContent = userData.nombre;
          apellidoPlaceholder.textContent = userData.apellido;
          correoPlaceholder.textContent = userData.correo;
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }

  function goToEditProfilePage() {
    window.location.href = "editar_perfil.html";
  }
});
