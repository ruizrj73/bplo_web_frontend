export class LineOfBusinessMeasurePaxModel {
  constructor(
    public id: string,
    public line_of_business: string,
    public measure_description: string,
    public number_of_units: number,
    public capacity: number,
    public remarks: string,
  ) {
    return {
      id,
      line_of_business,
      measure_description,
      number_of_units,
      capacity,
      remarks,
    }
  }
}