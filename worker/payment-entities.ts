import { IndexedEntity } from "./core-utils";
import type { Tenant, Transaction, DashboardStats } from "@shared/types";
import { MOCK_TENANTS, MOCK_TRANSACTIONS } from "@shared/mock-data";
export class TenantEntity extends IndexedEntity<Tenant> {
  static readonly entityName = "tenant";
  static readonly indexName = "tenants";
  static readonly initialState: Tenant = { 
    id: "", name: "", apiKey: "", webhookUrl: "", feeTier: "STANDARD" 
  };
  static seedData = MOCK_TENANTS;
}
export class TransactionEntity extends IndexedEntity<Transaction> {
  static readonly entityName = "transaction";
  static readonly indexName = "transactions";
  static readonly initialState: Transaction = {
    id: "", tenantId: "", amount: 0, fee: 0, net: 0, currency: "XOF",
    country: "SN", provider: "WAVE", status: "PENDING",
    customerPhone: "", description: "", createdAt: 0
  };
  static seedData = MOCK_TRANSACTIONS;
  static async getStats(env: any): Promise<DashboardStats> {
    const { items } = await this.list(env, null, 100);
    const successTx = items.filter(t => t.status === 'SUCCESS');
    const totalVolume = successTx.reduce((sum, t) => sum + t.amount, 0);
    const totalFees = successTx.reduce((sum, t) => sum + t.fee, 0);
    const successRate = items.length > 0 ? (successTx.length / items.length) * 100 : 0;
    return {
      totalVolume,
      totalFees,
      successRate,
      transactionCount: items.length,
      recentActivity: items.slice(0, 5)
    };
  }
}