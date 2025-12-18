import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Globe, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';
export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThemeToggle />
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <nav className="flex items-center justify-between py-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold tracking-tight">CauriPay</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>Sign In</Button>
        </nav>
        <div className="py-20 md:py-32 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-balance leading-tight">
              The Payment Bridge for <span className="text-emerald-600">Africa</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Unified API for Orange Money, Wave, and MTN. Built for high-growth merchants in Francophone Africa.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-lg bg-emerald-600 hover:bg-emerald-700 text-white gap-2" onClick={() => navigate('/dashboard')}>
              Go to Dashboard <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg" onClick={() => navigate('/simulator')}>
              Try Simulator
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20">
            {[
              { icon: Zap, title: "Instant Settlement", desc: "Real-time transaction processing across all mobile money providers." },
              { icon: Globe, title: "Multi-Country", desc: "One integration for Senegal, Ivory Coast, Mali, and Burkina Faso." },
              { icon: Lock, title: "Bank-Grade Security", desc: "Durable Object persistence ensures no transaction is ever lost." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all text-left space-y-4"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}