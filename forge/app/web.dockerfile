# ======================= BUILD ============================
FROM node:lts AS build

# Установите ваш проект React Native
WORKDIR /app
COPY package.json package-lock.json ./
COPY ./scripts /app/scripts
RUN npm install

# Copy other files
COPY . .

ARG API_HOST

# build
RUN npx expo export:web

# ======================= DEPLOY =========================
FROM nginx:alpine

# Copy config
COPY ./nginx.conf /etc/nginx/conf.d

# Copy error pages
COPY ./public/50x.html /usr/share/nginx/html
COPY ./public/404.html /usr/share/nginx/html

COPY --from=build /app/web-build/ /usr/share/nginx/html