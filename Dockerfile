FROM node:16.14-alpine as builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .
RUN yarn install && yarn build


FROM node:16.14-alpine as runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN yarn install --production
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/shared.config.js .
COPY --from=builder /app/package.json .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 80
ENTRYPOINT ["yarn", "start"]
