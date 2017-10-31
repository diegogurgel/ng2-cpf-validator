"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.cpfNumber = function (control) {
        var multipliers = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        var value = control.value.replace(/\D+/g, '');
        if (value.length === 11) {
            control.markAsTouched();
            var total = value.split('').reduce(function (total, item) {
                return total += parseFloat(item);
            }, 0.0);
            total /= 11;
            if (total == value[0]) {
                return { cpfRule: { value: control.value, message: 'CPF inválido' } };
            }
            var digit = value.substr(value.length - 2, value.length);
            var cpf_1 = value.substr(0, value.length - 2);
            total = multipliers.reduce(function (total, multipler, index) {
                return total + (cpf_1[index] * multipler);
            }, 0);
            var firstDigit = total % 11;
            if (firstDigit < 2) {
                firstDigit = 0;
            }
            else {
                firstDigit = 11 - firstDigit;
            }
            cpf_1 += firstDigit;
            multipliers.unshift(11);
            total = multipliers.reduce(function (total, multipler, index) {
                return total + (cpf_1[index] * multipler);
            }, 0);
            var secondDigit = (total % 11);
            if (secondDigit < 2) {
                secondDigit = 0;
            }
            else {
                secondDigit = 11 - secondDigit;
            }
            var calculatedDigit = "" + firstDigit + secondDigit;
            if (calculatedDigit === digit) {
                return null;
            }
            else {
                return { cpfRule: { value: control.value, message: 'CPF inválido' } };
            }
        }
        else {
            return {
                minLength: {
                    requiredLength: 11,
                    actualLength: value.length,
                    message: "O tamanho m\u00EDnimo \u00E9 de 11 caracteres"
                }
            };
        }
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
//# sourceMappingURL=ng2-cpf-validator.js.map