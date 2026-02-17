FROM node:20-slim
WORKDIR /app
RUN npm install -g supergateway @notionhq/notion-mcp-server
COPY wrapper.js .
EXPOSE 8080
CMD ["sh", "-c", "supergateway --stdio 'node wrapper.js' --outputTransport streamableHttp --stateful --port 8080"]
