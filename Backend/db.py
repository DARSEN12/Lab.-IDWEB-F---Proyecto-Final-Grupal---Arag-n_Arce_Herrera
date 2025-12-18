import mysql.connector

# Configuración base (sin nombre de DB para la conexión inicial)
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': ''
}

DB_NAME = 'veterinaria_db'

def init_db():
    """Crea la base de datos y las tablas si no existen."""
    try:
        # 1. Conexión al servidor MySQL (sin seleccionar DB aún)
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()

        # 2. Crear la Base de Datos
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        print(f"Base de datos '{DB_NAME}' verificada/creada.")

        # 3. Seleccionar la Base de Datos
        cursor.execute(f"USE {DB_NAME}")

        # 4. Crear Tablas (Basado en las columnas que usas en routes.py)
        
        # Tabla: USUARIOS
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(100),
                telefono VARCHAR(20)
            )
        """)

        # Tabla: MASCOTAS
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS mascotas (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                tipo VARCHAR(50),
                correo_duenio VARCHAR(100),
                contrasena_duenio VARCHAR(100)
            )
        """)

        # Tabla: MENSAJES_CONTACTO
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS mensajes_contacto (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                correo VARCHAR(100),
                mensaje TEXT
            )
        """)

        # Tabla: PRODUCTOS 
        # (He puesto columnas genéricas, ajusta según lo que necesites mostrar en tu tienda)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100),
                precio DECIMAL(10, 2),
                descripcion TEXT,
                imagen VARCHAR(255)
            )
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("Tablas verificadas correctamente.")

    except mysql.connector.Error as err:
        print(f"Error inicializando la base de datos: {err}")

def get_db_connection():
    """Obtiene la conexión a la base de datos ya existente."""
    try:
        connection = mysql.connector.connect(
            host=DB_CONFIG['host'],
            user=DB_CONFIG['user'],
            password=DB_CONFIG['password'],
            database=DB_NAME
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error de conexión: {err}")
        return None