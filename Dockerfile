FROM ubuntu:15.04
MAINTAINER Oskar Niburski <oskarniburski@gmail.com>

# Install dependencies.
RUN apt-get update && apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g bower \
  ember-cli

VOLUME /code
WORKDIR /code

RUN npm install
RUN bower install
RUN ember build
# RUN bower install

# ADD app /opt/ember-app
# VOLUME /opt/ember-app
# WORKDIR /opt/ember-app

#install npm packages
# RUN ember build

EXPOSE 4200

CMD ["ember", "server"]