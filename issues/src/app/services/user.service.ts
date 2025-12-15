import { Injectable, numberAttribute } from "@angular/core";
import { UserInterface } from "../interfaces/user.interface";
import { iterator } from "rxjs/internal/symbol/iterator";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    getKey(id: number, name: string): string {
        const key = id.toString() + '|' + name;
        return key;
    }

    saveUser(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    getUserPassword(key: string): string | null{
        const user = localStorage.getItem(key);
        if (user) 
            return user;

        return null;
    }

    registerUser(user: UserInterface): void {
        const key = this.getKey(user.id, user.name);
        const pwd = this.getUserPassword(key);
        if (pwd == null)
            this.saveUser(key, user.password);
        else 
            console.log("Вы уже зарегестрированы.");
    }

    logIn(user: UserInterface): boolean {
        const key = this.getKey(user.id, user.name);
        const pwd = this.getUserPassword(key);
        if (pwd == null) {
            console.log("Зарегистрируйтесь.");
            return false
        }
        else if (user.password === pwd)
            return true;

        console.log("Неверный пароль.");
        return false;
    }
}
