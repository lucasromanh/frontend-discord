function abrirBuscarServidoresModal() {
  const modal = document.getElementById('buscarServidoresModal');
  modal.style.display = 'block';
}

function cerrarBuscarServidoresModal() {
  const buscarServidoresModal = document.getElementById('buscarServidoresModal');
  buscarServidoresModal.style.display = 'none';
}

async function obtenerServidores() {
  try {
    const servidoresUrl = 'http://127.0.0.1:5000/servers/';
    const response = await fetch(servidoresUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudieron obtener los servidores.`);
    }

    const servidores = await response.json();
    const resultadosServidores = document.getElementById('resultadosServidores');
    resultadosServidores.innerHTML = '';

    servidores.forEach((servidor) => {
      const servidorItem = document.createElement('div');
      servidorItem.classList.add('server-item');
      servidorItem.textContent = servidor.nombre;
      servidorItem.addEventListener('click', () => {
        cerrarBuscarServidoresModal();
        alert(`Servidor seleccionado: ${servidor.nombre}`);
      });
      resultadosServidores.appendChild(servidorItem);
    });
  } catch (error) {
    console.error("Error al obtener los servidores:", error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let data;

  const servidoresContainer = document.querySelector('.servers');
  const crearServidorButton = document.getElementById('crearServidorButton');
  const agregarServidorModal = document.getElementById('agregarServidorModal');
  const cerrarModalButton = document.getElementById('cerrarModal');
  const agregarServidorForm = document.getElementById('agregarServidorForm');
  const iconoBuscarServidores = document.querySelector('.server-logo.search-server');
  const cerrarBuscarServidoresModalButton = document.getElementById('cerrarBuscarServidoresModal');
  const obtenerServidoresButton = document.getElementById('obtenerServidores');
  const resultadosServidores = document.getElementById('resultadosServidores');

  function agregarServidorAlUI(nombreServidor, descripcion) {
    const nuevoServidor = document.createElement('div');
    nuevoServidor.classList.add('server-logo');
    nuevoServidor.setAttribute('data-servidorid', 'NuevoServidor');

    nuevoServidor.innerHTML = `
      <span class="message__count"></span>
      <img src="/static_folder/assets/serverdefault.jpg" alt="server" />
    `;

    const servidorExistente = document.querySelector('.server-logo[data-servidorid="1"]');

    if (servidorExistente) {
      servidorExistente.parentNode.insertBefore(nuevoServidor, servidorExistente);
    } else {
      const serversContainer = document.querySelector('.servers');
      serversContainer.appendChild(nuevoServidor);
    }
  }

  iconoBuscarServidores.addEventListener('click', (e) => {
    e.preventDefault();
    abrirBuscarServidoresModal();
  });

  obtenerServidoresButton.addEventListener('click', async (event) => {
    event.preventDefault();
    obtenerServidores();
  });

  crearServidorButton.addEventListener('click', async (event) => {
    event.preventDefault();
    agregarServidorModal.classList.add('show');
  });

  cerrarModalButton.addEventListener('click', () => {
    agregarServidorModal.classList.remove('show');
  });

  agregarServidorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombreServidor = document.getElementById('nombreServidor').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!nombreServidor.trim() || !descripcion.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const datosServidor = {
      nombre: nombreServidor,
      descripcion: descripcion,
      fechaCreacion: new Date().toISOString()
    };

    try {
      const token = data ? data.access_token : '';
      const response = await fetch("http://127.0.0.1:5000/servers/create", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosServidor)
      });

      if (!response.ok) {
        if (response.status === 400) {
          const responseData = await response.json();
          alert(`Error 400: ${responseData.error}`);
        } else {
          alert(`Error ${response.status}: Hubo un error al crear el servidor.`);
        }
        return;
      }

      const responseData = await response.json();

      alert(responseData.mensaje);

      agregarServidorModal.classList.remove('show');

      agregarServidorAlUI(nombreServidor, descripcion);
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Hubo un error al crear el servidor. Por favor, inténtalo nuevamente.');
    }
  });

  cerrarBuscarServidoresModalButton.addEventListener('click', () => {
    cerrarBuscarServidoresModal();
  });
});
