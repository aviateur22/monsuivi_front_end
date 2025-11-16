import { createAction, props } from "@ngrx/store";
import { ILoginDto, ILoginResponseDto } from "../models/auth.dto";
import { ILogin } from "./model";
import { Seller } from "../models/auth.model";

export const loginAction = createAction('[Login] login', props<{ login: ILoginDto }>());
export const loginActionComplete = createAction('[loginActionComplete] login Action Complete', props<{ dto: ILoginResponseDto }>());
export const persistActifSeller = createAction('[persistActifSeller]', props<{ actifSeller: Seller, jwt: string}>());
export const loginActionFailed = createAction('[loginActionFailed] login Action Failed');
export const logoutAction = createAction('[logoutAction]');

