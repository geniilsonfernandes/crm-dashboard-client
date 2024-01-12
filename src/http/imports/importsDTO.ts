export interface IImportDTO {
  data: {
    id: string;
    name: string;
    created_at: string;
    deleted_at: string;
    import_status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  }[];
}
