import { Injectable } from "@angular/core";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    currentUser: UserInterface = { id: 0, name: '', password: '' };

    currentUserInit(user: UserInterface): void {
        this.currentUser.id = user.id;
        this.currentUser.name = user.name;
        this.currentUser.password = user.password;
    }

    setKey(id: number, name: string): string {
        const key = id.toString() + '|' + name;
        return key;
    }

    saveUser(key: string, user: UserInterface): void {
        localStorage.setItem(key, JSON.stringify(user));
    }

    getUser(key: string): UserInterface | null{
        const user = localStorage.getItem(key);
        if (user) {
            let res: UserInterface = JSON.parse(user);
            return res;
        }

        return null;
    }

    registerUser(user: UserInterface): void {
        const key = this.setKey(user.id, user.name);
        const pwd = this.getUser(key)?.password;
        if (pwd == null) {
            this.saveUser(key, user);
            console.log("Успешная регистрация! ");
        }
        else 
            console.log("Вы уже зарегестрированы."); // похоже, else тут невозможен. 
    }

    logIn(user: UserInterface): number {
        const key = this.setKey(user.id, user.name);
        const pwd = this.getUser(key)?.password;
        if (pwd == null) {
            console.log("Зарегистрируйтесь.");
            return -1;
        }
        else if (user.password === pwd) {
            console.log("Успешный вход! ");
            return user.id;
        }

        console.log("Неверный пароль.");
        return -1;
    }

    cleaner(): void {
        localStorage.clear();
    }
}
