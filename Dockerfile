FROM node:5.11
MAINTAINER Kukua Team <dev@kukua.cc>

WORKDIR /data
COPY ./ /data/
RUN npm install -g grunt-cli bower
RUN npm install
RUN grunt build
RUN npm prune --production

EXPOSE 8080

CMD npm start
