FROM node:20-slim
WORKDIR /app
COPY wrapper.js .
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "npx -y supergateway --stdio 'node wrapper.js' --outputTransport streamableHttp --stateful --port ${PORT}"]
