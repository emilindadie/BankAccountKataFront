export class CreateOperation {
    accountId!: number;
    amount!: number;

    validProperty(): boolean {
        if (this.accountId && this.amount) {
            return true;
        }
        return false;
    }
}
