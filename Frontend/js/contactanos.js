document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const msgExito = document.getElementById("msg-exito");

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

    msgExito.style.color = "green";
    msgExito.textContent = "Nos contactaremos contigo lo más pronto posible";

    // limpiar campos
    document.getElementById("contactForm").reset();
});