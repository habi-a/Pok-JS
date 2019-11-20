FROM debian:10

RUN apt-get update -y
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm i npm@latest -g
COPY ./pokejs /app
WORKDIR /app
RUN npm i
EXPOSE 3000
CMD npm start
