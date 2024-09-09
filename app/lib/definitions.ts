export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SiblingType = {
  sibling_id: string;
  sibling_name: string;
  sibling_birth_date: Date;
};

export type ChildrenType = {
  child_id: string;
  child_name?: string;
  child_birth_date?: Date;
};

export type LatestPerson = {
  id: string;
  full_name: string;
  birth_date: Date;
  ancestry: string;
};

export type FullPerson = {
  id: string;
  full_name: string;
  maiden_name?: string;
  gender?: string;
  birth_date?: Date;
  marriage_date?: Date;
  death_date?: Date;
  born_in?: string;
  married_in?: string;
  died_in?: string;
  ancestry?: string;
  father_name?: string;
  mother_name?: string;
  spouse_name?: string;
  father_id?: string;
  mother_id?: string;
  spouse_id?: string;
};

export type PeopleTableType = {
  id: string;
  father?: number;
  mother?: number;
  sibling?: number;
  spouse?: number;
  child?: number;
  gender?: string;
  surname?: string;
  name?: string;
  maiden_naame?: string;
  birth_date?: Date;
  marriage_date?: Date;
  death_date?: Date;
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
