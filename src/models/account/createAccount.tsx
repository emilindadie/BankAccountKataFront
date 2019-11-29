import { IUser } from '../user/user.i';
import { user } from '../../tests-files';

export class CreateAccount {
    name!: string;
    user!: IUser;

    validProperty(): boolean {
        if (this.name.length > 0 && user) {
            return true;
        }
        return false;
    }
}
