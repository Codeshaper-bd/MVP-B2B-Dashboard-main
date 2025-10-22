# syntax=docker.io/docker/dockerfile:1

# Use the latest Node.js Alpine base image
FROM node:23-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Enable pnpm via Corepack (required for latest Node.js versions)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package manager lock files
COPY package.json pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the preferred package manager
RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "No package manager lock file found!" && exit 1; \
  fi

# Build the Next.js application
FROM base AS builder
WORKDIR /app

# Ensure pnpm is available
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set IS_CI=true to enable output: "standalone"
ENV IS_CI=true
ENV NEXT_TELEMETRY_DISABLED=1

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN \
  if [ -f pnpm-lock.yaml ]; then pnpm run build; \
  elif [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  else echo "No lock file found for building!" && exit 1; \
  fi

# Production image, copy all the files and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Copy only necessary files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ensure correct permissions
RUN chmod -R 755 /app && chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the Next.js default port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]