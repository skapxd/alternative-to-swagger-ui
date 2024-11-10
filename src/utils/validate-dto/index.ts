import { validate, ValidationError } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { businessExceptionFactory } from '../business-exception-factory';

export const ValidateDTOException = businessExceptionFactory<ValidationError[]>(
  'ValidateDTOException',
);

export type ValidateDTO = <T extends object, U extends T>(
  input: T,
  cls: ClassConstructor<U>,
  exception?: Error,
) => Promise<U>;

export const validateDTO: ValidateDTO = async (input, cls, exception) => {
  const dto = plainToInstance(cls, input);

  const errors = await validate(dto);

  if (errors.length > 0) {
    if (exception) {
      exception.cause = errors;
      throw exception;
    }

    throw new ValidateDTOException('Error in validations is found', errors);
  }

  return dto;
};
