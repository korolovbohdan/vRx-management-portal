export interface IQueryUser {
  sort?: string;
  order?: 'asc' | 'desc';
  role?: string;
}

export class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly role: string,
  ) {
  }
}
