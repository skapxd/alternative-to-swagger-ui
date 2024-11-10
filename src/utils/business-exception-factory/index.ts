type MetaData<T> = T extends null | undefined ? Partial<T> : Required<T>;

class BusinessException<T> extends Error {
  metaData: MetaData<T>;

  constructor(name: string, message: string, metaData: MetaData<T>) {
    super(message);
    this.name = name;
    this.metaData = metaData;
  }
}

export const businessExceptionFactory = <T>(name: string) => {
  return class BusinessExceptionFactory extends BusinessException<T> {
    constructor(message: string, metaData: MetaData<T> = {} as MetaData<T>) {
      super(name, message, metaData);
    }
  };
};
