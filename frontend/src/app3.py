from flask import Flask, jsonify
from flask_cors import CORS
from jugaad_data.nse import NSELive

n = NSELive()

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_stock_data():
    try:
        status = n.market_status()
        json_data = status['marketState']

        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8002)
