# Use official Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your code
COPY . .

# Expose port (same as your app)
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]