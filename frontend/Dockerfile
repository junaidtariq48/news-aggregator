FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies and build
RUN npm install
RUN npm run build

# Start development server (use "start" for production)
CMD ["npm", "start"]
