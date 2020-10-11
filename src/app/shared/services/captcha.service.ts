import { ApiService } from "./api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpParams } from "@angular/common/http";
@Injectable()
export class CaptchaService extends ApiService {
    public verifyCatcha(userResponse: string): Observable<CaptchaResponse> {
        const params = new HttpParams()
            .set('userResponse', userResponse);

        return this.get<CaptchaResponse>('api/captcha', params);
    }
}

export class CaptchaResponse {
    success: boolean;

    // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    challenge_ts: Date;

    // the package name of the app where the reCAPTCHA was solved
    apk_package_name: string;

    // optional
    errorcodes: [];
}
