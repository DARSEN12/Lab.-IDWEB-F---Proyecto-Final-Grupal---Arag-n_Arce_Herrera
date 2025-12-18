document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias a los elementos del DOM
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');

    // Escuchamos el evento 'submit' del formulario
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Obtener los datos de los inputs
        const nombre = document.getElementById('nombreMascota').value;
        const tipo = document.getElementById('tipoMascota').value;
        const correo = document.getElementById('correoDuenio').value;
        const contrasena = document.getElementById('contrasenaDuenio').value;

        // 2. Crear el objeto JSON que espera tu backend en Python
        // Las claves (ej: 'nombreMascota') deben coincidir con lo que pides en data.get() en Flask
        const datosAEnviar = {
            nombreMascota: nombre,
            tipoMascota: tipo,
            correoDuenio: correo,
            contrasenaDuenio: contrasena
        };

        try {
            // 3. Enviar datos al backend (Python Flask)
            // NOTA: Si registraste el blueprint con un prefijo (ej: /api), cambia la ruta abajo.
            // Si no usaste prefijo, déjalo como '/registro_mascota'
            const respuesta = await fetch('/registro_mascota', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosAEnviar)
            });

            // Parsear la respuesta JSON del servidor
            const data = await respuesta.json();

            // 4. Mostrar el mensaje al usuario según el resultado
            if (data.success) {
                // Si el servidor responde {'success': True}
                mensajeRespuesta.textContent = '¡Éxito! ' + data.message;
                mensajeRespuesta.className = 'message success'; // Aplica estilo verde del CSS
                formRegistro.reset(); // Limpia los campos del formulario
            } else {
                // Si el servidor responde {'success': False}
                mensajeRespuesta.textContent = 'Error: ' + data.message;
                mensajeRespuesta.className = 'message error'; // Aplica estilo rojo del CSS
            }

        } catch (error) {
            console.error('Error en la petición:', error);
            mensajeRespuesta.textContent = 'Ocurrió un error al intentar conectar con el servidor.';
            mensajeRespuesta.className = 'message error';
        }
    });
});