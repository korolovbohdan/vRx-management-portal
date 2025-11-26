import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {IUserResponse} from '../common/dto/response.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersMapper {
  static toUserModel(data: IUserResponse): User {
    return new User(
      data.id,
      data.name,
      data.role,
      new Date(data.lastLogin)
    )
  }

  static toUserModelList(data: IUserResponse[]): User[] {
    return data.map(UsersMapper.toUserModel);
  }
}

