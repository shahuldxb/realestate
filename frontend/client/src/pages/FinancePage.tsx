import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrudPage from "@/components/CrudPage";
import PageHeader from "@/components/PageHeader";
import { accountsConfig, transactionsConfig, invoicesConfig, budgetsConfig } from "@/lib/moduleConfigs";

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Financial Management" description="Accounts, transactions, invoices, and budgets" />
      <Tabs defaultValue="accounts">
        <TabsList>
          <TabsTrigger value="accounts">Chart of Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="mt-4">
          <CrudPage {...accountsConfig} title="" />
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <CrudPage {...transactionsConfig} title="" />
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <CrudPage {...invoicesConfig} title="" />
        </TabsContent>
        <TabsContent value="budgets" className="mt-4">
          <CrudPage {...budgetsConfig} title="" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
