export class BusinessAttachmentModel {
  constructor(
    public id: string,
    public file_type: string,
    public file_name: string,
    public file_description: string,
    public file_url: string,
    public remarks: string,
  ) {
    return {
      id,
      file_type,
      file_name,
      file_description,
      file_url,
      remarks,
    }
  }
}