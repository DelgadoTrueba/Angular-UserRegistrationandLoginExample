import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from './http.service';
import {Role} from '../models/role.model';

@Injectable()
export class TokensService {
    static END_POINT = '/users/token';

    constructor(private httpService: HttpService) {
    }

    login(user: string, password: string): Observable<any> {
        return this.httpService.login(user, password, TokensService.END_POINT);
    }

    logout(): void {
        this.httpService.logout();
    }

    isAdmin(): boolean {
        return this.httpService.getToken() ? this.httpService.getToken().roles.includes(Role.ADMIN) : false;
    }

    isManager(): boolean {
        return this.httpService.getToken() ? this.httpService.getToken().roles.includes(Role.MANAGER) : false;
    }

    isOperator(): boolean {
        return this.httpService.getToken() ? this.httpService.getToken().roles.includes(Role.OPERATOR) : false;
    }

    getUser(): string {
        return this.httpService.getToken() ? this.httpService.getToken().user : '???';
    }

}