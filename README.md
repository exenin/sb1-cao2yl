# CyberAllStars Platform

Modern cybersecurity and digital transformation platform built with React, TypeScript, and Tailwind CSS.

## Features

- 🛡️ Comprehensive cybersecurity services management
- 💼 Client portal with service tracking
- 📊 Admin dashboard for service and client management
- 🔐 Role-based access control
- 💳 Invoice management
- 🤖 AI-powered support chatbot

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Default Login Credentials

### Customer Portal
- Email: customer@example.com
- Password: Customer123!
- Role: Customer Company
- Permissions: view_services, manage_company_users, view_invoices

### Admin Portal
- Email: admin@cyberallstars.com
- Password: Admin123!
- Role: Admin
- Permissions: all

## Environment Configuration

The platform supports various environment toggles for feature management:

```env
# Feature Toggles
VITE_ENABLE_CHATBOT=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1

# Authentication
VITE_AUTH_PROVIDER=local # or 'oauth' for OAuth integration
VITE_SESSION_DURATION=86400 # 24 hours in seconds

# Security
VITE_ENFORCE_MFA=false
VITE_PASSWORD_MIN_LENGTH=8
VITE_PASSWORD_REQUIRE_SPECIAL=true
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)

## Core Services

### Cybersecurity Solutions
- Basic Security Package (ZAR 25,000/month)
- Advanced Security Package (ZAR 35,000/month)
- Premium Security Package (ZAR 50,000/month)

### Digital Transformation
- Startup Accelerator Package (ZAR 30,000/month)
- Enterprise Growth Package (ZAR 60,000/month)

### Cloud Services
- Cloud Setup and Migration (ZAR 20,000/month)
- Cloud Optimization (ZAR 30,000/month)
- Cloud Compliance & Security (ZAR 40,000/month)

## Architecture

The platform follows a modular architecture with:

- React for UI components
- TypeScript for type safety
- Tailwind CSS for styling
- Context API for state management
- React Router for navigation
- Role-based access control
- Service-oriented architecture

## Security Features

- Role-based access control (RBAC)
- Permission-based authorization
- Secure authentication flow
- Protected routes
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Session management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, modification, distribution, or use is strictly prohibited.