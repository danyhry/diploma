import {RegistrationRequest} from "./auth/register";
import {Role} from "./role";

export interface User extends RegistrationRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  isActive: string;
  role: Role;
}
