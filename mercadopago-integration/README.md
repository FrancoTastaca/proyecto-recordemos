# 💳 Integración MercadoPago API

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MercadoPago](https://img.shields.io/badge/MercadoPago-00B1EA?style=for-the-badge&logo=mercadopago&logoColor=white)](https://www.mercadopago.com.ar)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

## 📋 Descripción

Proyecto dedicado a la integración completa con la API de MercadoPago, implementando diferentes métodos de pago, webhooks, y manejo de suscripciones para el sistema RecuérdaMe.

### ✨ Funcionalidades Implementadas

- 💳 **Pagos únicos**: Checkout Pro y API
- 🔄 **Suscripciones**: Planes recurrentes para usuarios premium
- 🔔 **Webhooks**: Notificaciones en tiempo real de cambios de estado
- 📊 **Dashboard**: Panel de administración de pagos
- 🛡️ **Seguridad**: Validación de firmas y tokens
- 📱 **Responsive**: Compatible con dispositivos móviles

## 🏗️ Arquitectura

```
mercadopago-integration/
├── src/
│   ├── controllers/          # Lógica de pagos
│   │   ├── payments.controller.js
│   │   ├── subscriptions.controller.js
│   │   └── webhooks.controller.js
│   ├── services/            # Servicios de MercadoPago
│   │   ├── mercadopago.service.js
│   │   └── subscription.service.js
│   ├── models/              # Modelos de datos
│   │   ├── payment.model.js
│   │   └── subscription.model.js
│   ├── routes/              # Rutas de API
│   │   ├── payments.routes.js
│   │   └── webhooks.routes.js
│   ├── middlewares/         # Validaciones y seguridad
│   │   ├── mp-signature.middleware.js
│   │   └── payment-validation.middleware.js
│   └── utils/
│       ├── mp-config.js
│       └── payment-status.js
├── tests/                   # Tests unitarios e integración
├── docs/                    # Documentación técnica
└── public/                  # Archivos estáticos para checkout
```

## 🚀 Métodos de Pago Soportados

### Checkout Pro (Redirect)
- Tarjetas de crédito/débito
- Efectivo (Rapipago, Pago Fácil)
- Transferencia bancaria
- MercadoPago Wallet

### API de Pagos (Custom)
- Tokenización de tarjetas
- Pagos con tarjetas guardadas
- Split payments (marketplace)

### Suscripciones
- Planes mensuales/anuales
- Período de prueba gratuito
- Gestión de upgrades/downgrades

## 📦 Instalación

```bash
cd mercadopago-integration
npm install
cp .env.example .env
# Configurar variables de entorno
npm run dev
```

### Variables de Entorno

```bash
# MercadoPago Credentials
MP_ACCESS_TOKEN=your_access_token
MP_PUBLIC_KEY=your_public_key
MP_CLIENT_ID=your_client_id
MP_CLIENT_SECRET=your_client_secret

# Webhook Configuration
WEBHOOK_SECRET=your_webhook_secret
WEBHOOK_URL=https://yourapp.com/webhooks/mercadopago

# App URLs
SUCCESS_URL=https://yourapp.com/payment/success
FAILURE_URL=https://yourapp.com/payment/failure
PENDING_URL=https://yourapp.com/payment/pending
```

## 🔗 Endpoints Principales

### Pagos
- `POST /api/payments/preference` - Crear preferencia de pago
- `POST /api/payments/process` - Procesar pago con API
- `GET /api/payments/:id` - Obtener estado de pago
- `POST /api/payments/:id/refund` - Reembolsar pago

### Suscripciones
- `POST /api/subscriptions/create` - Crear suscripción
- `GET /api/subscriptions/:id` - Obtener suscripción
- `PUT /api/subscriptions/:id/pause` - Pausar suscripción
- `DELETE /api/subscriptions/:id` - Cancelar suscripción

### Webhooks
- `POST /webhooks/mercadopago` - Receptor de webhooks

## 💡 Ejemplos de Uso

### Crear Pago Simple

```javascript
const paymentData = {
  items: [{
    title: 'Plan Premium RecuérdaMe',
    quantity: 1,
    unit_price: 999
  }],
  payer: {
    email: 'usuario@ejemplo.com'
  }
};

const preference = await mercadopagoService.createPreference(paymentData);
// Redirigir a preference.init_point
```

### Crear Suscripción

```javascript
const subscriptionData = {
  plan_id: 'premium_monthly',
  payer_email: 'usuario@ejemplo.com',
  back_url: 'https://yourapp.com/subscription/success'
};

const subscription = await subscriptionService.createSubscription(subscriptionData);
```

## 🧪 Testing

```bash
# Tests unitarios
npm test

# Tests de integración con MercadoPago Sandbox
npm run test:integration

# Cobertura
npm run test:coverage
```

## 🔄 Flujo de Pagos

1. **Usuario selecciona plan** → Frontend envía datos al backend
2. **Backend crea preferencia** → Genera URL de pago de MercadoPago
3. **Usuario completa pago** → MercadoPago procesa transacción
4. **Webhook recibido** → Backend actualiza estado en BD
5. **Confirmación enviada** → Usuario recibe confirmación

## 📊 Planes de Suscripción

| Plan | Precio | Características |
|------|--------|----------------|
| **Básico** | Gratis | 5 recordatorios, notificaciones básicas |
| **Premium** | $999/mes | Recordatorios ilimitados, analytics, soporte |
| **Familiar** | $1499/mes | Hasta 5 usuarios, historial completo |

## 🔐 Seguridad

- ✅ Validación de firmas de webhook
- ✅ Tokens de acceso seguros
- ✅ Validación de montos en backend
- ✅ Rate limiting en endpoints
- ✅ Logs de seguridad

## 📈 Monitoreo

- Dashboard de pagos en tiempo real
- Métricas de conversión
- Alertas de fallos de pago
- Reportes de revenue

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/webhook-improvements`)
3. Commit cambios (`git commit -m 'feat: add payment retry logic'`)
4. Push a la rama (`git push origin feature/webhook-improvements`)
5. Crear Pull Request

## 📚 Documentación

- [MercadoPago API Docs](https://www.mercadopago.com.ar/developers)
- [Webhook Events](docs/webhook-events.md)
- [Payment Flow](docs/payment-flow.md)
- [Testing Guide](docs/testing.md)

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

---

💡 **Tip**: Para testing usa las [credenciales de prueba](https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-pro/test-integration) de MercadoPago