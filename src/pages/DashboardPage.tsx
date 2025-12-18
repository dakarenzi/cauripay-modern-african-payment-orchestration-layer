import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api-client';
import { formatXOF } from '@/lib/currency';
import { TrendingUp, Users, CreditCard, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { DashboardStats } from '@shared/types';
import { cn } from "@/lib/utils";
export function DashboardPage() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['stats'],
    queryFn: () => api<DashboardStats>('/api/stats'),
  });
  const chartData = [
    { name: 'Mon', total: 45000 },
    { name: 'Tue', total: 52000 },
    { name: 'Wed', total: 38000 },
    { name: 'Thu', total: 65000 },
    { name: 'Fri', total: 48000 },
    { name: 'Sat', total: 25000 },
    { name: 'Sun', total: 15000 },
  ];
  if (isLoading) return <DashboardLayout title="Dashboard">Loading...</DashboardLayout>;
  return (
    <DashboardLayout title="Command Center">
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-soft border-none bg-emerald-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-80">Total Volume</CardTitle>
              <TrendingUp className="h-4 w-4 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatXOF(stats?.totalVolume || 0)}</div>
              <p className="text-xs opacity-70 mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Fees Collected</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatXOF(stats?.totalFees || 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Avg. 0.85% per tx</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.successRate?.toFixed(1) ?? '0.0'}%</div>
              <p className="text-xs text-muted-foreground mt-1">Industry avg: 92%</p>
            </CardContent>
          </Card>
          <Card className="shadow-soft border-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground mt-1">Across 4 countries</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4 shadow-soft border-none">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#059669' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 shadow-soft border-none">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {stats?.recentActivity?.map((tx, index) => (
                  <div key={tx.id || `tx-${index}`} className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold",
                      tx.provider === 'WAVE' ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                    )}>
                      {tx.provider?.[0] || '?'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{tx.customerPhone || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">{tx.country || '??'} • {tx.provider || '???'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatXOF(tx.amount || 0)}</p>
                      <p className={cn("text-2xs font-medium", (tx.status || '') === 'SUCCESS' ? "text-emerald-600" : "text-red-600")}>
                        {tx.status || 'PENDING'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}