export class LineOfBusinessModel {
  constructor(
    public id: string,
    public code: string,
    public line_of_business: string,
    public application_type: string,
    public units: number,
    public capital_investment: number,
    public gross_essential: number,
    public gross_non_essential: number,
    public remarks: string,
  ) {
    return {
      id,
      code,
      line_of_business,
      application_type,
      units,
      capital_investment,
      gross_essential,
      gross_non_essential,
      remarks,
    }
  }
}