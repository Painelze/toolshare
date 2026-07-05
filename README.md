# ToolShare - Aplicativo de Aluguel de Ferramentas

![ToolShare Logo](docs/images/logo.png)

## 📱 Visão Geral

**ToolShare** é um aplicativo mobile (iOS/Android) que conecta vizinhos para alugar ferramentas e equipamentos de forma segura, rápida e confiável. Similar a Airbnb, Uber e Mercado Livre, mas focado exclusivamente em aluguel de ferramentas.

## 🎯 Principais Funcionalidades

### 👤 Autenticação & Segurança
- ✅ Login: Google, Apple, Facebook, E-mail, Telefone, CPF, Biometria
- ✅ Validação com OCR de documentos
- ✅ Reconhecimento facial
- ✅ Sistema anti-fraude
- ✅ 2FA (SMS/Email/Biometria)
- ✅ JWT + Refresh Token

### 🗺️ Localização & Mapa
- ✅ Google Maps em tempo real
- ✅ Rastreamento GPS
- ✅ Filtro por distância (1km até 100km)
- ✅ Traçar rotas com tempo estimado
- ✅ Compartilhamento de localização durante aluguel

### 🛠️ Anúncios de Ferramentas
- ✅ Fotos ilimitadas + vídeo
- ✅ Descrição, marca, modelo, ano
- ✅ Múltiplos preços (hora, dia, semana, mês)
- ✅ Calendário de disponibilidade
- ✅ Opção de entrega/retirada

### 💳 Pagamentos
- ✅ PIX, Cartão, Débito, Crédito
- ✅ Integração Stripe e Mercado Pago
- ✅ Apple Pay e Google Pay
- ✅ Carteira interna

### 💬 Comunicação
- ✅ Chat em tempo real (WebSocket)
- ✅ Envio de texto, imagem, vídeo, áudio, documentos
- ✅ Chamadas de voz e vídeo
- ✅ Notificações Push, Email, SMS

### ⭐ Sistema de Avaliações
- ✅ 5 estrelas + comentários
- ✅ Fotos + denúncias
- ✅ Histórico de confiabilidade

### 🤖 Inteligência Artificial
- ✅ Chatbot inteligente
- ✅ Detecção de golpes
- ✅ Sugestão de preço ideal
- ✅ Geração automática de descrição

## 🏗️ Stack Tecnológico

### Mobile
- **Flutter** (últimas versão)
- **Dart**
- **Provider** (State Management)
- **GetX** (Roteamento)
- **Firebase** (Auth, Cloud Messaging, Storage)
- **Google Maps Flutter**
- **Stripe SDK**
- **Mercado Pago SDK**

### Backend
- **Node.js** com **NestJS**
- **PostgreSQL** (Banco de dados principal)
- **Redis** (Cache)
- **Firebase** (Auth, Messaging, Storage)
- **WebSocket** (Socket.io)
- **JWT** + Refresh Token
- **Criptografia AES**

### Infraestrutura
- **Docker** + Docker Compose
- **GitHub Actions** (CI/CD)
- **HTTPS** obrigatório
- **Google Maps API**
- **Google Places API**

### Admin
- **React** ou **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Chart.js** (Gráficos)

## 📁 Estrutura do Projeto

```
toolshare/
├── mobile/                    # Aplicativo Flutter
│   ├── lib/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.dart
│   └── pubspec.yaml
├── backend/                   # API NestJS
│   ├── src/
│   │   ├── modules/
│   │   ├── common/
│   │   ├── config/
│   │   └── main.ts
│   └── package.json
├── admin/                     # Painel Web
│   ├── src/
│   ├── pages/
│   └── package.json
├── database/                  # PostgreSQL
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
├── docker/                    # Configuração Docker
│   ├── Dockerfile.backend
│   ├── Dockerfile.mobile
│   └── docker-compose.yml
├── .github/
│   └── workflows/            # CI/CD
└── docs/                      # Documentação
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Flutter 3.10+
- Docker 20.10+
- PostgreSQL 14+
- Redis 7+

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Painelze/toolshare.git
cd toolshare
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run typeorm migration:run
npm run start:dev
```

3. **Setup Mobile**
```bash
cd mobile
flutter pub get
flutter run
```

4. **Setup Admin**
```bash
cd admin
npm install
npm run dev
```

### Com Docker
```bash
docker-compose up -d
```

## 📚 Documentação

- [Backend API - Swagger](docs/api-swagger.md)
- [Database Schema](database/schema.sql)
- [Mobile Architecture](docs/mobile-architecture.md)
- [Security Guidelines](docs/security.md)
- [Deployment Guide](docs/deployment.md)

## 🔒 Segurança

- ✅ Validação de CPF e documentos
- ✅ Reconhecimento facial
- ✅ Proteção contra SQL Injection, XSS, CSRF
- ✅ Rate Limiting
- ✅ Criptografia AES para dados sensíveis
- ✅ LGPD compliance
- ✅ Logs completos de auditoria
- ✅ Detecção de VPN, Proxy, Emulador
- ✅ Sistema anti-fraude inteligente

## 🧪 Testes

```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Mobile
cd mobile
flutter test
```

## 📦 Deploy

### Produção
```bash
# Backend
npm run build
npm run start:prod

# Mobile
flutter build apk
flutter build ios
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes

## 👥 Time de Desenvolvimento

- Arquiteto de Software
- Desenvolvedor Mobile Flutter
- Desenvolvedor Backend NestJS
- Especialista UX/UI
- Especialista em Segurança
- Especialista em Banco de Dados
- Especialista em Geolocalização
- Especialista em APIs
- Especialista em IA
- Especialista em DevOps

## 🤝 Suporte

Para dúvidas ou reportar bugs, abra uma [issue](https://github.com/Painelze/toolshare/issues)

---

**Status**: 🚀 Em Desenvolvimento | **Versão**: 0.1.0
