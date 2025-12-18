import type { Tenant, Transaction } from './types';
export const MOCK_TENANTS: Tenant[] = [
  {
    id: 't1',
    name: 'Dakar E-Shop',
    apiKey: 'cp_live_dk8291',
    webhookUrl: 'https://api.eshop.sn/webhooks/cauripay',
    feeTier: 'STANDARD',
  }
];
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_1',
    tenantId: 't1',
    amount: 5000,
    fee: 50,
    net: 4950,
    currency: 'XOF',
    country: 'SN',
    provider: 'WAVE',
    status: 'SUCCESS',
    customerPhone: '221771234567',
    description: 'Order #882',
    createdAt: Date.now() - 3600000,
  },
  {
    id: 'tx_2',
    tenantId: 't1',
    amount: 12500,
    fee: 125,
    net: 12375,
    currency: 'XOF',
    country: 'CI',
    provider: 'ORANGE',
    status: 'SUCCESS',
    customerPhone: '2250701020304',
    description: 'Order #883',
    createdAt: Date.now() - 7200000,
  },
  {
    id: 'tx_3',
    tenantId: 't1',
    amount: 2500,
    fee: 25,
    net: 2475,
    currency: 'XOF',
    country: 'SN',
    provider: 'ORANGE',
    status: 'FAILED',
    customerPhone: '221789998877',
    description: 'Order #884',
    createdAt: Date.now() - 10800000,
  }
];