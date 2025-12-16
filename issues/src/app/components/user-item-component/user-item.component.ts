import { Component, EventEmitter, Output } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './user-item.html',
    styleUrls: ['./user-item.scss']
})

export class User {
    /**
     * Событие reg информирует компонент задач о входе пользователя в систему. 
     */
    @Output() reg = new EventEmitter<{ id: number, name: string, password: string }>();

    constructor(private service: UserService) { };
    user: UserInterface = { id: 0, name: '', password: '' };

    isStartLogging: boolean = false;
    isRegister: boolean = false;

    register(): void {
        this.user.id = Date.now();
        if (this.user.name.trim() && this.user.password.trim()) {
            this.service.registerUser(this.user);

            this.service.currentUserInit(this.user);
            this.reg.emit({ 
                id: this.user.id, 
                name: this.user.name, 
                password: this.user.password 
            });
        }
        else
            console.log("Введи пароль, чубатый");

        this.isStartLogging = false;

        this.user.id = 0; 
        this.user.name = ''; 
        this.user.password = '';
    }

    logIn(): void {
        /**
         * user потом не сможет войти! Он не знает старый id. 
         * Возможно придётся упростить систему до имени. 
         * 
         * Изменено: вроде пофиксил, но не тестировал. 
         * 
         * Изменено 2: нет, это проблема. Добавил отдельную issue. 
         * 
         * Изменено 3: пофиксил - регистрация по имени. 
         */
        let id = this.service.logIn(this.user); // дописать 
        if (id == -1) {
            console.log("Ну-ка выйди и зайди нормально. ");
            this.user.id = -1;
        }
        else {
            this.user.id = id;
            this.service.currentUserInit(this.user);
            this.reg.emit({ 
                id: this.user.id, 
                name: this.user.name, 
                password: this.user.password 
            });
        }
        
        this.isStartLogging = false;

        this.user.id = 0; 
        this.user.name = ''; 
        this.user.password = '';
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
