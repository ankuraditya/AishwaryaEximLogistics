import {
  catalogueCategories,
} from "./catalogue";

export const buyerTypeOptions = [
  {
    value: "",
    label: "Select buyer type",
  },
  {
    value: "importer",
    label: "Importer",
  },
  {
    value: "wholesaler",
    label: "Wholesaler",
  },
  {
    value: "distributor",
    label: "Distributor",
  },
  {
    value: "retail-chain",
    label: "Retail Chain",
  },
  {
    value: "buying-house",
    label: "Buying House",
  },
  {
    value: "institutional-buyer",
    label: "Institutional Buyer",
  },
  {
    value: "food-service-hospitality",
    label: "Food-Service / Hospitality",
  },
  {
    value: "other-business",
    label: "Other Business Buyer",
  },
];

export const categoryOptions = [
  {
    value: "",
    label: "Select product category",
  },

  ...catalogueCategories.map(
    (category) => ({
      value: category.slug,
      label: category.name,
    })
  ),
];

export const quantityUnitOptions = [
  {
    value: "",
    label: "Select unit",
  },
  {
    value: "pieces",
    label: "Pieces",
  },
  {
    value: "sets",
    label: "Sets",
  },
  {
    value: "units",
    label: "Units",
  },
  {
    value: "cartons",
    label: "Cartons",
  },
  {
    value: "kilograms",
    label: "Kilograms",
  },
  {
    value: "containers",
    label: "Containers",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
  },
];

export const customisationOptions = [
  {
    value: "",
    label: "Select option",
  },
  {
    value: "yes",
    label: "Yes",
  },
  {
    value: "no",
    label: "No",
  },
  {
    value: "not-sure",
    label: "Not Sure / Need Discussion",
  },
];

export const tradeTermOptions = [
  {
    value: "",
    label: "Not decided / Need discussion",
  },
  {
    value: "EXW",
    label: "EXW",
  },
  {
    value: "FOB",
    label: "FOB",
  },
  {
    value: "CFR",
    label: "CFR",
  },
  {
    value: "CIF",
    label: "CIF",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const contactPreferenceOptions = [
  {
    value: "email",
    label: "Email",
  },
  {
    value: "phone",
    label: "Phone",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
  },
];