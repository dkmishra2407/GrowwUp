# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from jugaad_data.nse import NSELive


# app = Flask(__name__)
# CORS(app)

# # Create NSELive object outside the route function
# n = NSELive()

# @app.route('/<inputStock>', methods=['POST', 'GET'])
# def get_stock_data(inputStock):
#     q = n.stock_quote(inputStock)  # Use stockname parameter
#     price_info = q['priceInfo']
#     if request.method == 'GET':
#         return jsonify(price_info)
#     elif request.method == 'POST':
#         # Log the received data to console
#         app.logger.info(request.json)
#         return jsonify(price_info)

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)

# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from jugaad_data.nse import NSELive

# app = Flask(__name__)
# CORS(app)

# # Create NSELive object outside the route function
# n = NSELive()

# @app.route('/<inputStock>', methods=['POST', 'GET'])
# def get_stock_data(inputStock):
#     if inputStock.strip():  # Check if inputStock is not empty or contains only spaces
#         q = n.stock_quote(inputStock)  # Use stockname parameter
#         price_info = q['priceInfo']
#         if request.method == 'GET':
#             return jsonify(price_info)
#         elif request.method == 'POST':
#             # Log the received data to console
#             app.logger.info(request.json)
#             return jsonify(price_info)
#     else:
#         return jsonify({'error': 'Stock name is required'}), 400

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)


# from flask import Flask, jsonify, request
# from flask_cors import CORS
# from jugaad_data.nse import NSELive

# app = Flask(__name__)
# CORS(app)

# # Create NSELive object outside the route function
# n = NSELive()
# default_stock = "IRCTC"

# @app.route('/<inputStock>', methods=['POST', 'GET'])
# def get_stock_data(inputStock):
#     if not inputStock.strip():  # Check if inputStock is empty or contains only spaces
#         inputStock = default_stock  # Use default stock if no input is provided

#     q = n.stock_quote(inputStock)  # Use stockname parameter
#     price_info = q['priceInfo']
    
#     if request.method == 'GET':
#         return jsonify(price_info)
#     elif request.method == 'POST':
#         # Log the received data to console
#         app.logger.info(request.json)
#         return jsonify(price_info)

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)


from flask import Flask, jsonify, request
from flask_cors import CORS
from jugaad_data.nse import NSELive

app = Flask(__name__)
CORS(app)

# Create NSELive object outside the route function
n = NSELive()

@app.route('/<inputStock>', methods=['POST', 'GET'])
def get_stock_data(inputStock):
    if inputStock.strip():  # Check if inputStock is not empty or contains only spaces
        q = n.stock_quote(inputStock)  # Use stockname parameter
        try:
            price_info = q['priceInfo']
        except KeyError:
            return jsonify({'error': 'Invalid stock name or data not available'}), 400
        
        if request.method == 'GET':
            return jsonify(price_info)
        elif request.method == 'POST':
            # Log the received data to console
            app.logger.info(request.json)
            return jsonify(price_info)
    else:
        return jsonify({'error': 'Stock name is required'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000)
