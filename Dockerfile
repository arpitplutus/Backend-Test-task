# Use the official Node.js image as base image
FROM node:18-alpine

# Set the working directory in the container
# Set the working directory in the container
WORKDIR /Backend-Test-Task/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force 

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start:prod"]