import {FormControl, ValidationErrors} from '@angular/forms';
export class CustomValidators {
  static cpfNumber(control: FormControl): ValidationErrors {
    let multipliers = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    let value = control.value.replace(/\D+/g, '');
    if (value.length === 11) {
      control.markAsTouched();
      let total = value.split('').reduce((total, item) => {
        return total += parseFloat(item)
      }, 0.0);
      total /= 11;
      if (total == value[0]) {
        return {cpfRule: {value: control.value, message: 'CPF inválido'}};
      }
      let digit = value.substr(value.length - 2, value.length);
      let cpf = value.substr(0, value.length - 2);
      total = multipliers.reduce((total, multipler, index) => {
        return total + (cpf[index] * multipler);
      }, 0);
      let firstDigit = total % 11;
      if (firstDigit < 2) {
        firstDigit = 0;
      } else {
        firstDigit = 11 - firstDigit;
      }
      cpf += firstDigit;
      multipliers.unshift(11);
      total = multipliers.reduce((total, multipler, index) => {
        return total + (cpf[index] * multipler);
      }, 0);
      let secondDigit = (total % 11);
      if (secondDigit < 2) {
        secondDigit = 0;
      } else {
        secondDigit = 11 - secondDigit;
      }
      let calculatedDigit = `${firstDigit}${secondDigit}`;
      if (calculatedDigit === digit) {
        return null;
      } else {
        return {cpfRule: {value: control.value, message: 'CPF inválido'}};
      }
    } else {
      return {
        minLength: {
          requiredLength: 11,
          actualLength: value.length,
          message: `O tamanho mínimo é de 11 caracteres`
        }
      }
    }
  }
}