import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api-client';
import { formatXOF } from '@/lib/currency';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import type { PaginatedResponse, Transaction } from '@shared/types';
export function TransactionsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery<PaginatedResponse<Transaction>>({
    queryKey: ['transactions'],
    queryFn: async ({ pageParam = null }) => {
      const cursor = pageParam ? `?cursor=${pageParam}` : '';
      return api<PaginatedResponse<Transaction>>(`/api/transactions${cursor}`);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const transactions = data?.pages.flatMap(page => page.items) ?? [];
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
            {isPending ? (
              <TableRow><TableCell colSpan={8} className="text-center py-10">Loading transactions...</TableCell></TableRow>
            ) : !transactions.length && !isPending ? (
              <TableRow><TableCell colSpan={8} className="text-center py-10 text-muted-foreground">No transactions found</TableCell></TableRow>
            ) : (
              transactions.map((tx) => (
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
              ))
            )}
          </TableBody>
        </Table>
        <div className='flex justify-center pt-8'>
          {hasNextPage && (
            <Button 
              variant='outline' 
              onClick={() => fetchNextPage()} 
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Load More'
              )} ({transactions.length} loaded)
            </Button>
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
}
