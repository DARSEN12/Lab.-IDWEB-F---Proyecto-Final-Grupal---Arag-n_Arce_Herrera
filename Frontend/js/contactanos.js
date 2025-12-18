document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    // 1. Obtener valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const msgExito = document.getElementById("msg-exito");

    // 2. Validaciones básicas (Frontend)
    if(nombre === "" || correo === "" || mensaje === ""){
        msgExito.style.color = "red";
        msgExito.textContent = "Por favor, completa todos los campos.";
        return;
    }

    if(!correo.includes("@") || !correo.includes(".")){
        msgExito.style.color = "red";
        msgExito.textContent = "Ingresa un correo válido.";
        return;
    }

    // 3. Mostrar estado "Enviando..." (Feedback visual)
    msgExito.style.color = "blue";
    msgExito.textContent = "Enviando mensaje...";

    // 4. Enviar datos al Backend (Python Flask)
    fetch('http://127.0.0.1:5000/api/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            mensaje: mensaje
        })
    })
    .then(response => response.json())
    .then(data => {
        // 5. Respuesta del servidor
        if (data.success) {
            // Éxito: Se guardó en la BD
            msgExito.style.color = "green";
            msgExito.textContent = "Nos contactaremos contigo lo más pronto posible";
            
            // Limpiar el formulario
            document.getElementById("contactForm").reset();
        } else {
            // Error: El servidor rechazó los datos o falló la BD
            msgExito.style.color = "red";
            msgExito.textContent = "Error al enviar: " + data.message;
        }
    })
    .catch(error => {
        // Error de red (Servidor apagado o sin internet)
        console.error('Error:', error);
        msgExito.style.color = "red";
        msgExito.textContent = "No se pudo conectar con el servidor.";
    });
});