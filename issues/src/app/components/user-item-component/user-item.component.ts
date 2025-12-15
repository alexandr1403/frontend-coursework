import { Component } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
    templateUrl: 'user-item.html',
    styleUrls: ['user-item.scss']
})

export class User {

    constructor(private service: UserService){ };
    user: UserInterface = { id: 0, name: '', password: '' };

    register(): void {
        this.service.registerUser(this.user);
    }

    logIn(): void {
        const is = this.service.logIn(this.user);
    }
}
