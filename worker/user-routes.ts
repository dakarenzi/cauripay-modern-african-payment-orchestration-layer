import { Hono } from "hono";
import type { Env } from './core-utils';
import { TenantEntity, TransactionEntity } from "./payment-entities";
import { ok, bad, isStr } from './core-utils';
import type { PaymentRequest, Transaction } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/stats', async (c) => {
    await TransactionEntity.ensureSeed(c.env);
    const stats = await TransactionEntity.getStats(c.env);
    return ok(c, stats);
  });
  app.get('/api/transactions', async (c) => {
    await TransactionEntity.ensureSeed(c.env);
    const page = await TransactionEntity.list(c.env, c.req.query('cursor'), 50);
    return ok(c, page);
  });
  app.post('/api/pay', async (c) => {
    const body = await c.req.json<PaymentRequest>();
    if (!body.amount || !body.phone || !body.provider) return bad(c, 'Missing payment details');
    // Fee Calculation Logic (0.5% for Wave, 1% for others in this demo)
    const feePercent = body.provider === 'WAVE' ? 0.005 : 0.01;
    const fee = Math.round(body.amount * feePercent);
    const tx: Transaction = {
      id: `tx_${crypto.randomUUID().slice(0, 8)}`,
      tenantId: 't1', // Mock tenant for demo
      amount: body.amount,
      fee: fee,
      net: body.amount - fee,
      currency: 'XOF',
      country: body.country,
      provider: body.provider,
      status: 'SUCCESS', // Auto-success for simulator
      customerPhone: body.phone,
      description: body.description || 'Payment via CauriPay',
      createdAt: Date.now()
    };
    await TransactionEntity.create(c.env, tx);
    // Simulate provider latency
    await new Promise(r => setTimeout(r, 1200));
    return ok(c, tx);
  });
}