export class SetupMeasurePaxModel {
  constructor(
    public id: string,
    public code: string,
    public description: string,
  ) {
    return {
      id,
      code,
      description,
    }
  }
}