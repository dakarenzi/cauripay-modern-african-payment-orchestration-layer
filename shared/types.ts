export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type CountryCode = 'SN' | 'CI' | 'ML' | 'BF';
export type ProviderCode = 'ORANGE' | 'WAVE' | 'MTN' | 'FREE';
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED';
export interface FeeStructure {
  percentage: number;
  fixed: number;
}
export interface Tenant {
  id: string;
  name: string;
  apiKey: string;
  webhookUrl: string;
  feeTier: 'STANDARD' | 'PREMIUM';
}
export interface Transaction {
  id: string;
  tenantId: string;
  amount: number; // In XOF
  fee: number;
  net: number;
  currency: string;
  country: CountryCode;
  provider: ProviderCode;
  status: TransactionStatus;
  customerPhone: string;
  description: string;
  createdAt: number;
}
export interface PaymentRequest {
  amount: number;
  country: CountryCode;
  provider: ProviderCode;
  phone: string;
  description?: string;
}
export interface DashboardStats {
  totalVolume: number;
  totalFees: number;
  successRate: number;
  transactionCount: number;
  recentActivity: Transaction[];
}
export interface User {
  id: string;
  name: string;
}