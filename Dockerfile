FROM node:20.12.0

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (if exists) to leverage Docker caching
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN npm run build


# Copy app code and SSL certificates
COPY . .
COPY ssl/server.crt /app/server.crt
COPY ssl/server.key /app/server.key


# Expose the application port
EXPOSE 5000

# Start the app using the built JavaScript files
CMD ["npm","run","start"]


