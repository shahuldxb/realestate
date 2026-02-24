import type { SubPageConfig } from "@/components/ModuleSubPage";
const M = "Property Management";

export const propertyMaster: SubPageConfig = {
  title: "Property Master", description: "Manage all property listings and details",
  endpoint: "/properties", idField: "property_id", entityName: "Property",
  breadcrumb: { module: M, page: "Property Master" },
  columns: [
    { key: "property_name", label: "Property" }, { key: "property_type", label: "Type", type: "badge" },
    { key: "status", label: "Status", type: "status" }, { key: "city", label: "City" },
    { key: "total_area_sqft", label: "Area (sqft)", type: "number" },
    { key: "market_value", label: "Value", type: "currency" }, { key: "total_units", label: "Units", type: "number" },
  ],
  formFields: [
    { name: "project_id", label: "Project ID", type: "number", required: true },
    { name: "property_name", label: "Property Name", required: true },
    { name: "property_type", label: "Type", type: "select", options: [
      { value: "Villa", label: "Villa" }, { value: "Apartment", label: "Apartment" },
      { value: "Office", label: "Office" }, { value: "Retail", label: "Retail" },
      { value: "Warehouse", label: "Warehouse" }, { value: "Land", label: "Land" },
    ]},
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Available" }, { value: "Sold", label: "Sold" },
      { value: "Rented", label: "Rented" }, { value: "Under Construction", label: "Under Construction" },
    ]},
    { name: "address", label: "Address", type: "textarea", width: "full" },
    { name: "city", label: "City" }, { name: "state", label: "State" },
    { name: "country", label: "Country", defaultValue: "UAE" },
    { name: "total_area_sqft", label: "Total Area (sqft)", type: "number" },
    { name: "built_up_area_sqft", label: "Built-up Area (sqft)", type: "number" },
    { name: "total_units", label: "Total Units", type: "number" },
    { name: "market_value", label: "Market Value (AED)", type: "currency" },
    { name: "description", label: "Description", type: "textarea", width: "full" },
  ],
  detailFields: [
    { key: "property_id", label: "ID" }, { key: "property_name", label: "Name" },
    { key: "property_type", label: "Type" }, { key: "status", label: "Status", type: "status" },
    { key: "address", label: "Address" }, { key: "city", label: "City" },
    { key: "total_area_sqft", label: "Total Area", type: "number" },
    { key: "built_up_area_sqft", label: "Built-up Area", type: "number" },
    { key: "total_units", label: "Units", type: "number" },
    { key: "market_value", label: "Value", type: "currency" },
  ],
};

export const unitInventory: SubPageConfig = {
  title: "Unit Inventory", description: "Individual unit details within properties",
  endpoint: "/property-units", idField: "unit_id", entityName: "Unit",
  breadcrumb: { module: M, page: "Unit Inventory" },
  columns: [
    { key: "unit_number", label: "Unit #" }, { key: "unit_type", label: "Type", type: "badge" },
    { key: "floor_number", label: "Floor" }, { key: "area_sqft", label: "Area (sqft)", type: "number" },
    { key: "bedrooms", label: "Beds" }, { key: "bathrooms", label: "Baths" },
    { key: "price", label: "Price", type: "currency" }, { key: "status", label: "Status", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "unit_number", label: "Unit Number", required: true },
    { name: "unit_type", label: "Type", type: "select", options: [
      { value: "Studio", label: "Studio" }, { value: "1BR", label: "1 Bedroom" },
      { value: "2BR", label: "2 Bedroom" }, { value: "3BR", label: "3 Bedroom" },
      { value: "Penthouse", label: "Penthouse" }, { value: "Office", label: "Office" }, { value: "Retail", label: "Retail" },
    ]},
    { name: "floor_number", label: "Floor Number", type: "number" },
    { name: "area_sqft", label: "Area (sqft)", type: "number" },
    { name: "bedrooms", label: "Bedrooms", type: "number" },
    { name: "bathrooms", label: "Bathrooms", type: "number" },
    { name: "price", label: "Price (AED)", type: "currency" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Available" }, { value: "Reserved", label: "Reserved" },
      { value: "Sold", label: "Sold" }, { value: "Rented", label: "Rented" },
    ]},
    { name: "view_type", label: "View Type" },
    { name: "parking_slots", label: "Parking Slots", type: "number" },
  ],
  detailFields: [
    { key: "unit_id", label: "ID" }, { key: "unit_number", label: "Unit #" },
    { key: "unit_type", label: "Type" }, { key: "floor_number", label: "Floor" },
    { key: "area_sqft", label: "Area", type: "number" }, { key: "bedrooms", label: "Beds" },
    { key: "bathrooms", label: "Baths" }, { key: "price", label: "Price", type: "currency" },
    { key: "status", label: "Status", type: "status" }, { key: "view_type", label: "View" },
    { key: "parking_slots", label: "Parking" },
  ],
};

