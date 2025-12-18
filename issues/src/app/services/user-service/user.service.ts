import { Injectable } from "@angular/core";
import { UserInterface } from "../../interfaces/user.interface";

@Injectable({
    providedIn: 'root',
})

export class UserService {

    private readonly KEY = 'user-list';

    currentUser: UserInterface = { id: 0, name: '', password: '' };

    currentUserInit(user: UserInterface): void {
        this.currentUser.id = user.id;
        this.currentUser.name = user.name;
        this.currentUser.password = user.password;
    }

    setKey(name: string): string {
        const key = name;
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

    registerUser(user: UserInterface): boolean {
        const key = this.setKey(user.name);
        const pwd = this.getUser(key)?.password;
        if (pwd == null) {
            this.saveUser(key, user);
            this.addUser(user);
            console.log("Успешная регистрация! ");
            return true;
        }
        else {
            console.log("Вы уже зарегестрированы.");
            return false;
        }
    }

    getUsers(): string[] {
        const users = localStorage.getItem(this.KEY);
        return (users)? JSON.parse(users) : [];
    }

    addUser(user: UserInterface): void {
        let users = this.getUsers();
        if (users) {
            users.push(user.name);
            localStorage.setItem(this.KEY, JSON.stringify(users));
        }
    }

    logIn(user: UserInterface): number {
        const key = this.setKey(user.name);
        const pwd = this.getUser(key)?.password;
        const id = this.getUser(key)?.id;

        if (user.password === '') {
            console.log("Введите пароль.");
            this.currentUser.name = '';
            return -2;
        }

        if (pwd == null) {
            console.log("Зарегистрируйтесь.");
            this.currentUser.name = '';
            return -1;
        }
        else if (user.password === pwd) {
            console.log("Пароль с БД: ", pwd);
            if (user.name.localeCompare(this.currentUser.name) === 0) {
                console.log("Вы уже в системе.");
                return 0;
            }
            else {
                console.log("Успешный вход! ");
                return id? id : 0;
            }
        }

        console.log("Неверный пароль.");
        this.currentUser.name = '';
        return 5;
    }

    cleaner(): void {
        localStorage.clear();
    }
}
