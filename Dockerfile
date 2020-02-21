FROM node:12
RUN node -v

WORKDIR /usr/src/app
COPY . .

RUN yarn
RUN yarn run build

EXPOSE 8080
CMD ["npm", "start"]
