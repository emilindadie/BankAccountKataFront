import { IUser } from '../user/user.i';

export class CreateAccount {
    name!: string;
    user!: IUser;

    validProperty(): boolean {
        if (this.name.length > 0 && this.user) {
            return true;
        }
        return false;
    }
}
