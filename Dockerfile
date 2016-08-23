FROM ubuntu:15.04
MAINTAINER Oskar Niburski <oskarniburski@gmail.com>

# Install dependencies.
RUN apt-get update && apt-get install -y nodejs npm
RUN apt-get install nodejs-legacy 
# RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g bower \
  ember-cli

ENV APP_HOME /myapp
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD package* $APP_HOME/
ADD bower* $APP_HOME/
ADD .bower* $APP_HOME/
ADD .ember-cli $APP_HOME/
ADD .editorconfig $APP_HOME/
ADD .jshintrc $APP_HOME/
ADD .travis.yml $APP_HOME/
ADD .watchmanconfig $APP_HOME/
ADD testem.js $APP_HOME/
ADD ember-cli-build* $APP_HOME/
RUN echo '{ "allow_root": true }' > /myapp/.bowerrc

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