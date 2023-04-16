import Card from "./Card";

export default interface User {
  id?: string;
  name?: string;
  email: string;
  password: string;
  businessMan?: boolean;
}
