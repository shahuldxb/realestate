import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ModuleSubPage from "./components/ModuleSubPage";
import AiAssistant from "./pages/AiAssistant";

// Import all configs
import {
  // M1: Project Management
  projectList, projectMilestones, projectTasks, projectGantt, projectBudgetTracking,
  // M2: Financial Management
  chartOfAccounts, journalEntries, invoices, budgetPlanning, paymentVouchers, financialReports,
  // M3: CRM
  customerMaster, leadManagement, interactionLog, followUpScheduler, salesPipeline,
  // M4: Property Management
  propertyMaster, unitInventory, amenitiesFeatures, inspectionReports, occupancyDashboard,
  // M5: Land Acquisition
  landParcels, negotiations, dueDiligence, regulatoryApprovals,
  // M6: Bidding & Procurement
  vendorMaster, bidManagement, purchaseOrders, goodsReceivedNotes, bidComparisons,
  // M7: Construction Management
  activityTracker, dailySiteLogs, safetyIncidents, qualityInspections, equipmentAllocation,
  // M8: Project Controls
  earnedValueAnalysis, riskRegister, changeOrders, schedulePerformance, costReports,
  // M9: Asset Management
  assetRegister, depreciationSchedule, assetMaintenance, assetTransfers,
  // M10: Property Valuation
  appraisalReports, marketAnalysis, comparableSales, valuationHistory,
  // M11: Lease & Rental
  leaseAgreements, rentCollection, renewalTracker, rentEscalations, arrearsReport,
  // M12: Sales Management
  salesTransactions, paymentPlans, unitReservations, commissionTracker, handoverManagement,
  // M13: Marketing Automation
  campaignManager, channelPerformance, contentLibrary, marketingAnalytics, eventsOpenHouses,
  // M14: Opportunity Management
  pipelineBoard, opportunityList, revenueForecasting, winLossAnalysis,
  // M15: HCM & Payroll
  employeeMaster, payrollProcessing, attendanceTracker, leaveManagement, recruitmentPipeline,
  // M16: Legal & Compliance
  contractManagement, complianceTracker, permitsLicenses, disputeResolution, nocManagement,
  // M17: Document Management
  documentRepository, documentTemplates, approvalWorkflows, archive,
  // M18: Inventory Management
  itemMaster, stockMovements, warehouseManagement, materialRequisitions, stockReports,
  // M19: Helpdesk / Facility
  ticketManagement, maintenanceSchedule, workOrders, slaTracking, serviceVendors,
  // M20: Tenant Portal
  tenantDirectory, tenantNotifications, serviceRequests, accountStatements, communityBoard,
  // M21: Facility Operations
  fmBuildingsConfig, fmUnitsConfig, fmFacilitiesConfig, fmOwnersConfig, fmTenantsConfig,
  fmLeasesConfig, fmRentCollectionConfig, fmRentArrearsConfig, fmMaintenanceRequestsConfig,
  fmPreventiveMaintenanceConfig, fmVendorsConfig, fmStaffConfig, fmStaffSchedulingConfig,
  fmVacanciesConfig, fmListingsConfig,
  // M22: Rent Teller & Cheque Management
  tellerTransactionsConfig, pdcRegisterConfig, chequeDepositsConfig, bouncedChequesConfig,
} from "./lib/configs";

