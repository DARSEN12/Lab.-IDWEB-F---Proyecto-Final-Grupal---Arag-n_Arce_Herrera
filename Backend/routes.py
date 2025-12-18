from flask import Blueprint, request, jsonify
from db import get_db_connection

# Creamos un "Blueprint" general para todas las rutas
api_bp = Blueprint('api', __name__)

# --- RUTA 1: PRODUCTOS (Para mostrar en la tienda) ---
@api_bp.route('/api/productos', methods=['GET'])
def obtener_productos():
    conn = get_db_connection()
    productos = []
    if conn:
        try:
            # dictionary=True devuelve los datos como JSON {clave: valor}
            cursor = conn.cursor(dictionary=True) 
            cursor.execute("SELECT * FROM productos")
            productos = cursor.fetchall()
            cursor.close()
            conn.close()
        except Exception as e:
            print(f"Error SQL: {e}")
    return jsonify(productos)

# --- RUTA 2: REGISTRO DE MASCOTAS ---
@api_bp.route('/registro_mascota', methods=['POST'])
def registrar_mascota():
    data = request.json
    
    nombre = data.get('nombreMascota')
    tipo = data.get('tipoMascota')
    correo = data.get('correoDuenio')
    contrasena = data.get('contrasenaDuenio')

    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO mascotas (nombre, tipo, correo_duenio, contrasena_duenio) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (nombre, tipo, correo, contrasena))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'success': True, 'message': 'Mascota registrada correctamente'})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    return jsonify({'success': False, 'message': 'Error de conexión'}), 500

# --- RUTA 3: REGISTRO DE USUARIOS ---
@api_bp.route('/registro_usuario', methods=['POST'])
def registrar_usuario():
    # Usamos request.form porque enviamos FormData desde JS
    nombre = request.form.get('nombre') 
    email = request.form.get('email')
    password = request.form.get('password')
    telefono = request.form.get('telefono')

    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO usuarios (nombre, email, password, telefono) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (nombre, email, password, telefono))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'success': True, 'message': 'Usuario registrado'})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    return jsonify({'success': False, 'message': 'Error de conexión'}), 500

# --- RUTA 4: CONTACTO ---
@api_bp.route('/api/contacto', methods=['POST'])
def recibir_contacto():
    data = request.json
    
    nombre = data.get('nombre')
    correo = data.get('correo')
    mensaje = data.get('mensaje')

    if not nombre or not correo:
        return jsonify({'success': False, 'message': 'Faltan datos'}), 400

    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        try:
            query = "INSERT INTO mensajes_contacto (nombre, correo, mensaje) VALUES (%s, %s, %s)"
            cursor.execute(query, (nombre, correo, mensaje))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({'success': True, 'message': 'Mensaje recibido'})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    return jsonify({'success': False, 'message': 'Error de conexión'}), 500

    # --- RUTA 5: OBTENER LISTA DE MASCOTAS ---
@api_bp.route('/obtener_mascotas', methods=['GET'])
def obtener_mascotas():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor() # Si usas 'dictionary=True' es mejor, pero lo haré estándar
        try:
            # Seleccionamos nombre y tipo. (Asumo que tienes un ID autoincremental, si no, ajusta el select)
            # El orden del SELECT es importante si no usas diccionario
            query = "SELECT nombre, tipo FROM mascotas ORDER BY id DESC" 
            cursor.execute(query)
            datos = cursor.fetchall()
            
            # Convertimos la respuesta (que suele ser una tupla) a una lista de diccionarios
            # Ajusta los índices [0], [1] según el orden de tus columnas en la BD
            lista_mascotas = []
            for fila in datos:
                mascota = {
                    'nombre': fila[0],
                    'tipo': fila[1]
                }
                lista_mascotas.append(mascota)

            cursor.close()
            conn.close()
            return jsonify({'success': True, 'mascotas': lista_mascotas})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500
    return jsonify({'success': False, 'message': 'Error de conexión'}), 500