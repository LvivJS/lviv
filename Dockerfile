FROM node:alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npx gulp
EXPOSE 8080
CMD ["npm", "start"]
