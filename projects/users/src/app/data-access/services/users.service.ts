import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CreateUserDto, IQueryUser} from '../common/dto/request.dto';
import {IUserResponse} from '../common/dto/response.dto';
import {HttpService} from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // private readonly http = inject(HttpService);
  private readonly baseUrl = '/users';

  /**
   * Get all users
   * @returns Observable of users array
   */
  // getUsers(query: IQueryUser): Observable<IUserResponse[]> {
  //   return this.http.get<IUserResponse[]>(this.baseUrl, {params: query});
  // }

  getUsersMock(query?: IQueryUser): Observable<IUserResponse[]> {
    const mockUsers: IUserResponse[] = [
      {id: '1', name: 'John Doe', role: 'admin', lastLogin: '2024-01-15T10:30:00Z'},
      {id: '2', name: 'Jane Smith', role: 'user', lastLogin: '2024-01-14T15:20:00Z'},
      {id: '3', name: 'Bob Johnson', role: 'user', lastLogin: '2024-01-13T09:10:00Z'},
    ];
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
  // createUser(userData: CreateUserDto): Observable<IUserResponse> {
  //   return this.http.post<IUserResponse>(this.baseUrl, userData);
  // }

  /**
   * Create a new user (mock version for testing)
   * @param userData User data to create
   * @returns Observable of created user
   */
  createUserMock(userData: CreateUserDto): Observable<IUserResponse> {
    const newUser: IUserResponse = {
      id: String(Date.now()),
      name: userData.name,
      role: userData.role,
      lastLogin: new Date().toISOString()
    };
    return new Observable<IUserResponse>(observer => {
      setTimeout(() => {
        observer.next(newUser);
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  /**
   * Delete a user by ID
   * @param id User ID
   * @returns Observable of deletion result
   */
  // deleteUser(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  /**
   * Delete a user by ID (mock version for testing)
   * @param id User ID
   * @returns Observable of deletion result
   */
  deleteUserMock(id: string): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        observer.next(void 0);
        observer.complete();
      }, 500);
    });
  }
}

