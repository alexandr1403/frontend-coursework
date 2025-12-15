import { Component } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [FormsModule],
    templateUrl: 'user-item.html',
    styleUrls: ['user-item.scss']
})

export class User {

    constructor(private service: UserService) { };
    user: UserInterface = { id: 0, name: '', password: '' };

    register(): void {
        this.user.id = Date.now();
        this.service.registerUser(this.user);
    }

    logIn(): void {
        /**
         * user потом не сможет войти! Он не знает старый id. 
         * Возможно придётся упростить систему до имени. 
         */
        let id = this.service.logIn(this.user); // дописать 
        if (id == -1) 
            console.log("Ну-ка выйди и зайди нормально. ");
        else
            this.user.id = id;
    }

}
