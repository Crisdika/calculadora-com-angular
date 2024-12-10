import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, MatInput, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent {
  title = 'sistema';
  public valor: string = ''

  setNum(numero: string) {    
    if (this.valor === null){ 
      this.valor = numero
    } else
    this.valor = this.valor + numero
  } 

}
