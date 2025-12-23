FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
ENV CI=true
# Install all dependencies (including dev)
RUN pnpm install --frozen-lockfile
# Generate prisma client
RUN pnpm --filter @project-valkyrie/backend exec prisma generate
# Build the application
RUN pnpm --filter @project-valkyrie/backend build
# Create a pruned deployment package with production dependencies
RUN pnpm --filter @project-valkyrie/backend --prod deploy /prod/backend

FROM base AS runner
WORKDIR /app
# Copy the pruned dependencies and package.json from the deploy step
COPY --from=builder /prod/backend ./
# Copy the built application
COPY --from=builder /app/apps/backend/dist ./dist
# Copy prisma schema if needed (usually client is enough, but for safety)
# COPY --from=builder /app/apps/backend/prisma ./prisma

ENV NODE_ENV=production
CMD ["node", "dist/main"]