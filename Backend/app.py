from flask import Flask
from flask_cors import CORS
from routes import api_bp
from db import init_db  # <--- Importamos la nueva función

app = Flask(__name__)

CORS(app)

app.register_blueprint(api_bp)

if __name__ == '__main__':
    # 1. Antes de iniciar, verificamos/creamos la BD
    print("Verificando base de datos...")
    init_db()

    # 2. Iniciamos el servidor
    print("Iniciando servidor en http://127.0.0.1:5000")
    app.run(debug=True, port=5000)