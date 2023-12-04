FROM node:20
# Create app directory
WORKDIR /home/app
# Only copy the package files to work directory
COPY package*.json ./
# Install all Packages
RUN npm install
# Copy all other files to work directory
COPY . .
# Expose port 4000
EXPOSE 4000
# Start dev mode
CMD [ "npm", "run", "start:dev" ]
