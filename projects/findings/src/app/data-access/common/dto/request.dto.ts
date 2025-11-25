export interface IQueryFinding {
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  assetId?: string;
  severity?: string;
  status?: string;
}
