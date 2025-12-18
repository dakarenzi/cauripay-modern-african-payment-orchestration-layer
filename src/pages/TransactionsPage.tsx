import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api-client';
import { formatXOF } from '@/lib/currency';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import type { Transaction } from '@shared/types';
export function TransactionsPage() {
  const { data, isLoading } = useQuery<{ items: Transaction[] }>({
    queryKey: ['transactions'],
    queryFn: () => api<{ items: Transaction[] }>('/api/transactions'),
  });
  return (
    <DashboardLayout title="Transaction Ledger">
      <Card className="shadow-soft border-none overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead className="text-right">Net</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={8} className="text-center py-10">Loading transactions...</TableCell></TableRow>
            ) : data?.items.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-xs font-bold">{tx.id}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {format(tx.createdAt, 'MMM d, HH:mm')}
                </TableCell>
                <TableCell className="text-sm font-medium">{tx.customerPhone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      tx.provider === 'WAVE' ? "bg-blue-500" : "bg-orange-500"
                    )} />
                    <span className="text-xs font-semibold">{tx.provider} {tx.country}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold">{formatXOF(tx.amount)}</TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">{formatXOF(tx.fee)}</TableCell>
                <TableCell className="text-right font-semibold text-emerald-600">{formatXOF(tx.net)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={tx.status === 'SUCCESS' ? 'default' : 'destructive'} className={cn(
                    "rounded-full px-3",
                    tx.status === 'SUCCESS' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""
                  )}>
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}