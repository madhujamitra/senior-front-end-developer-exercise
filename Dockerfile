# Build stage
FROM node:16-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code and build
COPY . .
RUN npm run build

# Production stage - serve with nginx
FROM nginx:alpine AS production

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Simple nginx config for React Router
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Development stage
FROM node:16-alpine AS development

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

EXPOSE 3001

CMD ["npm", "start"] 