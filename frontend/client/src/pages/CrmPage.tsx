import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrudPage from "@/components/CrudPage";
import PageHeader from "@/components/PageHeader";
import { customersConfig, leadsConfig, interactionsConfig } from "@/lib/moduleConfigs";

export default function CrmPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="CRM" description="Customers, leads, and interaction management" />
      <Tabs defaultValue="customers">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="mt-4">
          <CrudPage {...customersConfig} title="" />
        </TabsContent>
        <TabsContent value="leads" className="mt-4">
          <CrudPage {...leadsConfig} title="" />
        </TabsContent>
        <TabsContent value="interactions" className="mt-4">
          <CrudPage {...interactionsConfig} title="" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
