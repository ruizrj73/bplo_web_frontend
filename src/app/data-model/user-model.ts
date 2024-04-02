// ignore_for_file: unnecessary_new, prefer_collection_literals

export class UserModel {
  constructor(
    public id: string,
    public username: string,
    public password: string,
    public empId: string,
    public name: string,
    public userType: string,
    public typeId: string,
    public typeName: string,
  ) {
    return {
      id,
      username,
      password,
      empId,
      name,
      userType,
      typeId,
      typeName,
    }
  }
}