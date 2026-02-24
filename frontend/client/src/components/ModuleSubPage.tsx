import useCrud from "@/hooks/useCrud";
import DataGrid, { Column } from "@/components/DataGrid";
import CrudForm, { FieldDef } from "@/components/CrudForm";
import DeleteConfirm from "@/components/DeleteConfirm";
import DetailView from "@/components/DetailView";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export interface DetailField {
  key: string;
  label: string;
  type?: "text" | "currency" | "date" | "status" | "percent" | "number";
}

export interface SubPageConfig {
  title: string;
  description: string;
  endpoint: string;
  idField: string;
  entityName: string;
  columns: Column[];
  formFields: FieldDef[];
  detailFields: DetailField[];
  searchPlaceholder?: string;
  breadcrumb?: { module: string; page: string };
}

export default function ModuleSubPage({
  title,
  description,
  endpoint,
  idField,
  entityName,
  columns,
  formFields,
  detailFields,
  searchPlaceholder,
  breadcrumb,
}: SubPageConfig) {
  const crud = useCrud({ endpoint, idField, entityName });

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      {breadcrumb && (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>{breadcrumb.module}</span>
          <span>/</span>
          <span className="text-foreground font-medium">{breadcrumb.page}</span>
        </div>
      )}

      <PageHeader title={title} description={description}>
        <Badge variant="secondary" className="text-xs">{crud.total} records</Badge>
      </PageHeader>

      <DataGrid
        columns={columns}
        data={crud.data}
        total={crud.total}
        loading={crud.loading}
        idField={idField}
        searchPlaceholder={searchPlaceholder || `Search ${entityName.toLowerCase()}s...`}
        onCreate={crud.handleCreate}
        onEdit={crud.handleEdit}
        onDelete={crud.handleDeleteClick}
        onView={crud.handleView}
        onRefresh={crud.load}
      />

      <CrudForm
        open={crud.formOpen}
        onClose={() => { crud.setFormOpen(false); crud.setEditItem(null); }}
        onSubmit={crud.handleSubmit}
        fields={formFields}
        initialData={crud.editItem}
        title={crud.editItem ? `Edit ${entityName}` : `New ${entityName}`}
      />

      <DeleteConfirm
        open={!!crud.deleteItem}
        onClose={() => crud.setDeleteItem(null)}
        onConfirm={crud.handleDeleteConfirm}
        title={`Delete ${entityName}`}
      />

      <DetailView
        open={!!crud.viewItem}
        onClose={() => crud.setViewItem(null)}
        title={`${entityName} Details`}
        data={crud.viewItem}
        fields={detailFields}
      />
    </div>
  );
}
