from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

app = Flask(__name__)

# Load and preprocess the data
df = pd.read_csv('nse_all_stock_data (1).csv')  # Replace with your dataset path

# Function to preprocess data
def preprocess_data(stock_name, sequence_length=60):
    stock_data = df[stock_name].dropna().values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(stock_data)

    X, y = [], []
    for i in range(sequence_length, len(scaled_data)):
        X.append(scaled_data[i-sequence_length:i, 0])
        y.append(scaled_data[i, 0])

    X, y = np.array(X), np.array(y)
    X = X.reshape(X.shape[0], X.shape[1], 1)
    return X, y, scaler

# Function to build and train the model
def build_and_train_model(X_train, y_train):
    model = Sequential([
        LSTM(50, return_sequences=True, input_shape=(X_train.shape[1], 1)),
        Dropout(0.2),
        LSTM(50, return_sequences=False),
        Dropout(0.2),
        Dense(25),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X_train, y_train, batch_size=32, epochs=10, verbose=0)
    return model

# API endpoint for stock prediction
@app.route('/predict', methods=['GET'])
def predict_stock():
    stock_name = request.args.get('stock')
    if stock_name not in df.columns:
        return jsonify({"error": f"Stock {stock_name} not found in dataset."}), 400

    # Preprocess the data
    sequence_length = 60
    X, y, scaler = preprocess_data(stock_name, sequence_length)

    # Split data into training and testing sets
    train_size = int(len(X) * 0.8)
    X_train, y_train = X[:train_size], y[:train_size]
    X_test, y_test = X[train_size:], y[train_size:]

    # Train the model
    model = build_and_train_model(X_train, y_train)

    # Predict the next day's price
    last_sequence = X[-1].reshape(1, sequence_length, 1)
    prediction = model.predict(last_sequence)
    prediction_price = scaler.inverse_transform(prediction)[0, 0]

    return jsonify({
        "stock": stock_name,
        "predicted_price": float(prediction_price)
    })

if __name__ == '__main__':
    app.run(debug=True)