export const amenitiesFeatures: SubPageConfig = {
  title: "Amenities & Features", description: "Manage property amenities and features",
  endpoint: "/property-amenities", idField: "amenity_id", entityName: "Amenity",
  breadcrumb: { module: M, page: "Amenities & Features" },
  columns: [
    { key: "amenity_name", label: "Amenity" }, { key: "category", label: "Category", type: "badge" },
    { key: "description", label: "Description" }, { key: "is_premium", label: "Premium", type: "status" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "amenity_name", label: "Amenity Name", required: true },
    { name: "category", label: "Category", type: "select", options: [
      { value: "Recreation", label: "Recreation" }, { value: "Security", label: "Security" },
      { value: "Parking", label: "Parking" }, { value: "Fitness", label: "Fitness" },
      { value: "Pool", label: "Pool" }, { value: "Common Area", label: "Common Area" },
    ]},
    { name: "description", label: "Description", type: "textarea", width: "full" },
    { name: "is_premium", label: "Premium?", type: "select", options: [
      { value: "Yes", label: "Yes" }, { value: "No", label: "No" },
    ]},
  ],
  detailFields: [
    { key: "amenity_id", label: "ID" }, { key: "amenity_name", label: "Amenity" },
    { key: "category", label: "Category" }, { key: "description", label: "Description" },
    { key: "is_premium", label: "Premium" },
  ],
};

export const inspectionReports: SubPageConfig = {
  title: "Inspection Reports", description: "Property and unit inspection records",
  endpoint: "/property-inspections", idField: "inspection_id", entityName: "Inspection",
  breadcrumb: { module: M, page: "Inspection Reports" },
  columns: [
    { key: "inspection_date", label: "Date", type: "date" },
    { key: "inspection_type", label: "Type", type: "badge" },
    { key: "inspector_name", label: "Inspector" },
    { key: "result", label: "Result", type: "status" },
    { key: "score", label: "Score", type: "number" },
    { key: "next_inspection_date", label: "Next", type: "date" },
  ],
  formFields: [
    { name: "property_id", label: "Property ID", type: "number", required: true },
    { name: "unit_id", label: "Unit ID", type: "number" },
    { name: "inspection_type", label: "Type", type: "select", options: [
      { value: "Pre-handover", label: "Pre-handover" }, { value: "Annual", label: "Annual" },
      { value: "Defect", label: "Defect" }, { value: "Safety", label: "Safety" },
    ]},
    { name: "inspection_date", label: "Date", type: "date", required: true },
    { name: "inspector_name", label: "Inspector", required: true },
    { name: "result", label: "Result", type: "select", options: [
      { value: "Pass", label: "Pass" }, { value: "Fail", label: "Fail" },
      { value: "Conditional", label: "Conditional" },
    ]},
    { name: "score", label: "Score (0-100)", type: "number" },
    { name: "findings", label: "Findings", type: "textarea", width: "full" },
    { name: "recommendations", label: "Recommendations", type: "textarea", width: "full" },
    { name: "next_inspection_date", label: "Next Inspection", type: "date" },
  ],
  detailFields: [
    { key: "inspection_id", label: "ID" }, { key: "inspection_type", label: "Type" },
    { key: "inspection_date", label: "Date", type: "date" }, { key: "inspector_name", label: "Inspector" },
    { key: "result", label: "Result", type: "status" }, { key: "score", label: "Score", type: "number" },
    { key: "findings", label: "Findings" }, { key: "recommendations", label: "Recommendations" },
    { key: "next_inspection_date", label: "Next", type: "date" },
  ],
};

export const occupancyDashboard: SubPageConfig = {
  title: "Occupancy Dashboard", description: "Track occupancy rates across properties",
  endpoint: "/property-units", idField: "unit_id", entityName: "Unit",
  breadcrumb: { module: M, page: "Occupancy Dashboard" },
  columns: [
    { key: "unit_number", label: "Unit #" }, { key: "unit_type", label: "Type", type: "badge" },
    { key: "status", label: "Status", type: "status" }, { key: "area_sqft", label: "Area", type: "number" },
    { key: "price", label: "Price", type: "currency" }, { key: "floor_number", label: "Floor" },
  ],
  formFields: unitInventory.formFields,
  detailFields: unitInventory.detailFields,
};
