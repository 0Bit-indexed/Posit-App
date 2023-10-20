FROM node:18

WORKDIR /app/social-graph

COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "dev" ]; \ 
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .

ENV PORT 3002

EXPOSE $PORT

CMD ["npm", "run", "dev"]
