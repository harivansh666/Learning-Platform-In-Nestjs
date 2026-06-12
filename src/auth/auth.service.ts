import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    login(): string {
        return 'hey this is login service';
    }
    register(): string {
        return 'hey this is register service';
    }
}