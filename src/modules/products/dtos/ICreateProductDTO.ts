export default interface ICreateProductDTO{
  bar_code: string;
  title: string;
  description: string;
  unit_of_measurement: string;
  quantity_in_units: number;
  buy_price: number;
  sale_price: number;
}
