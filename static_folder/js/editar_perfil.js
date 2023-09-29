document.addEventListener('DOMContentLoaded', async function() {
    const editButtons = document.querySelectorAll(".edit-button");
    if (editButtons.length > 0) {
      editButtons.forEach((button) => {
        button.addEventListener("click", goToEditProfilePage);
      });
    }

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const oldPasswordInput = document.getElementById('old-password');
    const newPasswordInput = document.getElementById('new-password');
    const saveChangesButton = document.querySelector(".save-changes-button");
    const redirectToProfileButton = document.querySelector(".redirect-to-profile-button");

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      usernameInput.value = storedUsername;
      await loadUserProfile(storedUsername);
    }

    if (saveChangesButton) {
      saveChangesButton.addEventListener("click", saveProfileChanges);
    }

    if (redirectToProfileButton) {
      redirectToProfileButton.addEventListener("click", redirectToProfile);
    }

    async function loadUserProfile(username) {
      const requestUrl = `http://127.0.0.1:5000/users/${username}`;

      try {
        const response = await fetch(requestUrl, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          emailInput.value = userData.correo;
          nombreInput.value = userData.nombre;
          apellidoInput.value = userData.apellido;
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }

    async function saveProfileChanges() {
      const username = usernameInput.value;
  
      if (!username) {
        alert('Error: Nombre de usuario no proporcionado.');
        return;
      }
  
      const formData = {
        nombre_usuario: username,
        correo: emailInput.value,
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        contrasena: oldPasswordInput.value,
        nuevacontra: newPasswordInput.value
      };
  
      const requestUrl = `http://127.0.0.1:5000/users/update/${username}`;
  
      try {
        const response = await fetch(requestUrl, {
          method: 'PUT', 
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          alert('Cambios guardados exitosamente.');
          window.location.href = "index.html";
        } else {
          const responseData = await response.json();
          console.error('Error en la solicitud:', responseData.error);
          alert('Error al guardar cambios. Verifica los datos ingresados o asegúrate de que el servidor esté en ejecución.');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error al guardar cambios. Verifica los datos ingresados o asegúrate de que el servidor esté en ejecución.');
      }
    }
    function redirectToProfile() {
        window.location.href = "index.html";
      }
  

    function goToEditProfilePage() {
      window.location.href = "editar_perfil.html";
    }
});
