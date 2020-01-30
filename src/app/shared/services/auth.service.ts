import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from './app-settings.service';
import { User } from 'src/app/user/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
    constructor(
        private storageService: StorageService,
        httpClient: HttpClient,
        settings: AppSettingsService
    ) {
        super(httpClient, settings);
    }

    login(username: string, password: string) {
        return this.post<any>('api/users/auth', { username, password })
            .pipe(map(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);

                    this.storageService.setItem('user', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        this.storageService.removeItem('user');
    }

    getCurrentUser(): User {
        return this.storageService.getItem<User>('user');
    }

    changePassword(userId: string, password: string) {
        return this.put<any>('api/users/change-password', { userId, password })
            .pipe(map(user => {
                if (user) {
                    user.authdata = window.btoa(user.username + ':' + password);

                    this.storageService.setItem('user', JSON.stringify(user));
                }

                return user;
            }));
    }
}
