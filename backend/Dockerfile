# Usar imagen oficial de Node.js LTS
FROM node:18-alpine

# Metadata
LABEL maintainer="tu-email@ejemplo.com"
LABEL description="RecuérdaMe - Sistema de recordatorios de medicamentos"
LABEL version="1.0.0"

# Instalar dumb-init para manejo de señales
RUN apk add --no-cache dumb-init

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear directorio para uploads y asignar permisos
RUN mkdir -p uploads && chown -R nodejs:nodejs uploads

# Cambiar al usuario no-root
USER nodejs

# Exponer puerto
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Comando para iniciar la aplicación
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]