# =====================================================
# DOCKERFILE PARA BACKEND RECUERDAME
# =====================================================
# Multi-stage build para optimizar tamaño de imagen

# =====================================================
# STAGE 1: BUILD DEPENDENCIES
# =====================================================
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluyendo devDependencies para build)
RUN npm ci --include=dev

# Copiar código fuente
COPY . .

# Ejecutar linting y tests (opcional en build)
# RUN npm run lint
# RUN npm test

# =====================================================
# STAGE 2: PRODUCTION IMAGE
# =====================================================
FROM node:18-alpine AS production

# Información del mantenedor
LABEL maintainer="Franco Tastaca <franco.tastaca@ejemplo.com>"
LABEL description="Backend API para sistema de gestión de medicamentos Recuerdame"
LABEL version="1.0.0"

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# Copiar código fuente desde builder
COPY --from=builder --chown=nodejs:nodejs /app/src ./src

# Crear directorios necesarios
RUN mkdir -p uploads logs && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

# Comando por defecto
CMD ["npm", "start"]

# =====================================================
# DESARROLLO: Usar con docker-compose para desarrollo
# =====================================================
# Para desarrollo, usar:
# docker build --target development -t recuerdame-backend:dev .

FROM node:18-alpine AS development

WORKDIR /app

# Instalar herramientas de desarrollo adicionales
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci

COPY . .

# Exponer puerto para desarrollo
EXPOSE 3000

# Comando para desarrollo (con nodemon)
CMD ["npm", "run", "dev"]