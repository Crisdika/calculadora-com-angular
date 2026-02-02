import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

type Operation = '+' | '-' | '*' | '/';

type ButtonAction = 'digit' | 'operation' | 'equals';

interface CalculatorButton {
  label: string;
  value?: string;
  action: ButtonAction;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatButton, MatInput, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistema';

  readonly buttonRows: CalculatorButton[][] = [
    [
      { label: '1', value: '1', action: 'digit' },
      { label: '2', value: '2', action: 'digit' },
      { label: '3', value: '3', action: 'digit' },
      { label: '+', value: '+', action: 'operation' }
    ],
    [
      { label: '4', value: '4', action: 'digit' },
      { label: '5', value: '5', action: 'digit' },
      { label: '6', value: '6', action: 'digit' },
      { label: '-', value: '-', action: 'operation' }
    ],
    [
      { label: '7', value: '7', action: 'digit' },
      { label: '8', value: '8', action: 'digit' },
      { label: '9', value: '9', action: 'digit' },
      { label: '*', value: '*', action: 'operation' }
    ],
    [
      { label: '.', value: '.', action: 'digit' },
      { label: '0', value: '0', action: 'digit' },
      { label: '=', action: 'equals' },
      { label: '/', value: '/', action: 'operation' }
    ]
  ];

  private enteringSecondValue = false;
  private firstValue = '';
  private secondValue = '';
  private operation: Operation | null = null;

  get displayValue(): string {
    return this.enteringSecondValue ? this.secondValue : this.firstValue;
  }

  onButtonClick(button: CalculatorButton): void {
    switch (button.action) {
      case 'digit':
        if (button.value) {
          this.appendDigit(button.value);
        }
        break;
      case 'operation':
        if (button.value) {
          this.setOperation(button.value as Operation);
        }
        break;
      case 'equals':
        this.calculateResult();
        break;
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  private appendDigit(digit: string): void {
    const currentValue = this.enteringSecondValue ? this.secondValue : this.firstValue;

    if (digit === '.' && currentValue.includes('.')) {
      return;
    }

    const updatedValue = currentValue ? `${currentValue}${digit}` : digit;

    if (this.enteringSecondValue) {
      this.secondValue = updatedValue;
    } else {
      this.firstValue = updatedValue;
    }
  }

  private setOperation(operation: Operation): void {
    if (!this.firstValue) {
      alert('Defina o primeiro valor');
      return;
    }

    if (this.operation && this.secondValue) {
      this.calculateResult(false);
    }

    this.enteringSecondValue = true;
    this.operation = operation;
  }

  private calculateResult(showAlert: boolean = true): void {
    if (!this.firstValue || !this.secondValue) {
      alert('Falta valores');
      return;
    }

    if (!this.operation) {
      return;
    }

    const first = Number(this.firstValue);
    const second = Number(this.secondValue);

    if (Number.isNaN(first) || Number.isNaN(second)) {
      alert('Valores inválidos');
      return;
    }

    const result = this.applyOperation(this.operation, first, second);

    if (showAlert) {
      alert(result);
      this.resetCalculator();
      return;
    }

    this.firstValue = String(result);
    this.secondValue = '';
    this.enteringSecondValue = true;
  }

  private applyOperation(operation: Operation, first: number, second: number): number {
    switch (operation) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
    }
  }

  private resetCalculator(): void {
    this.firstValue = '';
    this.secondValue = '';
    this.operation = null;
    this.enteringSecondValue = false;
  }
}
