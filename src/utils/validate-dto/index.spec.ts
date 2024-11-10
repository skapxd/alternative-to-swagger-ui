import 'reflect-metadata';

import {
  ContactInterNational,
  ContactNational,
  Person,
  PersonException,
} from './index.dto';

describe('param-validation', () => {
  it('should validate a class', async () => {
    const person = await Person.create({ name: 'John', age: 25 });

    expect(person).toBeInstanceOf(Person);
  });

  it('should validate a class with correct name', async () => {
    const person = await Person.create({ name: 'Alice', age: 30 });

    expect(person.name).toBe('Alice');
  });

  it('should validate a class with correct age', async () => {
    const person = await Person.create({ name: 'Bob', age: 40 });

    expect(person.age).toBe(40);
  });

  it('should throw an error for missing age parameter', async () => {
    // @ts-expect-error: ERR
    await expect(Person.create({ name: 'Alice' })).rejects.toThrow(
      PersonException,
    );
  });

  it('should throw an error for negative age parameter', async () => {
    await expect(Person.create({ name: 'Bob', age: -5 })).rejects.toThrow(
      PersonException,
    );
  });

  it('should throw an custom error for negative age parameter', async () => {
    await expect(Person.create({ name: 'Bob', age: -5 })).rejects.toThrow(
      PersonException,
    );
  });

  it('should return a Person instance with optional fields when valid input is provided with contact type national', async () => {
    const result = await Person.create({
      name: 'Alice',
      age: 30,
      contact: {
        type: 'national',
        email: 'alice@example.com',
        phone: '123456789',
      },
    });

    expect(result).toBeInstanceOf(Person);
    expect(result.name).toBe('Alice');
    expect(result.age).toBe(30);
    expect(result.contact).toBeInstanceOf(ContactNational);
    expect(result.contact).toEqual({
      type: 'national',
      phone: '123456789',
      email: 'alice@example.com',
    });
  });

  it('should return a Person instance with optional fields when valid input is provided with contact type international', async () => {
    const result = await Person.create({
      name: 'Alice',
      age: 30,
      contact: {
        type: 'international',
        email: 'alice@example.com',
        whatsApp: '123456789',
      },
    });

    expect(result).toBeInstanceOf(Person);
    expect(result.name).toBe('Alice');
    expect(result.age).toBe(30);
    expect(result.contact).toBeInstanceOf(ContactInterNational);
    expect(result.contact).toEqual({
      type: 'international',
      whatsApp: '123456789',
      email: 'alice@example.com',
    });
  });

  it('should merge provided arguments with existing instance properties', async () => {
    const person = await Person.create({
      name: 'John',
      age: 30,
    });

    const updatedPerson = await person.copyWith({ age: 35 });

    expect(updatedPerson.name).toBe(person.name);
    expect(person.age).toBe(30);
    expect(updatedPerson.age).toBe(35);
  });

  // Converts object properties to JSON string
  it('should convert object properties to JSON string', async () => {
    const person = await Person.create({
      name: 'test',
      age: 25,
      contact: {
        type: 'national',
        email: 'test@restmail.net',
        phone: '1234567890',
      },
    });

    expect(person.contact).toBeInstanceOf(ContactNational);
    expect(person.contact).toEqual({
      type: 'national',
      email: 'test@restmail.net',
      phone: '1234567890',
    });
  });
});
