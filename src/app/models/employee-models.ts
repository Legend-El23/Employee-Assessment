
export interface EmployeeAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface EmployeeCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Employee {
  id: number;
  name: string;
  username: string;
  email: string;
  address: EmployeeAddress;
  phone: string;
  website: string;
  company: EmployeeCompany;
}

export interface NewEmployee {
  name: string;
  email: string;
  phone: string;
  company: string;
  city: string;
}
