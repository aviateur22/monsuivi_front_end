import { Injectable } from "@angular/core";
import * as shareAction from "./action";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { MessageService } from 'primeng/api';


@Injectable()
export class ShareEffect {

  constructor(private _action$: Actions, private _messageService: MessageService){}
  displayMessage$ = createEffect(()=>
    this._action$.pipe(
      ofType(shareAction.displayMessageAction),
      tap(({message})=>
        this._messageService.add({severity: message.isOnError ? 'error' : 'success', summary: message.title, detail: message.message })
      )
    ),
    { dispatch: false }
  )

}
