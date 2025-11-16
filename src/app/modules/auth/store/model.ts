import { Seller } from "../models/auth.model"

export interface ILogin {
  actifSeller: Seller | null,
  isLoading: boolean,
  isSuccess: boolean
}


