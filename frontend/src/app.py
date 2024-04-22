# from flask import Flask, jsonify
# from flask_cors import CORS
# import pandas as pd
# import nselib

# app = Flask(__name__)
# CORS(app)

# @app.route('/')
# def get_stock_data():
#     try:
#         data = nselib.trading_holiday_calendar()
#         # Convert DataFrame to JSON-serializable format
#         json_data = data.to_dict(orient='records')
#         return jsonify(json_data)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=8001)