import { Injectable } from '@angular/core';
import { ILoginDto, ILoginResponseDto, IRegsiterDto, IRegsiterResponseDto } from '../models/auth.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import apiUrl from '../../../../misc/api.url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(dto: ILoginDto): Observable<ILoginResponseDto>  {
    return this._http.post<ILoginResponseDto>(apiUrl.login.url, dto);
  }

  register(dto: IRegsiterDto): Observable<IRegsiterResponseDto>  {
    return this._http.post<IRegsiterResponseDto>(apiUrl.register.url, dto);
  }


}
