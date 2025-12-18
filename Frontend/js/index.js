// Frontend/js/index.js

document.addEventListener('DOMContentLoaded', function () {
    
    // --- 1. LÓGICA DEL SLIDER PRINCIPAL (Fondo) ---
    let slideIndex = 1;
    showSlides(slideIndex);

    // Exponemos la función al objeto window para que los botones onclick del HTML la encuentren
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (slides.length === 0) return; // Evita errores si no hay slides

        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    }

    // --- 2. LÓGICA DEL CARRUSEL DE PRODUCTOS ---
    let productIndex = 0;
    const carouselInner = document.querySelector('.carousel-inner');
    const productItems = document.querySelectorAll('.producto-item');
    const totalProducts = productItems.length;

    function moveCarousel() {
        if (totalProducts > 2 && carouselInner) { // Solo si hay suficientes productos
            productIndex = (productIndex + 1) % (totalProducts - 2); 
            const offset = -productIndex * 33.33;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    }
    // Cambia productos automáticamente cada 3 segundos
    setInterval(moveCarousel, 3000);


    // --- 3. LÓGICA DE MODALES (Abrir/Cerrar) ---
    const regModal = document.getElementById("registerModal");
    const loginModal = document.getElementById("loginModal");
    const regBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const closeReg = document.getElementById("closeRegister");
    const closeLog = document.getElementById("closeLogin");

    // Abrir
    if(regBtn) regBtn.onclick = () => regModal.style.display = "flex";
    if(loginBtn) loginBtn.onclick = () => loginModal.style.display = "flex";

    // Cerrar (X)
    if(closeReg) closeReg.onclick = () => regModal.style.display = "none";
    if(closeLog) closeLog.onclick = () => loginModal.style.display = "none";

    // Cerrar si clic fuera del cuadro
    window.onclick = function(event) {
        if (event.target == regModal) regModal.style.display = "none";
        if (event.target == loginModal) loginModal.style.display = "none";
    }


    // --- 4. CONEXIÓN CON BACKEND (Registro) ---
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página se recargue

            // Recolectar datos del formulario
            const formData = new FormData();
            formData.append('nombre', document.getElementById('regNombre').value);
            formData.append('email', document.getElementById('regEmail').value);
            formData.append('password', document.getElementById('regPassword').value);
            formData.append('telefono', document.getElementById('regTelefono').value);

            // Enviar a Python (Flask)
            fetch('http://127.0.0.1:5000/registro_usuario', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('¡Usuario registrado con éxito!');
                    regModal.style.display = "none";
                    registroForm.reset(); // Limpia los campos
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al conectar con el servidor. Revisa si "py app.py" está corriendo.');
            });
        });
    }

    // --- 5. MENÚ MÓVIL ---
    const menuToggle = document.getElementById('menuToggle');
    const menuArriba = document.querySelector('.menudearriba');
    
    if (menuToggle && menuArriba) {
        menuToggle.onclick = function() {
            menuArriba.style.display = (menuArriba.style.display === 'flex') ? 'none' : 'flex';
        }
    }
});