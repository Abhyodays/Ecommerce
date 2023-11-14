import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token!:string | null ;
  name?:string;
  role:string = "User";
  constructor(private authService: AuthService, private router: Router,
    private toastService:ToastService, private eventService: EventService) {}

  ngOnInit():void {
    if(this.authService.isTokenExpired()){
      this.toastService.showWarning("Session Expired!");
      this.authService.logout();
    }
    this.authService.getTokenChange().subscribe((token:string|null) =>{
      this.token = token;
      const decodedToken = this.authService.decodedToken(this.token);
      this.name = decodedToken.unique_name;
      this.role = decodedToken.role;
    })
  }
  logout() {
    this.authService.logout();
    this.toastService.showWarning("User logged out");
  }
  isLoggedIn():boolean{
    return !!this.token;
  }
  goToHome(){
    this.eventService.emitGotoHome();
    this.router.navigate(['']);
  }
}
