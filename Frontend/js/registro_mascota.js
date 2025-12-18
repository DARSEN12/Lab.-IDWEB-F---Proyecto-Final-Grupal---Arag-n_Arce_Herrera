document.getElementById('registroMascotaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombreMascota = document.getElementById('nombreMascota').value;
    const tipoMascota = document.getElementById('tipoMascota').value;
    const correoDuenio = document.getElementById('correoDuenio').value;
    const contrasenaDuenio = document.getElementById('contrasenaDuenio').value;

    fetch('http://127.0.0.1:5000/registro_mascota', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombreMascota: nombreMascota,
            tipoMascota: tipoMascota,
            correoDuenio: correoDuenio,
            contrasenaDuenio: contrasenaDuenio,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registro de mascota exitoso.');
        } else {
            alert('Error en el registro de mascota: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

