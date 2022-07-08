class Customer {
  constructor({id, corporate_name, cnpj, user_id}:Customer) {
      this.id = id;
      this.corporate_name = corporate_name;
      this.cnpj = cnpj;
      this.user_id = user_id;
  }

  id: string;
  corporate_name: string;
  cnpj: string;
  user_id: string;
}

export default Customer;
