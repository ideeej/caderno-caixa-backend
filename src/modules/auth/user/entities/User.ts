import { randomUUID } from "crypto";
import { Replace } from "src/utils/replace";

interface UserSchema {
    email: string
    password: string
    name: string
    createdAt: Date;

}

export class User {
    private props: UserSchema;
    private _id: string

    constructor(props: Replace<UserSchema, {createdAt?:Date}>, id?:string) {
        this.props = {
            ...props,
            createdAt: props.createdAt || new Date()
        };
        this._id = id || randomUUID();

    }

    get id() {
        return this._id;
    }

    get email() {
        return this.props.email;
    }

    set email(email) {
        this.props.email = email
    }

    get password() {
        return this.props.password;
    }

    set password(password) {
        this.props.password = password
    }

    get name() {
        return this.props.name;
    }

    set name(name) {
        this.props.name = name;
    }

    get createdAt() {
        return this.props.createdAt;
    }
}