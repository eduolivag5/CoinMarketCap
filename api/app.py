from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS  # Importa Flask-CORS

# Cargar las variables de entorno desde un archivo .env
load_dotenv()

app = Flask(__name__)

# Habilitar CORS para todos los orígenes
CORS(app)

# O si prefieres configurarlo solo para ciertos orígenes, puedes hacer algo como:
# CORS(app, origins=["https://tudominio.com", "https://otro-dominio.com"])

# Obtener la clave API de CoinMarketCap desde las variables de entorno
COINMARKETCAP_API_KEY = os.getenv("COINMARKETCAP_API_KEY")

# Función genérica para realizar solicitudes a la API
def fetch_from_coinmarketcap(url, params=None):
    headers = {
        "Accepts": "application/json",
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    }
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}


# Endpoint básico para obtener las criptomonedas más recientes
@app.route("/listings", methods=["GET"])
def get_cryptos():
    params = {
        "start": request.args.get("start", 1),
        "limit": request.args.get("limit", 100),
        "convert": request.args.get("convert", "USD"),
    }
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", params)
    return jsonify(data)


# Endpoint para obtener información de una criptomoneda por ID
@app.route("/crypto/info/id", methods=["GET"])
def get_crypto_info_by_id():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "El parámetro 'id' es obligatorio"}), 400
    params = {"id": id_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v2/cryptocurrency/info", params)
    return jsonify(data)


# Endpoint para obtener información de precios de una criptomoneda por ID
@app.route("/crypto/quotes/id", methods=["GET"])
def get_crypto_info_quotes_by_id():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "El parámetro 'id' es obligatorio"}), 400
    params = {"id": id_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest", params)
    return jsonify(data)


# Endpoint para obtener información de una criptomoneda por símbolo
@app.route("/crypto/info/symbol", methods=["GET"])
def get_crypto_info_by_symbol():
    symbol_param = request.args.get("symbol")
    if not symbol_param:
        return jsonify({"error": "El parámetro 'symbol' es obligatorio"}), 400
    params = {"symbol": symbol_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v2/cryptocurrency/info", params)
    return jsonify(data)


# Endpoint para obtener las categorías de criptomonedas
@app.route("/categories", methods=["GET"])
def get_crypto_categories():
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories")
    return jsonify(data)


# Endpoint para obtener información de una categoria
@app.route("/categories/details", methods=["GET"])
def get_category_info():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "El parámetro 'id' es obligatorio"}), 400
    params = {"id": id_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/cryptocurrency/category", params)
    return jsonify(data)


# Endpoint para obtener información de un exchange por slug
@app.route("/exchange/info", methods=["GET"])
def get_exchange_info():
    slug_param = request.args.get("slug")
    if not slug_param:
        return jsonify({"error": "El parámetro 'slug' es obligatorio"}), 400
    params = {"slug": slug_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/exchange/info", params)
    return jsonify(data)


# Endpoint para obtener los activos de un exchange por ID
@app.route("/exchange/assets", methods=["GET"])
def get_exchange_assets():
    id_param = request.args.get("id")
    if not id_param:
        return jsonify({"error": "El parámetro 'id' es obligatorio"}), 400
    params = {"id": id_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/exchange/assets", params)
    return jsonify(data)


# Endpoint para mapear criptomonedas por símbolo
@app.route("/crypto/map", methods=["GET"])
def get_crypto_map():
    symbol_param = request.args.get("symbol")
    if not symbol_param:
        return jsonify({"error": "El parámetro 'symbol' es obligatorio"}), 400
    params = {"listing_status": "active", "symbol": symbol_param}
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/cryptocurrency/map", params)
    return jsonify(data)


# Endpoint para obtener el Fear And Greed Index
@app.route("/fear-and-greed", methods=["GET"])
def get_fear_and_greed_index():
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest")
    return jsonify(data)


# Endpoint para obtener el Fear And Greed Index
@app.route("/global-metrics", methods=["GET"])
def get_global_metrics():
    data = fetch_from_coinmarketcap("https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest")
    return jsonify(data)


# Manejar excepciones
@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({"error": "Ocurrió un error en el servidor"}), 500

if __name__ == "__main__":
    # Usar Gunicorn para producción (sin debug)
    app.run(debug=False, host="0.0.0.0", port=5000)
