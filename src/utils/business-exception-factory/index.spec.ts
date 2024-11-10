import { businessExceptionFactory } from '.';

describe('createErrorBusinessFactory', () => {
  // Instantiation of BusinessError with valid name, message, and metaData
  // Create an error class with a specific name and metadata
  it('should create an error class with the given name and metadata', () => {
    const CustomExeption = businessExceptionFactory<{ code: number }>(
      'CustomExeption',
    );
    const errorInstance = new CustomExeption('An error occurred', {
      code: 404,
    });

    expect(errorInstance).toBeInstanceOf(Error);
    expect(errorInstance.name).toBe('CustomExeption');
    expect(errorInstance.message).toBe('An error occurred');
    expect(errorInstance.metaData).toEqual({ code: 404 });
  });

  // Handle empty string as the error name
  it('should handle empty string as the error name', () => {
    const CustomExeption = businessExceptionFactory<null>('');
    const errorInstance = new CustomExeption('An error occurred');

    expect(errorInstance).toBeInstanceOf(Error);
    expect(errorInstance.name).toBe('');
    expect(errorInstance.message).toBe('An error occurred');
    // expect(errorInstance.metaData).toBeNull();
  });

  it('should throw an error', () => {
    const CustomExeption = businessExceptionFactory<{ code: number }>(
      'CustomExeption',
    );

    const fn = () => {
      throw new CustomExeption('An error occurred', { code: 404 });
    };

    expect(fn).toThrowError(
      new CustomExeption('An error occurred', { code: 404 }),
    );
  });
});
