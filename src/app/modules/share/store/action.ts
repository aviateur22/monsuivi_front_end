import { createAction, props } from "@ngrx/store";
import { IFlashMessage } from "./../store/model";

export const displayMessageAction = createAction('[Share display message] display message', props<{message: IFlashMessage}>())
