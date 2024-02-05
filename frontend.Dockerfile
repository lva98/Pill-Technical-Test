FROM node:20-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY ./frontend /app
RUN pnpm install
EXPOSE 5173
CMD ["pnpm", "dev"]
