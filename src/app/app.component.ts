import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // loadedFeature = 'recipe';
  
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin(); // si el usuario ingrese a su cuenta y recarga la pagina no se borrara el usario o token y no tendra que ingresar de nuevo desde cero
  }



}
