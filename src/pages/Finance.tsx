import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, DollarSign, TrendingDown, TrendingUp, Users, Handshake, UserCheck, FileText, PieChart, Wallet, Shield } from 'lucide-react';
import FinanceOverview from '@/components/finance/FinanceOverview';
import MonthlyBudget from '@/components/finance/MonthlyBudget';
import RevenuesView from '@/components/finance/RevenuesView';
import ExpensesView from '@/components/finance/ExpensesView';
import ChannelPnL from '@/components/finance/ChannelPnL';
import CompanyPnL from '@/components/finance/CompanyPnL';
import ChannelPartnershipsView from '@/components/finance/ChannelPartnershipsView';
import PartnerEarnings from '@/components/finance/PartnerEarnings';
import EditorsPayroll from '@/components/finance/EditorsPayroll';
import ReportsExports from '@/components/finance/ReportsExports';
import ProxyTracking from '@/components/finance/ProxyTracking';

export default function Finance() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold">Finance</h1>
        <p className="text-sm text-muted-foreground">Company financials, channel P&L, partner earnings & payroll</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-muted/30 h-auto p-1 flex-wrap gap-0.5">
          <TabsTrigger value="overview" className="text-xs py-1.5 gap-1"><BarChart3 className="w-3 h-3" />Overview</TabsTrigger>
          <TabsTrigger value="budget" className="text-xs py-1.5 gap-1"><Wallet className="w-3 h-3" />Budget</TabsTrigger>
          <TabsTrigger value="revenues" className="text-xs py-1.5 gap-1"><TrendingUp className="w-3 h-3" />Revenues</TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs py-1.5 gap-1"><TrendingDown className="w-3 h-3" />Expenses</TabsTrigger>
          <TabsTrigger value="proxy" className="text-xs py-1.5 gap-1"><Shield className="w-3 h-3" />Proxy Tracking</TabsTrigger>
          <TabsTrigger value="channel-pnl" className="text-xs py-1.5 gap-1"><PieChart className="w-3 h-3" />Channel P&L</TabsTrigger>
          <TabsTrigger value="company-pnl" className="text-xs py-1.5 gap-1"><DollarSign className="w-3 h-3" />Company P&L</TabsTrigger>
          <TabsTrigger value="partnerships" className="text-xs py-1.5 gap-1"><Handshake className="w-3 h-3" />Partnerships</TabsTrigger>
          <TabsTrigger value="partner-earnings" className="text-xs py-1.5 gap-1"><Users className="w-3 h-3" />Partner Earnings</TabsTrigger>
          <TabsTrigger value="editors" className="text-xs py-1.5 gap-1"><UserCheck className="w-3 h-3" />Editors & Payroll</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs py-1.5 gap-1"><FileText className="w-3 h-3" />Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview"><FinanceOverview /></TabsContent>
        <TabsContent value="budget"><MonthlyBudget /></TabsContent>
        <TabsContent value="revenues"><RevenuesView /></TabsContent>
        <TabsContent value="expenses"><ExpensesView /></TabsContent>
        <TabsContent value="proxy"><ProxyTracking /></TabsContent>
        <TabsContent value="channel-pnl"><ChannelPnL /></TabsContent>
        <TabsContent value="company-pnl"><CompanyPnL /></TabsContent>
        <TabsContent value="partnerships"><ChannelPartnershipsView /></TabsContent>
        <TabsContent value="partner-earnings"><PartnerEarnings /></TabsContent>
        <TabsContent value="editors"><EditorsPayroll /></TabsContent>
        <TabsContent value="reports"><ReportsExports /></TabsContent>
      </Tabs>
    </div>
  );
}