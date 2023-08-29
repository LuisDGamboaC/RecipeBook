import { Component } from '@angular/core';

@Component({
  selector: 'app-dark-theme',
  templateUrl: './dark-theme.component.html',
  styleUrls: ['./dark-theme.component.css']
})
export class DarkThemeComponent {
 // src style.scss
  changeThemeColor(){
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark-theme')){
      body.classList.remove('dark-theme');
    } else {
      body.classList.add('dark-theme');
    }
    return true
  }

}

