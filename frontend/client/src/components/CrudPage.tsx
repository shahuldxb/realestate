import useCrud from "@/hooks/useCrud";
import DataGrid, { Column } from "@/components/DataGrid";
import CrudForm, { FieldDef } from "@/components/CrudForm";
import DeleteConfirm from "@/components/DeleteConfirm";
import DetailView from "@/components/DetailView";
import PageHeader from "@/components/PageHeader";

export interface DetailField {
  key: string;
  label: string;
  type?: "text" | "currency" | "date" | "status" | "percent" | "number";
}

interface CrudPageProps {
  title: string;
  description?: string;
  endpoint: string;
  idField: string;
  entityName: string;
  columns: Column[];
  formFields: FieldDef[];
  detailFields?: DetailField[];
  searchPlaceholder?: string;
  canCreate?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  canView?: boolean;
  headerExtra?: React.ReactNode;
  children?: React.ReactNode;
}

export default function CrudPage({
  title,
  description,
  endpoint,
  idField,
  entityName,
  columns,
  formFields,
  detailFields,
  searchPlaceholder,
  canCreate = true,
  canEdit = true,
  canDelete = true,
  canView = true,
  headerExtra,
  children,
}: CrudPageProps) {
  const crud = useCrud({ endpoint, idField, entityName });

  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description}>
        {headerExtra}
      </PageHeader>

      {children}

      <DataGrid
        columns={columns}
        data={crud.data}
        total={crud.total}
        loading={crud.loading}
        idField={idField}
        searchPlaceholder={searchPlaceholder}
        onCreate={canCreate ? crud.handleCreate : undefined}
        onEdit={canEdit ? crud.handleEdit : undefined}
        onDelete={canDelete ? crud.handleDeleteClick : undefined}
        onView={canView && detailFields ? crud.handleView : undefined}
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

      {detailFields && (
        <DetailView
          open={!!crud.viewItem}
          onClose={() => crud.setViewItem(null)}
          title={`${entityName} Details`}
          data={crud.viewItem}
          fields={detailFields}
        />
      )}
    </div>
  );
}
