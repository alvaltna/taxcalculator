import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsPositiveValue implements ValidatorConstraintInterface {
  validate(value: number) {
    return value > 0;
  }

  defaultMessage() {
    return 'Value must be positive!';
  }
}