import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable()
export class StorageService {
    private storageSub = new Subject<string>();

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, value);

        this.storageSub.next(key);
    }

    getItem<T>(key: string) {
        return <T>JSON.parse(localStorage.getItem(key))
    }

    removeItem(key: string) {
        localStorage.removeItem(key);

        this.storageSub.next(key);
    }
}