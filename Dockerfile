# Use the official Node.js 18 image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Build the Vite React frontend
RUN npm run build

# Expose the port your Express server runs on
EXPOSE 3001

# Start the Express backend
CMD ["npm", "start"]
