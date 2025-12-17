import { Component, EventEmitter, Output } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";
import { UserService } from "../../services/user.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NotifyStates } from "../../interfaces/notify.interface";

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
    @Output() note = new EventEmitter<{ message: string, type: NotifyStates }>();

    constructor(private service: UserService) { };
    user: UserInterface = { id: 0, name: '', password: '' };

    isStartLogging: boolean = false;
    isRegister: boolean = false;

    register(): void {
        this.user.id = Date.now();
        if (this.user.name.trim() && this.user.password.trim()) {
            let is = this.service.registerUser(this.user);

            this.service.currentUserInit(this.user);
            if (is) {
                this.reg.emit({ 
                    id: this.user.id, 
                    name: this.user.name, 
                    password: this.user.password 
                });
                this.note.emit({
                    message: "Успешная регистрация!",
                    type: NotifyStates.SUCCESS,
                });
            }
            else {
                this.note.emit({
                    message: "Вы уже зарегистрированы.",
                    type: NotifyStates.INFO,
                });
            }
        }
        else
            console.log("Введи пароль, чубатый");

        this.isStartLogging = false;

        this.user.id = 0; 
        this.user.name = ''; 
        this.user.password = '';
    }

    logIn(): void {
        let id = this.service.logIn(this.user);
        if (id == -1) {
            console.log("Ну-ка выйди и зайди нормально. ");
            this.user.id = -1;
            this.note.emit({
                message: "Ну-ка выйди и зайди нормально. ",
                type: NotifyStates.ERROR,
            })
        }
        else if (id == 0) {
            this.note.emit({
                message: "Вы уже в системе. ",
                type: NotifyStates.INFO,
            })
        }
        else {
            this.user.id = id;
            console.log("Вошёл юзер: ", this.user.name);
            this.service.currentUserInit(this.user);
            this.note.emit({
                message: "Успешный вход!",
                type: NotifyStates.SUCCESS,
            })
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
