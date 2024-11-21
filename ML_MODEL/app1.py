from flask import Flask, jsonify, request
from flask_cors import CORS
from jugaad_data.nse import NSELive
import nselib

# Create NSELive object outside route functions to avoid re-initialization
n = NSELive()

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins="http://localhost:5001")

# Route to get the market status
@app.route('/market-status', methods=['GET'])
def get_market_status():
    try:
        status = n.market_status()
        json_data = status.get('marketState', [])
        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get details of all indices
@app.route('/details', methods=['GET'])
def get_indices_details():
    try:
        all_indices = n.all_indices()
        details_data = all_indices.get('data', [])
        return jsonify(details_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get trading holiday calendar data
@app.route('/holidaydata', methods=['GET'])
def get_holiday_data():
    try:
        data = nselib.trading_holiday_calendar()
        # Convert DataFrame to JSON-serializable format
        json_data = data.to_dict(orient='records') if hasattr(data, "to_dict") else []
        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to get stock data by stock name (GET)
@app.route('/stock', methods=['GET'])
def get_stock_data():
    input_stock = request.args.get('stock', '').strip()  # Get stock from query parameter
    if not input_stock:
        return jsonify({'error': 'Stock name is required'}), 400
    try:
        q = n.stock_quote(input_stock)  # Use the input_stock from query
        if not q:
            return jsonify({'error': 'No data received for the stock'}), 400

        price_info = q.get('priceInfo', {})
        if not price_info:
            return jsonify({'error': 'Price information not available'}), 400

        return jsonify(price_info)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=9000)
