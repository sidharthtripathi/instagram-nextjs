FROM node:lts-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY package* .
RUN npm i
COPY . .
RUN npx prisma generate
RUN npm run build
CMD npx prisma db push && npm run start
