import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { firstValueFrom } from 'rxjs';

@Service()
export class ServiceAuth {
    private baseUrl = "http://localhost:3000/api/auth"
    private httpClient = inject(HttpClient)

    registrarUsuario(user: IUser){
        return firstValueFrom(this.httpClient.post<IUser>(`${this.baseUrl}/registro`, user))
    }

    loginUsuario(email: String, password: String){
        return firstValueFrom(this.httpClient.post(`${this.baseUrl}/login`, {
            "email": email,
            "password": password
        }))
    }
}
 