import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`${environment.API_URL}/api/mobile/users`, user);
    }
}
