FROM node:18.18 AS build

ARG API_URL
ENV REACT_APP_API_URL=${API_URL}

RUN echo "API_URL is set to $API_URL"
RUN echo "REACT_APP_API_URL is set to $REACT_APP_API_URL"

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
