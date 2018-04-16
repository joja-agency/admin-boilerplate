FROM node:6.7.0

# Create app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app
RUN npm install

RUN npm run build-server

# Bundle app source
# COPY . /usr/src/app

EXPOSE 8031

CMD npm run start-server