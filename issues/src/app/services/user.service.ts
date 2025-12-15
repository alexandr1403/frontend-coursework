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
        const key = this.getKey(user.id, user.name);
        const pwd = this.getUser(key)?.password;
        if (pwd == null)
            this.saveUser(key, user);
        else 
            console.log("Вы уже зарегестрированы.");
    }

    logIn(user: UserInterface): number {
        const key = this.getKey(user.id, user.name);
        const pwd = this.getUser(key)?.password;
        if (pwd == null) {
            console.log("Зарегистрируйтесь.");
            return -1;
        }
        else if (user.password === pwd)
            return user.id;

        console.log("Неверный пароль.");
        return -1;
    }
}
