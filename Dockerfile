# Use a Node.js image
FROM node:20 AS builder

# Set working directory for backend
WORKDIR /usr/src/app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ .

# Set working directory for frontend
WORKDIR /usr/src/app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install
RUN npm run build # Assuming you use a build command for your frontend (e.g., React, Angular)

# Production stage
FROM node:20

# Set working directory for the backend
WORKDIR /usr/src/app/backend

# Copy backend files from builder stage
COPY --from=builder /usr/src/app/backend ./

# Copy frontend build files to the backend public folder (or appropriate location)
COPY --from=builder /usr/src/app/frontend/build ./public

# Expose the backend port
EXPOSE 3000

# Start the backend server
CMD ["node", "server.js"]
