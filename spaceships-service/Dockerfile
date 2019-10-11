FROM node:10-slim

EXPOSE 3000
ENV VIRTUAL_HOST=service.spaceships.site
WORKDIR /opt/spaceships-service
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH
WORKDIR /opt/spaceships-service/app
CMD ["npm", "start"]