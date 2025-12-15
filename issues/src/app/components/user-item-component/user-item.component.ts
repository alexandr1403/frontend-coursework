import { Component, EventEmitter, Output } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: 'user-item.html',
    styleUrls: ['user-item.scss']
})

export class User {
    @Output() reg = new EventEmitter<{ id: number, name: string, password: string }>();

    constructor(private service: UserService) { };
    user: UserInterface = { id: 0, name: '', password: '' };

    isStartLogging: boolean = false;
    isRegister: boolean = false;

    register(): void {
        this.user.id = Date.now();
        this.service.registerUser(this.user);
        this.isStartLogging = false;
        
        this.reg.emit({ 
            id: this.user.id, 
            name: this.user.name, 
            password: this.user.password 
        });
    }

    logIn(): void {
        /**
         * user потом не сможет войти! Он не знает старый id. 
         * Возможно придётся упростить систему до имени. 
         * 
         * Изменено: вроде пофиксил, но не тестировал. 
         * 
         * Изменено 2: нет, это проблема. Добавил отдельную issue. 
         */
        let id = this.service.logIn(this.user); // дописать 
        if (id == -1) 
            console.log("Ну-ка выйди и зайди нормально. ");
        else
            this.user.id = id;
        
        this.isStartLogging = false;
    }

    startLog(): void {
        this.isStartLogging = true;
        this.isRegister = false;
    }

    startReg(): void {
        this.isStartLogging = true;
        this.isRegister = true;
    }

    cancel(): void {
        this.isStartLogging = false;
    }

    /**
     * Очистка бардака в localstorage
     */
    cleaner(): void {
        this.service.cleaner();
        console.log("Хранилище очищено. ");
    }
}
