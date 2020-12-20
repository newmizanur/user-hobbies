FROM node:carbon
# App directory
WORKDIR /app

# App dependencies
COPY package*.json ./
RUN npm i

# Copy app source code
COPY . .

# Env setup
COPY .env.example_docker /app/.env

#Expose port and begin application
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "start:dev"]