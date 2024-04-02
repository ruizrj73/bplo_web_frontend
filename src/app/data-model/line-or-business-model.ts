export class LineOfBusinessModel {
  constructor(
    public id: string,
    public line_of_business: string,
    public application_type: string,
    public capital_investment: number,
    public gross_essential: number,
    public gross_non_essential: number,
    public measure_description: string,
    public number_of_units: number,
    public capacity: number,
    public remarks: string,
  ) {
    return {
      id,
      line_of_business,
      application_type,
      capital_investment,
      gross_essential,
      gross_non_essential,
      measure_description,
      number_of_units,
      capacity,
      remarks,
    }
  }
}