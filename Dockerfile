FROM node:18.18 AS build

ARG BACKEND_URL 
ENV PUBLIC_BACKEND_URL=${BACKEND_URL}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18.18 AS production

WORKDIR /app

COPY --from=build /app ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "build"]
