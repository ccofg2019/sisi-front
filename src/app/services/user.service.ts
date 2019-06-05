import { Paginator } from './../models/paginator.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    register(user: User) {
        return this.http.post(`${environment.API_URL}/api/mobile/users`, user);
    }

    recoverPassword(data) {
        return this.http.post(`${environment.API_URL}/api/mobile/recoverpassword`, data);
    }

    registerFuncionario(user: User) {
        return this.http.post(`${environment.API_URL}/api/users`, user);
    }
    
    public getUsers() {
        return this.http.get(`${environment.API_URL}/api/users`);
    }

    public getUserID(id: number) {
        return this.http.get(`${environment.API_URL}/api/users/${id}`);
    }

    public editarUser(user: User, id: number) {
        return this.http.put(`${environment.API_URL}/api/users/${id}`, user);
    }

    public getUsersPage(paginator: Paginator) {
        return this.http.get(`${environment.API_URL}/api/users?page=${paginator.current_page}`);
   }

    public getUserInformations() {
        return this.http.get<User>(`${environment.API_URL}/api/user/myInformations`);
    }
}
