import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
import { ApiEndpoint } from '../shared/api-endpoint.model';

@Injectable()
export class UserService {
   
    constructor(private httpService: HttpService) {
    }

    readAll(): Observable<Employee[]> {
        return this.httpService.get(ApiEndpoint.EMPLOYEES);
    }

    update(employee: Employee): Observable<Employee> {
        return this.httpService.put(ApiEndpoint.EMPLOYEES, employee);
    }

}