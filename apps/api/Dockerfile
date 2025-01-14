# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="api"

WORKDIR /src

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

WORKDIR /src

# Install node modules
COPY package*.json ./

RUN npm install --include=dev

# Install TypeScript
RUN npm install -g typescript

# Copy application code
COPY --link . .

# Build application
RUN npm run build

FROM base

COPY --from=build /src /src

EXPOSE 4000

CMD [ "npm", "run", "start" ]
