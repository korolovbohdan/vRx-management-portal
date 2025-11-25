import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from 'shared';
import {CreateUserDto, IQueryUser} from '../common/dto/request.dto';
import {IUserResponse} from '../common/dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpService);
  private readonly baseUrl = '/users';

  /**
   * Get all users
   * @returns Observable of users array
   */
  getUsers(query: IQueryUser): Observable<IUserResponse[]> {
    return this.http.get<IUserResponse[]>(this.baseUrl, {params: query});
  }

  getUsersMock(): Observable<IUserResponse[]> {
    const mockUsers: IUserResponse[] = [];
    return new Observable<IUserResponse[]>(observer => {
      observer.next(mockUsers);
      observer.complete();
    });
  }

  /**
   * Create a new user
   * @param userData User data to create
   * @returns Observable of created user
   */
  createUser(userData: CreateUserDto): Observable<IUserResponse> {
    return this.http.post<IUserResponse>(this.baseUrl, userData);
  }

  /**
   * Delete a user by ID
   * @param id User ID
   * @returns Observable of deletion result
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

