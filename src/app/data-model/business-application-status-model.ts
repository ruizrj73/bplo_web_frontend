export class BusinessApplicationStatusModel {
  constructor(
    public id: string,
    public code: string,
    public application_type: string,
    public group: string,
    public msg: BusinessApplicationStatusMessageModel[],
  ) {
    return {
      id,
      code,
      application_type,
      group,
      msg,
    }
  }
}

export class BusinessApplicationStatusMessageModel {
  constructor(
    public id: string,
    public message: string,
  ) {
    return {
      id,
      message,
    }
  }
}