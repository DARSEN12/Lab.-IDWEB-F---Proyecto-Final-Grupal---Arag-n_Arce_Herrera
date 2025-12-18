document.addEventListener('DOMContentLoaded', () => {
    
    // --- VARIABLES Y ELEMENTOS ---
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');
    const contenedorMascotas = document.getElementById('contenedorMascotas');

    // --- CARGAR MASCOTAS AL INICIAR ---
    cargarMascotas();

    // --- EVENTO: REGISTRAR MASCOTA ---
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datosAEnviar = {
            nombreMascota: document.getElementById('nombreMascota').value,
            tipoMascota: document.getElementById('tipoMascota').value,
            correoDuenio: document.getElementById('correoDuenio').value,
            contrasenaDuenio: document.getElementById('contrasenaDuenio').value
        };

        try {
            const respuesta = await fetch('/registro_mascota', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosAEnviar)
            });
            const data = await respuesta.json();

            if (data.success) {
                mensajeRespuesta.textContent = '¡Éxito! ' + data.message;
                mensajeRespuesta.className = 'message success';
                formRegistro.reset();
                
                // IMPORTANTE: Recargamos la lista para que aparezca la nueva mascota
                cargarMascotas(); 
            } else {
                mensajeRespuesta.textContent = 'Error: ' + data.message;
                mensajeRespuesta.className = 'message error';
            }
        } catch (error) {
            console.error('Error:', error);
            mensajeRespuesta.textContent = 'Error de conexión.';
            mensajeRespuesta.className = 'message error';
        }
    });

    // --- FUNCIÓN: OBTENER Y PINTAR MASCOTAS ---
    async function cargarMascotas() {
        try {
            const respuesta = await fetch('/obtener_mascotas');
            const data = await respuesta.json();

            if (data.success) {
                // Limpiamos el contenedor antes de agregar nada
                contenedorMascotas.innerHTML = '';

                // Recorremos la lista de mascotas
                data.mascotas.forEach(mascota => {
                    crearTarjetaMascota(mascota);
                });
            } else {
                contenedorMascotas.innerHTML = '<p>No se pudieron cargar las mascotas.</p>';
            }
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    }

    // --- FUNCIÓN AUXILIAR: CREAR HTML DE LA TARJETA ---
    function crearTarjetaMascota(mascota) {
        // Asignamos una imagen genérica según el tipo
        let imagenUrl = '';
        if (mascota.tipo === 'Perro') {
            imagenUrl = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop';
        } else if (mascota.tipo === 'Gato') {
            imagenUrl = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop';
        } else {
            imagenUrl = 'https://images.unsplash.com/photo-1596765792723-5d674b0d0232?q=80&w=1000'; // Imagen genérica (hamster/conejo)
        }

        // Creamos el HTML
        const cardHTML = `
            <div class="pet-card">
                <img src="${imagenUrl}" alt="${mascota.tipo}">
                <div class="card-info">
                    <h3>${mascota.nombre}</h3>
                    <p class="breed">${mascota.tipo} - Registrado recientemente</p>
                    <p class="description">Esta mascota está buscando un hogar amoroso.</p>
                    <button class="adopt-btn">Conocer a ${mascota.nombre}</button>
                </div>
            </div>
        `;

        // Insertamos el HTML en el contenedor
        contenedorMascotas.innerHTML += cardHTML;
    }
});