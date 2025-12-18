# CauriPay Payment Pro

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dakarenzi/cauripay-modern-african-payment-orchestration-layer)

A modern full-stack payment processing application built on Cloudflare Workers. This project leverages Durable Objects for scalable, stateful backend entities, paired with a performant React frontend using Tailwind CSS and shadcn/ui components.

## 🚀 Key Features

- **Full-Stack Serverless**: Cloudflare Workers backend with React 18 frontend served as static assets.
- **Durable Objects State Management**: Entity-based storage (Users, Chats/Payments) with automatic indexing and pagination.
- **Type-Safe API**: Shared types between frontend and worker, Hono routing with CORS and error handling.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom theming, dark mode support.
- **Real-Time Ready**: Foundation for WebSockets or polling in chat/payment scenarios.
- **Production Optimized**: TypeScript, Vite bundling, automatic Workers deployment.
- **Scalable Architecture**: Global Durable Object for multi-tenant storage, concurrent-safe mutations.

## 🛠️ Technology Stack

| Category | Technologies |
|----------|--------------|
| **Backend** | Cloudflare Workers, Hono, Durable Objects |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| **State/UI** | Zustand, Framer Motion, React Hook Form, Sonner (Toasts) |
| **Utilities** | Lucide Icons, clsx, Tailwind Merge, Zod Validation |
| **Dev Tools** | Bun, ESLint, Wrangler, Cloudflare Vite Plugin |

## ⚡ Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`)
   - [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest login`)

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd cauripay-payment-pro-f7oyzwdhnqopru9ngxizk
   bun install
   ```

3. **Development**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

## 📚 Usage

### Frontend
- Navigate to `/` for the home page (customize `src/pages/HomePage.tsx`).
- API calls use `src/lib/api-client.ts` with TanStack Query integration.
- Theme toggle, sidebar layout (`AppLayout`), error boundaries included.

### Backend API (Demo Endpoints)
All at `/api/*`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/users` | GET/POST | List/create users (paginated) |
| `/api/chats` | GET/POST | List/create chat boards |
| `/api/chats/:id/messages` | GET/POST | List/send messages |
| `/api/users/:id` | DELETE | Delete user |
| `/api/users/deleteMany` | POST | Bulk delete |

**Example (curl)**:
```bash
# List users
curl http://localhost:8787/api/users

# Create user
curl -X POST http://localhost:8787/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe"}'
```

Customize `worker/user-routes.ts` and `worker/entities.ts` for payment entities (e.g., Transactions, Invoices).

## 🧪 Local Development

- **Frontend HMR**: `bun dev` (Vite + Cloudflare plugin proxies `/api/*` to Worker).
- **Worker Dev**: Standalone with `bunx wrangler dev` (edit `wrangler.jsonc`).
- **Type Generation**: `bun cf-typegen` (updates `worker/types.ts`).
- **Linting**: `bun lint`
- **Build**: `bun build` (outputs to `dist/`).

**Folder Structure**:
```
├── src/              # React frontend
├── worker/           # Cloudflare Worker backend
├── shared/           # Shared types
└── package.json      # Bun + Wrangler config
```

## ☁️ Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun deploy
```

This builds frontend assets and deploys the Worker + static site.

**Manual Steps**:
1. `bunx wrangler login`
2. `bun build`
3. `bunx wrangler deploy`

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/dakarenzi/cauripay-modern-african-payment-orchestration-layer)

**Notes**:
- Free tier supports this fully (Durable Objects included).
- Custom domain: Update `wrangler.jsonc` → `wrangler deploy --env production`.
- Assets auto-uploaded to Cloudflare R2/Pages integration.

## 🔧 Extending the Project

- **New Entities**: Extend `IndexedEntity` in `worker/entities.ts`.
- **New Routes**: Add to `worker/user-routes.ts`.
- **UI Components**: Use shadcn CLI: `bunx shadcn@latest add <component>`.
- **API Client**: Extend `src/lib/api-client.ts`.

## 🤝 Contributing

1. Fork & clone.
2. `bun install`
3. Make changes, `bun lint`.
4. PR to `main`.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

Built with ❤️ on Cloudflare Workers. Questions? [Cloudflare Workers Discord](https://discord.gg/cloudflaredev).