import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignupUser } from '../models/signupUser.model';
import { LoginUser } from '../models/login-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenChange = new BehaviorSubject<string|null>(this.getToken());
  private url = 'https://localhost:5001/account';
  constructor(private http: HttpClient, private router: Router) {
  }

  signup(user: SignupUser): Observable<any> {
    return this.http.post<any>(`${this.url}/signup`, user);
  }

  login(user: LoginUser): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  logout() {
    this.removeToken();
    this.router.navigate([''])
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenChange.next(token);
  }
  removeToken(){
    localStorage.clear();
    this.tokenChange.next(null);
  }
  getToken(): string {
    return localStorage.getItem('token')!;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  isTokenExpired(){
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.getToken());
  }
  
  public decodedToken(token:string|null) {
    if(!token){
      return '';
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  getTokenChange():BehaviorSubject<string|null>{
    return this.tokenChange;
  }
  
}
