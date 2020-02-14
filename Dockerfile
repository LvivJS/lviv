FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN gulp
EXPOSE 8080
CMD ["npm", "start"]
