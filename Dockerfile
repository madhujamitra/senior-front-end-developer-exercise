# Stage 1: Build the React app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
RUN chmod -R 755 /app/build

# Stage 2: Serve the build with a static server
FROM node:16 AS production
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
USER root
EXPOSE 5000
CMD ["serve", "-l", "5000", "build"]

# (Optional) Stage 3: Development
# Uncomment below to use for development
# FROM node:18 AS development
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"] 