FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
