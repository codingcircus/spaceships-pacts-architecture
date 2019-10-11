FROM node:10-slim

EXPOSE 3000
ENV VIRTUAL_HOST=www.spaceships.site
ENV SPACESHIP_SERVICE=http://spaceships-service:3000
WORKDIR /opt/spaceships-viewer
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH
WORKDIR /opt/spaceships-viewer/app
CMD ["npm", "start"]