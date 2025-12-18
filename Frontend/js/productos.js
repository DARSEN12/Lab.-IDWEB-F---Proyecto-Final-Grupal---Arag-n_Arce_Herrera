// Frontend/js/productos.js

document.addEventListener('DOMContentLoaded', function () {
    const productosGaleria = document.querySelector('.productos-galeria');

    // URL de tu Backend (Flask)
    const API_URL = 'http://127.0.0.1:5000/api/productos';

    // Función para obtener datos
    function cargarProductos() {
        // Mostramos un mensaje de carga mientras esperamos
        productosGaleria.innerHTML = '<p style="text-align:center; width:100%;">Cargando productos...</p>';

        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error de red o servidor no encontrado');
                }
                return response.json();
            })
            .then(productos => {
                renderizarProductos(productos);
            })
            .catch(error => {
                console.error('Error:', error);
                productosGaleria.innerHTML = `
                    <div style="text-align:center; width:100%; color: red;">
                        <h3>Error de conexión</h3>
                        <p>No se pudo conectar con el servidor (Python).</p>
                        <p>Verifica que "py app.py" esté ejecutándose.</p>
                    </div>
                `;
            });
    }

    // Función para dibujar los productos en el HTML
    function renderizarProductos(listaProductos) {
        productosGaleria.innerHTML = ''; // Limpiamos el mensaje de carga

        if (listaProductos.length === 0) {
            productosGaleria.innerHTML = '<p>No hay productos disponibles por el momento.</p>';
            return;
        }

        listaProductos.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('producto-card');

            // Validación por si la imagen viene vacía de la BD
            const rutaImagen = producto.imagen_ruta ? producto.imagen_ruta : 'images/default.jpg';
            
            // Convertimos el precio a número y le damos formato de 2 decimales
            const precioFormateado = parseFloat(producto.precio).toFixed(2);

            tarjeta.innerHTML = `
                <img src="${rutaImagen}" alt="${producto.nombre}" onerror="this.src='images/default.jpg'">
                <h4>${producto.nombre}</h4>
                <p>S/ ${precioFormateado}</p>
                <a href="#" class="btn-comprar">Comprar</a>
            `;

            productosGaleria.appendChild(tarjeta);
        });
    }

    // Ejecutamos la función al iniciar
    cargarProductos();
});