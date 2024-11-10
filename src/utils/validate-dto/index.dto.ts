import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
  ValidationError 
} from 'class-validator';
import { Type } from 'class-transformer';

import { businessExceptionFactory } from '../business-exception-factory';
import { Primitives } from '../utility-types/to-primitive';
import { validateDTO } from '.';

export const PersonException =
  businessExceptionFactory<ValidationError[]>('PersonException');

export class ContactInterNational {
  @IsString()
  type: 'international';

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  whatsApp: string;
}

export class ContactNational {
  @IsString()
  type: 'national';

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

export class Person {
  @IsString()
  name: string;

  /** Esta propiedad debería ser de números positivos */
  @IsNumber()
  @IsPositive()
  age: number;

  @IsOptional()
  @ValidateNested()
  @Type((e) => {
    if (e?.object.contact?.type === 'international') {
      return ContactInterNational;
    }

    return ContactNational;
  })
  contact?: ContactNational | ContactInterNational;

  async copyWith(args: Partial<Primitives<Person>>) {
    const dto = await Person.create({ ...this, ...args });

    return dto;
  }

  static async create(args: Primitives<Person>) {
    const dto = await validateDTO(
      args,
      Person,
      new PersonException('Error in validations is found'),
    );

    return dto;
  }
}
