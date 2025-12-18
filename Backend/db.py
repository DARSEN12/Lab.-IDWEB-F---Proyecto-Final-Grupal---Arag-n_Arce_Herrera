import mysql.connector

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',       # Usuario por defecto de XAMPP
            password='',       # Contraseña por defecto de XAMPP (vacía)
            database='veterinaria_db'
        )
        return connection
    except mysql.connector.Error as err:
        print(f"Error de conexión: {err}")
        return None