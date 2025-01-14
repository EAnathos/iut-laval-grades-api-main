# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="api"

# NestJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

WORKDIR /app

# Copy only package.json and package-lock.json first
COPY ./package.json ./

# Install node modules
RUN npm install --include=dev

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build application
RUN npm run build

FROM base

WORKDIR /app

# Copy build output and node_modules from build stage
COPY --from=build /app /app

EXPOSE 4000

CMD [ "npm", "run", "start" ]