function Router() {
  return (
    <AppLayout>
      <Switch>
        {/* Dashboard */}
        <Route path="/" component={Dashboard} />

        {/* M1: Project Management */}
        <Route path="/projects/list">{() => <ModuleSubPage {...projectList} />}</Route>
        <Route path="/projects/milestones">{() => <ModuleSubPage {...projectMilestones} />}</Route>
        <Route path="/projects/tasks">{() => <ModuleSubPage {...projectTasks} />}</Route>
        <Route path="/projects/gantt">{() => <ModuleSubPage {...projectGantt} />}</Route>
        <Route path="/projects/budget-tracking">{() => <ModuleSubPage {...projectBudgetTracking} />}</Route>

        {/* M2: Financial Management */}
        <Route path="/finance/chart-of-accounts">{() => <ModuleSubPage {...chartOfAccounts} />}</Route>
        <Route path="/finance/transactions">{() => <ModuleSubPage {...journalEntries} />}</Route>
        <Route path="/finance/invoices">{() => <ModuleSubPage {...invoices} />}</Route>
        <Route path="/finance/budgets">{() => <ModuleSubPage {...budgetPlanning} />}</Route>
        <Route path="/finance/payments">{() => <ModuleSubPage {...paymentVouchers} />}</Route>
        <Route path="/finance/reports">{() => <ModuleSubPage {...financialReports} />}</Route>

        {/* M3: CRM */}
        <Route path="/crm/customers">{() => <ModuleSubPage {...customerMaster} />}</Route>
        <Route path="/crm/leads">{() => <ModuleSubPage {...leadManagement} />}</Route>
        <Route path="/crm/interactions">{() => <ModuleSubPage {...interactionLog} />}</Route>
        <Route path="/crm/follow-ups">{() => <ModuleSubPage {...followUpScheduler} />}</Route>
        <Route path="/crm/pipeline">{() => <ModuleSubPage {...salesPipeline} />}</Route>

        {/* M4: Property Management */}
        <Route path="/properties/list">{() => <ModuleSubPage {...propertyMaster} />}</Route>
        <Route path="/properties/units">{() => <ModuleSubPage {...unitInventory} />}</Route>
        <Route path="/properties/amenities">{() => <ModuleSubPage {...amenitiesFeatures} />}</Route>
        <Route path="/properties/inspections">{() => <ModuleSubPage {...inspectionReports} />}</Route>
        <Route path="/properties/occupancy">{() => <ModuleSubPage {...occupancyDashboard} />}</Route>

        {/* M5: Land Acquisition */}
        <Route path="/land/parcels">{() => <ModuleSubPage {...landParcels} />}</Route>
        <Route path="/land/negotiations">{() => <ModuleSubPage {...negotiations} />}</Route>
        <Route path="/land/due-diligence">{() => <ModuleSubPage {...dueDiligence} />}</Route>
        <Route path="/land/approvals">{() => <ModuleSubPage {...regulatoryApprovals} />}</Route>

        {/* M6: Bidding & Procurement */}
        <Route path="/procurement/vendors">{() => <ModuleSubPage {...vendorMaster} />}</Route>
        <Route path="/procurement/bids">{() => <ModuleSubPage {...bidManagement} />}</Route>
        <Route path="/procurement/purchase-orders">{() => <ModuleSubPage {...purchaseOrders} />}</Route>
        <Route path="/procurement/grn">{() => <ModuleSubPage {...goodsReceivedNotes} />}</Route>
        <Route path="/procurement/comparisons">{() => <ModuleSubPage {...bidComparisons} />}</Route>

        {/* M7: Construction Management */}
        <Route path="/construction/activities">{() => <ModuleSubPage {...activityTracker} />}</Route>
        <Route path="/construction/daily-logs">{() => <ModuleSubPage {...dailySiteLogs} />}</Route>
        <Route path="/construction/safety">{() => <ModuleSubPage {...safetyIncidents} />}</Route>
        <Route path="/construction/quality">{() => <ModuleSubPage {...qualityInspections} />}</Route>
        <Route path="/construction/equipment">{() => <ModuleSubPage {...equipmentAllocation} />}</Route>

        {/* M8: Project Controls */}
        <Route path="/controls/earned-value">{() => <ModuleSubPage {...earnedValueAnalysis} />}</Route>
        <Route path="/controls/risks">{() => <ModuleSubPage {...riskRegister} />}</Route>
        <Route path="/controls/change-orders">{() => <ModuleSubPage {...changeOrders} />}</Route>
        <Route path="/controls/schedule">{() => <ModuleSubPage {...schedulePerformance} />}</Route>
        <Route path="/controls/cost-reports">{() => <ModuleSubPage {...costReports} />}</Route>

        {/* M9: Asset Management */}
        <Route path="/assets/register">{() => <ModuleSubPage {...assetRegister} />}</Route>
        <Route path="/assets/depreciation">{() => <ModuleSubPage {...depreciationSchedule} />}</Route>
        <Route path="/assets/maintenance">{() => <ModuleSubPage {...assetMaintenance} />}</Route>
        <Route path="/assets/transfers">{() => <ModuleSubPage {...assetTransfers} />}</Route>

        {/* M10: Property Valuation */}
        <Route path="/valuations/appraisals">{() => <ModuleSubPage {...appraisalReports} />}</Route>
        <Route path="/valuations/market-analysis">{() => <ModuleSubPage {...marketAnalysis} />}</Route>
        <Route path="/valuations/comparables">{() => <ModuleSubPage {...comparableSales} />}</Route>
        <Route path="/valuations/history">{() => <ModuleSubPage {...valuationHistory} />}</Route>

        {/* M11: Lease & Rental */}
        <Route path="/leases/agreements">{() => <ModuleSubPage {...leaseAgreements} />}</Route>
        <Route path="/leases/rent-payments">{() => <ModuleSubPage {...rentCollection} />}</Route>
        <Route path="/leases/renewals">{() => <ModuleSubPage {...renewalTracker} />}</Route>
        <Route path="/leases/escalations">{() => <ModuleSubPage {...rentEscalations} />}</Route>
        <Route path="/leases/arrears">{() => <ModuleSubPage {...arrearsReport} />}</Route>

        {/* M12: Sales Management */}
        <Route path="/sales/transactions">{() => <ModuleSubPage {...salesTransactions} />}</Route>
        <Route path="/sales/payment-plans">{() => <ModuleSubPage {...paymentPlans} />}</Route>
        <Route path="/sales/reservations">{() => <ModuleSubPage {...unitReservations} />}</Route>
        <Route path="/sales/commissions">{() => <ModuleSubPage {...commissionTracker} />}</Route>
        <Route path="/sales/handovers">{() => <ModuleSubPage {...handoverManagement} />}</Route>

        {/* M13: Marketing Automation */}
        <Route path="/marketing/campaigns">{() => <ModuleSubPage {...campaignManager} />}</Route>
        <Route path="/marketing/channels">{() => <ModuleSubPage {...channelPerformance} />}</Route>
        <Route path="/marketing/content">{() => <ModuleSubPage {...contentLibrary} />}</Route>
        <Route path="/marketing/analytics">{() => <ModuleSubPage {...marketingAnalytics} />}</Route>
        <Route path="/marketing/events">{() => <ModuleSubPage {...eventsOpenHouses} />}</Route>

        {/* M14: Opportunity Management */}
        <Route path="/opportunities/pipeline">{() => <ModuleSubPage {...pipelineBoard} />}</Route>
        <Route path="/opportunities/list">{() => <ModuleSubPage {...opportunityList} />}</Route>
        <Route path="/opportunities/forecasting">{() => <ModuleSubPage {...revenueForecasting} />}</Route>
        <Route path="/opportunities/win-loss">{() => <ModuleSubPage {...winLossAnalysis} />}</Route>

        {/* M15: HCM & Payroll */}
        <Route path="/hr/employees">{() => <ModuleSubPage {...employeeMaster} />}</Route>
        <Route path="/hr/payroll">{() => <ModuleSubPage {...payrollProcessing} />}</Route>
        <Route path="/hr/attendance">{() => <ModuleSubPage {...attendanceTracker} />}</Route>
        <Route path="/hr/leave">{() => <ModuleSubPage {...leaveManagement} />}</Route>
        <Route path="/hr/recruitment">{() => <ModuleSubPage {...recruitmentPipeline} />}</Route>

        {/* M16: Legal & Compliance */}
        <Route path="/legal/contracts">{() => <ModuleSubPage {...contractManagement} />}</Route>
        <Route path="/legal/compliance">{() => <ModuleSubPage {...complianceTracker} />}</Route>
        <Route path="/legal/permits">{() => <ModuleSubPage {...permitsLicenses} />}</Route>
        <Route path="/legal/disputes">{() => <ModuleSubPage {...disputeResolution} />}</Route>
        <Route path="/legal/noc">{() => <ModuleSubPage {...nocManagement} />}</Route>

        {/* M17: Document Management */}
        <Route path="/documents/repository">{() => <ModuleSubPage {...documentRepository} />}</Route>
        <Route path="/documents/templates">{() => <ModuleSubPage {...documentTemplates} />}</Route>
        <Route path="/documents/approvals">{() => <ModuleSubPage {...approvalWorkflows} />}</Route>
        <Route path="/documents/archive">{() => <ModuleSubPage {...archive} />}</Route>

        {/* M18: Inventory Management */}
        <Route path="/inventory/items">{() => <ModuleSubPage {...itemMaster} />}</Route>
        <Route path="/inventory/transactions">{() => <ModuleSubPage {...stockMovements} />}</Route>
        <Route path="/inventory/warehouses">{() => <ModuleSubPage {...warehouseManagement} />}</Route>
        <Route path="/inventory/requisitions">{() => <ModuleSubPage {...materialRequisitions} />}</Route>
        <Route path="/inventory/stock-reports">{() => <ModuleSubPage {...stockReports} />}</Route>

        {/* M19: Helpdesk / Facility */}
        <Route path="/helpdesk/tickets">{() => <ModuleSubPage {...ticketManagement} />}</Route>
        <Route path="/helpdesk/maintenance">{() => <ModuleSubPage {...maintenanceSchedule} />}</Route>
        <Route path="/helpdesk/work-orders">{() => <ModuleSubPage {...workOrders} />}</Route>
        <Route path="/helpdesk/sla">{() => <ModuleSubPage {...slaTracking} />}</Route>
        <Route path="/helpdesk/vendors">{() => <ModuleSubPage {...serviceVendors} />}</Route>

        {/* M20: Tenant Portal */}
        <Route path="/tenants/directory">{() => <ModuleSubPage {...tenantDirectory} />}</Route>
        <Route path="/tenants/notifications">{() => <ModuleSubPage {...tenantNotifications} />}</Route>
        <Route path="/tenants/requests">{() => <ModuleSubPage {...serviceRequests} />}</Route>
        <Route path="/tenants/statements">{() => <ModuleSubPage {...accountStatements} />}</Route>
        <Route path="/tenants/community">{() => <ModuleSubPage {...communityBoard} />}</Route>

        {/* M21: Facility Operations */}
        <Route path="/facility/buildings">{() => <ModuleSubPage {...fmBuildingsConfig} />}</Route>
        <Route path="/facility/units">{() => <ModuleSubPage {...fmUnitsConfig} />}</Route>
        <Route path="/facility/common-areas">{() => <ModuleSubPage {...fmFacilitiesConfig} />}</Route>
        <Route path="/facility/owners">{() => <ModuleSubPage {...fmOwnersConfig} />}</Route>
        <Route path="/facility/tenants">{() => <ModuleSubPage {...fmTenantsConfig} />}</Route>
        <Route path="/facility/leases">{() => <ModuleSubPage {...fmLeasesConfig} />}</Route>
        <Route path="/facility/rent-collection">{() => <ModuleSubPage {...fmRentCollectionConfig} />}</Route>
        <Route path="/facility/rent-arrears">{() => <ModuleSubPage {...fmRentArrearsConfig} />}</Route>
        <Route path="/facility/maintenance-requests">{() => <ModuleSubPage {...fmMaintenanceRequestsConfig} />}</Route>
        <Route path="/facility/preventive-maintenance">{() => <ModuleSubPage {...fmPreventiveMaintenanceConfig} />}</Route>
        <Route path="/facility/vendors">{() => <ModuleSubPage {...fmVendorsConfig} />}</Route>
        <Route path="/facility/staff">{() => <ModuleSubPage {...fmStaffConfig} />}</Route>
        <Route path="/facility/staff-scheduling">{() => <ModuleSubPage {...fmStaffSchedulingConfig} />}</Route>
        <Route path="/facility/vacancies">{() => <ModuleSubPage {...fmVacanciesConfig} />}</Route>
        <Route path="/facility/listings">{() => <ModuleSubPage {...fmListingsConfig} />}</Route>

        {/* M22: Rent Teller & Cheque Management */}
        <Route path="/facility/rent-teller">{() => <ModuleSubPage {...tellerTransactionsConfig} />}</Route>
        <Route path="/cheques/pdc-register">{() => <ModuleSubPage {...pdcRegisterConfig} />}</Route>
        <Route path="/cheques/deposits">{() => <ModuleSubPage {...chequeDepositsConfig} />}</Route>
        <Route path="/cheques/bounced">{() => <ModuleSubPage {...bouncedChequesConfig} />}</Route>

        {/* AI Assistant */}
        <Route path="/ai-assistant" component={AiAssistant} />

        {/* 404 */}
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
