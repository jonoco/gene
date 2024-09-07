// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestPerson = {
  id: string;
  name: string;
  surname: string;
  birth_date: Date;
}

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type PeopleTableType = {
  id: string;
  name?: string;
  surname?: string;
  gender?: string;
  maiden_naame?: string;
  birth_date?: Date;
  marriage_date?: Date;
  death_date?: Date;
  born_in?: string;
  married_in?: string;
  died_in?: string;
  comments?: string;
  ancestry?: string;
  father_id?: string;
  mother_id?: string;
  spouse_id?: string;
  father_name?: string;
};

export type SiblingType = {
  sibling_id: string;
  sibling_name: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Person = {
  id: string;
  record: number;
  father?: number;
  mother?: number;
  sibling?: number;
  spouse?: number;
  child?: number;
  gender?: string;
  surname?: string;
  name?: string;
  maiden_naame?: string;
  birth_date?: string;
  marriage_date?: string;
  death_date?: string;
  photo?: number;
  photo_url?: string;
  born_in?: string;
  married_in?: string;
  died_in?: string;
  ssn?: string;
  comments?: string;
  entry_date?: string;
  ancestry?: string;
  father_id?: string;
  mother_id?: string;
  spouse_id?: string;
};
