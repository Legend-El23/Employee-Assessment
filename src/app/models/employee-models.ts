export interface EmployeeAddress {
street: string;
suite: string;
city: string;
zipcode: string;

geo: {
  lat:  string;
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
  phone: string;
  website: string;

  address: EmployeeAddress;
  company: EmployeeCompany;
}
