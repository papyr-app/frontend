FROM node:18.18 AS build

ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL=${BACKEND_URL}}

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18.18 AS production

RUN npm install -g serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "/app/build", "-l", "3000"]
