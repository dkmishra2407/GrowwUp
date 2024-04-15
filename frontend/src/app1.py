from flask import Flask, jsonify, request
from flask_cors import CORS
from jugaad_data.nse import NSELive


app = Flask(__name__)
CORS(app)

# Create NSELive object outside the route function
n = NSELive()

@app.route('/<inputStock>', methods=['POST', 'GET'])
def get_stock_data(inputStock):
    q = n.stock_quote(inputStock)  # Use stockname parameter
    price_info = q['priceInfo']
    if request.method == 'GET':
        return jsonify(price_info)
    elif request.method == 'POST':
        # Log the received data to console
        app.logger.info(request.json)
        return jsonify(price_info)

if __name__ == '__main__':
    app.run(debug=True, port=8000)