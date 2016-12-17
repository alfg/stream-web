FROM node:7.2-alpine

EXPOSE 3001

ENV YARN_VERSION 0.17.10
ENV NODE_ENV production

ADD . /opt/stream-api

RUN apk add --update ca-certificates gcc g++

# Install api-server.
RUN cd /opt/stream-api && \
    npm install --global yarn@${YARN_VERSION} && \
    yarn

# Install and build static frontend.
RUN cd /opt/stream-api/client && \
    npm install && \
    npm run build

# Cleanup.
RUN apk del gcc g++ && \
    rm -rf /var/cache/apk/*

WORKDIR /opt/stream-api
CMD ["npm", "run", "server"]
