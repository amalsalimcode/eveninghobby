# Use the official Node.js image as a base image
FROM node:16.13.2-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . ./

# Expose port 3000 to the outside world
EXPOSE 80

# Command to run the React development server
CMD ["npm", "start"]

