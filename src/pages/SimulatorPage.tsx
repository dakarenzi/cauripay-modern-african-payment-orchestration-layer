import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api-client';
import { toast } from 'sonner';
import { Smartphone, ArrowRight, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CountryCode, ProviderCode, Transaction } from '@shared/types';
export function SimulatorPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'idle' | 'routing' | 'processing' | 'done'>('idle');
  const [result, setResult] = useState<Transaction | null>(null);
  const [form, setForm] = useState({
    amount: '5000',
    country: 'SN' as CountryCode,
    provider: 'WAVE' as ProviderCode,
    phone: '771234567'
  });
  const handlePay = async () => {
    setLoading(true);
    setStep('routing');
    try {
      const res = await api<Transaction>('/api/pay', {
        method: 'POST',
        body: JSON.stringify({
          amount: parseInt(form.amount),
          country: form.country,
          provider: form.provider,
          phone: form.phone
        })
      });
      setTimeout(() => setStep('processing'), 800);
      setTimeout(() => {
        setStep('done');
        setResult(res);
        setLoading(false);
        toast.success('Payment Successful');
      }, 2000);
    } catch (err) {
      toast.error('Payment Failed');
      setLoading(false);
      setStep('idle');
    }
  };
  return (
    <DashboardLayout title="Payment Simulator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Card className="shadow-soft border-none">
            <CardHeader>
              <CardTitle>Configure Request</CardTitle>
              <CardDescription>Simulate an API call to the CauriPay proxy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Amount (XOF)</Label>
                <Input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Select value={form.country} onValueChange={v => setForm({...form, country: v as CountryCode})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SN">Senegal</SelectItem>
                      <SelectItem value="CI">Ivory Coast</SelectItem>
                      <SelectItem value="ML">Mali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <Select value={form.provider} onValueChange={v => setForm({...form, provider: v as ProviderCode})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WAVE">Wave</SelectItem>
                      <SelectItem value="ORANGE">Orange Money</SelectItem>
                      <SelectItem value="MTN">MTN MoMo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Customer Phone</Label>
                <div className="flex gap-2">
                  <div className="w-16 h-10 bg-muted rounded flex items-center justify-center text-xs font-bold">+221</div>
                  <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700" onClick={handlePay} disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Initiate Charge"}
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-7">
          <Card className="h-full shadow-soft border-none bg-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                Live Execution Trace
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-800" />
                <div className="space-y-10">
                  <TraceStep 
                    active={step !== 'idle'} 
                    done={['routing', 'processing', 'done'].includes(step)} 
                    label="Request Received" 
                    sub="Validating API Key & Payload" 
                  />
                  <TraceStep 
                    active={['routing', 'processing', 'done'].includes(step)} 
                    done={['processing', 'done'].includes(step)} 
                    label="Provider Dispatch" 
                    sub={`Routing to ${form.provider} ${form.country} Gateway`} 
                  />
                  <TraceStep 
                    active={['processing', 'done'].includes(step)} 
                    done={step === 'done'} 
                    label="Fee Calculation" 
                    sub="Applying Standard Tier (0.5%)" 
                  />
                  <TraceStep 
                    active={step === 'done'} 
                    done={step === 'done'} 
                    label="Settlement" 
                    sub="Transaction persisted to Durable Object" 
                  />
                </div>
              </div>
              <AnimatePresence>
                {step === 'done' && result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Response Payload</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <pre className="text-xs font-mono text-emerald-100/70 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
function TraceStep({ active, done, label, sub }: { active: boolean, done: boolean, label: string, sub: string }) {
  return (
    <div className={cn("relative flex items-start gap-6 transition-opacity duration-500", !active && "opacity-20")}>
      <div className={cn(
        "z-10 h-8 w-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500",
        done ? "bg-emerald-500 border-emerald-500" : active ? "bg-slate-900 border-emerald-500 animate-pulse" : "bg-slate-900 border-slate-700"
      )}>
        {done ? <CheckCircle2 className="h-5 w-5 text-white" /> : <div className="h-2 w-2 rounded-full bg-emerald-500" />}
      </div>
      <div>
        <h4 className={cn("font-bold transition-colors", active ? "text-white" : "text-slate-500")}>{label}</h4>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </div>
  );
}
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}