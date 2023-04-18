FROM node:14.18.2-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV AWS_DEFAULT_REGION=eu-central-1
EXPOSE 8000
CMD ["npm", "start"]