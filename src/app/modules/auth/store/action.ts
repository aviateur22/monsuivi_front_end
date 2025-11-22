import { createAction, props } from "@ngrx/store";
import { ILoginDto, ILoginResponseDto, IRegsiterDto, IRegsiterResponseDto } from "../models/auth.dto";
import { ILogin } from "./model";
import { Seller } from "../models/auth.model";

export const loginAction = createAction('[Login] login', props<{ login: ILoginDto }>());
export const loginActionComplete = createAction('[loginActionComplete] login Action Complete', props<{ dto: ILoginResponseDto }>());
export const persistActifSellerInStorageAction = createAction('[persistActifSellerInStorageAction]', props<{ actifSeller: Seller, jwt: string}>());
export const loginActionFailed = createAction('[loginActionFailed] login Action Failed');
export const registerAction = createAction('[registerAction]', props<{registerInformation: IRegsiterDto}>());
export const registerActionComplete = createAction('[registerActionComplete]', props<{ registerResponse: IRegsiterResponseDto}>());
export const registerActionFailed = createAction('[registerActionFailed]');
export const logoutAction = createAction('[logoutAction]', props<{sellerId: string}>());
export const deleteSellerFromStorageAction = createAction('[deleteSellerFromStorageAction]');


