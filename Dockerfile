FROM node:alpine
ENV NODE_ENV production

# deps for image optimisations
RUN apk add --no-cache \
    bash \
    lcms2-dev \
    libpng-dev \
    gcc \
    g++ \
    make \
    autoconf \
    automake

WORKDIR /usr/src/app
COPY . .

RUN NODE_ENV=development yarn
RUN yarn run build

EXPOSE 8080
CMD ["npm", "start"]
