FROM node:20-slim
WORKDIR /app
COPY wrapper.js .
CMD npx -y supergateway --stdio "node wrapper.js" --outputTransport streamableHttp --stateful --port 8080
