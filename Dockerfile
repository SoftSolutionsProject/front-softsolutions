FROM node:20

WORKDIR /app

COPY . .
RUN npm ci

RUN npm install @angular/cli -g

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
