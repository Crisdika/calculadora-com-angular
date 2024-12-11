import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, MatInput, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistema';
  public temp: boolean = false;
  public valor: string = '';
  public segundoValor: string = '';
  public operacao: string = '';
  public resultado: number = 0;

  setNum(numero: string) {
    if (!this.temp) {
      if (this.valor === null) {
        this.valor = numero;
      } else {
        this.valor = this.valor + numero;
      }
    } else {
      if (this.segundoValor === null) {
        this.segundoValor = numero;
      } else {
        this.segundoValor = this.segundoValor + numero;
      }
    }
  }

  setOperate(operador: string) {
    if (this.valor == '' || this.valor == '0' || this.valor == null) {
      alert('Defina o primeiro valor');
    } else {
      this.temp = true;
      this.operacao = operador;
    }
  }

  getResult() {
    if (this.valor == '' || this.segundoValor == '') {
      alert("Falta valores");
    }
    switch (this.operacao) {
      case '+':
        this.resultado = Number(this.valor) + Number(this.segundoValor);
        break;
      case '-':
        this.resultado = Number(this.valor) - Number(this.segundoValor);
        break;
      case '*':
        this.resultado = Number(this.valor) * Number(this.segundoValor);
        break;
      case '/':
        this.resultado = Number(this.valor) / Number(this.segundoValor);
        break;
      default:
        this.resultado = this.resultado;
    }
    this.valor = '';
    this.segundoValor = '';
    this.operacao = '';
    this.temp = false;
    alert(this.resultado);
  }
}
