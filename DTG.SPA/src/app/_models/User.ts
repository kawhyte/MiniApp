import { Photo } from "./Photo";

export interface User {
  // user main view
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  // optional detailed view
  interest?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
}
