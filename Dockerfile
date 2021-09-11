# Use base node 14.17.6 image from Docker hub
FROM node:14.17.6-alpine

WORKDIR /app

EXPOSE 3001

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm i

# Copy rest of the application csource code
COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
