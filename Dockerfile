FROM node:16.16-alpine
WORKDIR /download/docker_app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]