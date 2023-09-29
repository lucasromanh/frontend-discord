document.addEventListener('DOMContentLoaded', function() {
  const confirmButton = document.querySelector(".button-container button[type='submit']");
  const cancelButton = document.querySelector(".button-container button[type='button']");

  confirmButton.addEventListener("click", goToConfirmationPage);
  cancelButton.addEventListener("click", goBack);

  function goToConfirmationPage(e) {
    e.preventDefault();
    const emailInput = document.querySelector("#email-input");
    const usernameInput = document.querySelector("#username-input");
    const nombreInput = document.querySelector("#nombre-input");
    const apellidoInput = document.querySelector("#apellido-input");
    const contraseñaInput = document.querySelector("#contraseña-input");
    const daySelect = document.querySelector("#day");
    const monthSelect = document.querySelector("#month");
    const yearSelect = document.querySelector("#year");
  
    if (
      !emailInput.value ||
      !usernameInput.value ||
      !nombreInput.value ||
      !apellidoInput.value ||
      !contraseñaInput.value ||
      !daySelect.value ||
      !monthSelect.value ||
      !yearSelect.value
    ) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    const formData = {
      correo: emailInput.value,
      nombre_usuario: usernameInput.value,
      nombre: nombreInput.value,
      apellido: apellidoInput.value,
      contrasena: contraseñaInput.value, 
      fecha_nacimiento: `${yearSelect.value}-${monthSelect.value}-${daySelect.value}`
    };
  
    fetch('http://127.0.0.1:5000/users/registro', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en el registro');
        }
      })
      .then(function (data) {
        console.log(data);
        alert('Cuenta creada de forma exitosa!. Bienvenid@');
        window.location.href = '/template_folder/login.html'; 
      })
      .catch(function (error) {
        console.error(error);
        alert('Error en el registro. Verifica los datos ingresados.');
      });
  }

  function goBack() {
    window.history.back();
  }
});

const daySelect = document.querySelector("#day");

for (let day = 1; day <= 31; day++) {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  daySelect.appendChild(option);
}

const monthSelect = document.querySelector("#month");
const monthNames = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio", 
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

for (let month = 0; month < 12; month++) {
  const option = document.createElement("option");
  option.value = month + 1;
  option.textContent = monthNames[month];
  monthSelect.appendChild(option);
}

const yearSelect = document.querySelector("#year");
const currentYear = new Date().getFullYear();
const startYear = currentYear - 100;

for (let year = startYear; year <= currentYear; year++) {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
}

const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", goBack);
