async function crearCanalYAgregarAlUI(nombre, descripcion, fechaCreacion, servidorId) {
  try {
    const datosCanal = {
      nombre: nombre,
      descripcion: descripcion,
      fechaCreacion: fechaCreacion,
      servidor_id: servidorId,
    };

    const response = await fetch('http://127.0.0.1:5000/channels/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosCanal),
      mode: 'cors',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al crear el canal.');
    }

    const responseData = await response.json();
    alert(responseData.mensaje);

    agregarCanalAlUI(responseData.channel_id, nombre);
    cerrarCrearCanalModal();
  } catch (error) {
    console.error('Error al crear el canal:', error);
    alert('Hubo un error al crear el canal.');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const sidebarUsers = document.querySelector('.sidebar__users > div');
  const crearCanalModal = document.getElementById('crearCanalModal');
  const cerrarCrearCanalModalButton = document.getElementById('cerrarCrearCanalModal');
  const crearCanalForm = document.getElementById('crearCanalForm');
  const nombreCanalInput = document.getElementById('nombreCanal');
  const descripcionCanalInput = document.getElementById('descripcionCanal');
  const fechaCreacionInput = document.getElementById('fechaCreacion');
  

  sidebarUsers.addEventListener('click', (e) => {
    if (e.target.classList.contains('sidebar__addUser')) {
      e.preventDefault();
      abrirCrearCanalModal();
    }
  });

  cerrarCrearCanalModalButton.addEventListener('click', () => {
    cerrarCrearCanalModal();
  });

  window.addEventListener('click', (event) => {
    if (event.target === crearCanalModal) {
      cerrarCrearCanalModal();
    }
  });

  crearCanalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombreCanal = nombreCanalInput.value.trim();
    const descripcionCanal = descripcionCanalInput.value.trim();
    const fechaCreacion = fechaCreacionInput.value.trim();

    if (!nombreCanal || !descripcionCanal || !fechaCreacion) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const servidorId = 1; 
    crearCanal(nombreCanal, descripcionCanal, fechaCreacion, servidorId);
  });


  async function crearCanal(nombre, descripcion, fechaCreacion, servidorId) {
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      fechaCreacion: fechaCreacion,
      servidor_id: servidorId,
    };

    const requestUrl = 'http://127.0.0.1:5000/channels/';

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.mensaje);
        agregarCanalAlUI(responseData.channel_id, nombre);
        cerrarCrearCanalModal();
      } else {
        const responseData = await response.json();
        console.error('Error en la solicitud:', responseData.error);
        alert('Hubo un error al crear el canal.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un error al crear el canal.');
    }
  }

  function agregarCanalAlUI(channelId, nombre) {
    const nuevoCanal = document.createElement('li');
    nuevoCanal.classList.add('icon_list');
  
    nuevoCanal.innerHTML = `
      <div class="sidebar__user" data-servidorid="${channelId}">
        <div>
          <span class="status" data-canal="${channelId}"></span>
          <img src="/static_folder/assets/serverdefault.jpg" alt="avatar" />
        </div>
        <h4>${nombre}</h4>
      </div>
    `;
  
    const primerElementoSidebarUser = document.querySelector('.sidebar__users .sidebar__user');
    if (primerElementoSidebarUser) {
      primerElementoSidebarUser.parentNode.insertBefore(nuevoCanal, primerElementoSidebarUser);
    } else {
      sidebarUsers.appendChild(nuevoCanal);
    }
  }
  

  function abrirCrearCanalModal() {
    crearCanalModal.style.display = 'block';
    const fechaActual = new Date().toLocaleDateString();
    fechaCreacionInput.value = fechaActual;
  }

  function cerrarCrearCanalModal() {
    crearCanalModal.style.display = 'none';
    nombreCanalInput.value = '';
    descripcionCanalInput.value = '';
    fechaCreacionInput.value = '';
  }
});
let selectedServerId = null; 

function selectServer(event) {
    event.preventDefault();
    selectedServerId = this.getAttribute("data-servidorid");
    console.log("Canal seleccionado: " + selectedServerId);
}

const servidores = document.querySelectorAll(".sidebar__user[data-servidorid]");
servidores.forEach((servidor) => {
    servidor.addEventListener("click", selectServer);
});
