FROM node:18.18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18.18 AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/.svelte-kit /app/.svelte-kit

EXPOSE 3000

CMD ["serve", "-s", "/app/.svelte-kit", "-l", "3000"]
