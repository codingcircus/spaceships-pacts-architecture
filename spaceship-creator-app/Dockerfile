FROM node:10-slim

EXPOSE 3000
ENV VIRTUAL_HOST=admin.spaceships.site
ENV REACT_APP_SPACESHIPS_SERVICE=http://service.spaceships.site
WORKDIR /opt/spaceship-creator-app
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH
WORKDIR /opt/spaceship-creator-app/app
CMD ["npm", "start"]