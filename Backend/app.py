from flask import Flask
from flask_cors import CORS
from routes import api_bp  # Importamos el Blueprint del archivo routes.py

app = Flask(__name__)

# Habilitamos CORS para que tu HTML pueda comunicarse con este servidor
CORS(app)

# Registramos las rutas
app.register_blueprint(api_bp)

if __name__ == '__main__':
    # El servidor correrá en el puerto 5000
    print("Iniciando servidor en http://127.0.0.1:5000")
    app.run(debug=True, port=5000)