/**
 * Describes the shape of an account
 */
export interface Users {
  _id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  address: string;
  gender: string;
  blog: string;
  action: string;
  isAccepted: number;
}
