document.addEventListener("DOMContentLoaded", () => {
  let selectedServerId;
  let selectedChannelId;
  const form = document.getElementById("message-form");
  const input = document.querySelector("#message-input");
  const canales = document.querySelectorAll(".channel");
  const servidores = document.querySelectorAll(".server-logo");

  function selectServer(event) {
    event.preventDefault();
    selectedServerId = this.getAttribute("data-servidorid");
    console.log("Servidor seleccionado: " + selectedServerId);
  }

  servidores.forEach((servidor) => {
    servidor.addEventListener("click", selectServer);
  });

  function selectChannel(event) {
    event.preventDefault();
    selectedChannelId = this.getAttribute("data-canalid");
    console.log("Canal seleccionado: " + selectedChannelId);
  }

  canales.forEach((canal) => {
    canal.addEventListener("click", selectChannel);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    await sendMessage();
  });
  
  async function sendMessage() {
    const messageContent = input.value;
  
    if (messageContent.trim() === "") {
      console.error("El contenido del mensaje está vacío.");
      return;
    }
  
    const mensaje = {
      contenido: messageContent,
      canal_id: selectedChannelId,
      servidor_id: selectedServerId,
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/messages/", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mensaje),
      });
  
      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }
  
      const data = await response.json();
      const storedUsername = localStorage.getItem('username');
  
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.dataset.messageid = data.message_id;
      messageElement.innerHTML = `
        <img src="/static_folder/assets/userdefault.jpg" alt="avatar">
        <div class="message__info">
          <h4>${storedUsername} <span class="message__timestamp">${new Date().toLocaleDateString()}</span></h4>
          <p class="message__content">${messageContent}</p>
          <button class="edit-button" onclick="editMessage(${data.message_id})">Editar</button>
          <button class="delete-button" onclick="deleteMessage(${data.message_id})">Eliminar</button>
        </div>
      `;
  
      const chatMessages = document.querySelector(".chat__messages");
      chatMessages.appendChild(messageElement);
  
      console.log("Mensaje enviado correctamente");
    } catch (error) {
      console.error(error.message);
    }
  
    input.value = "";
  }
  
  const profileInfo = document.querySelector(".sidebar__profileInfo");
  const usernamePlaceholder = document.getElementById('usernamePlaceholder');
  
  if (profileInfo && usernamePlaceholder) {
    profileInfo.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Perfil de usuario clicado");
      window.location.href = "/template_folder/perfil.html";
    });
  
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      usernamePlaceholder.textContent = storedUsername;
    }
  }
});
  
async function editMessage(messageId) {
  const nuevoContenido = prompt("Editar mensaje:");
  if (nuevoContenido === null) {
    return;
  }

  const messageElement = document.querySelector(`.message[data-messageid="${messageId}"]`);
  if (messageElement) {
    messageElement.querySelector(".message__content").textContent = nuevoContenido;
  }

  console.log("Mensaje editado en el DOM correctamente");
}

function deleteMessage(messageId) {
  const messageElement = document.querySelector(`.message[data-messageid="${messageId}"]`);
  if (messageElement) {
    messageElement.remove();
    console.log("Mensaje eliminado del DOM correctamente");
  } else {
    console.error("El mensaje no se encontró en el DOM");
  }
}




