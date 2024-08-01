from flask import Flask, jsonify,make_response
from flask_cors import CORS
from jugaad_data.nse import NSELive
from datetime import date
from jugaad_data.nse import stock_df

import pandas as pd
import nselib

n = NSELive()

app = Flask(__name__)
CORS(app)

@app.route('/')
def get_market_status():
    try:
        status = n.market_status()
        json_data = status['marketState']

        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/details')
def get_indices_details():
    try:
        all_indices = n.all_indices()
        details_data = all_indices['data'][0]

        return jsonify(details_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/holidaydata')
def get_stock_data():
    try:
        data = nselib.trading_holiday_calendar()
        # Convert DataFrame to JSON-serializable format
        json_data = data.to_dict(orient='records')
        return jsonify(json_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8002)
