import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, CardContent, MenuItem, Select, InputLabel, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './manage.css';
import { useStyles } from './style';
import AccountService from '../../services/account';
import { IAccount } from '../../models/account/account.i';
import useAuth from '../../contexts/auth';
import OperationService from '../../services/operation';
import { CreateOperation } from '../../models/operation/createOperation';
export function Manage() {
    const {
        state: { user },
    } = useAuth();

    const [accounts, setAccounts] = useState(new Array<IAccount>());
    const [canRequest, setCanRequest] = useState(true);
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [withdraw, setWithdraw] = useState(true);
    const [deposit, setDeposit] = useState(false);
    const [callback, setCallback] = useState('');
    const [error, setError] = useState('');

    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const res = await AccountService.getAccountByUserId(Number(user.id));
                setAccounts(res.data.data);
                setCanRequest(false);
            }
        };
        if (canRequest) {
            fetchData();
        }
    }, []);

    const getSelected = (name: string) => {
        switch (name) {
            case 'withdraw':
                if (withdraw) {
                    return true;
                }
                return false;
            case 'deposit':
                if (deposit) {
                    return true;
                }
                return false;
        }
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setCallback('');
        setError('');
        try {
            let formatAmount = Number(amount);
            if (withdraw) {
                formatAmount = Number('-' + amount);
            }
            const createOperation = new CreateOperation();
            createOperation.accountId = Number(selectedAccountId);
            createOperation.amount = Number(formatAmount);
            const res = await OperationService.createOperation(createOperation);
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setCallback('L\'operation a été réalisé avec succès');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    function disabledButton() {
        if (selectedAccountId.length === 0 || !amount || Number(amount) === 0) {
            return true;
        }
        return false;
    }

    return (
        <div className={classes.manageContainer}>
            <h1 className={classes.title}>Bienvenue  {user!.name}</h1>
            <div className={classes.operationContainer}>
                <Card id='withdraw_card_button' className={`${classes.card} ${getSelected('withdraw') ? classes.selectedCard : ''}`} onClick={
                    event => {
                        setAmount('');
                        setSelectedAccountId('');
                        setWithdraw(true);
                        setDeposit(false);
                    }
                }>
                    <CardContent>
                        <h3>Retrait</h3>
                    </CardContent>
                </Card>
                <Card id='deposit_card_button' className={`${classes.card} ${getSelected('deposit') ? classes.selectedCard : ''}`} onClick={
                    event => {
                        setAmount('');
                        setSelectedAccountId('');
                        setWithdraw(false);
                        setDeposit(true);
                    }
                }>
                    <CardContent>
                        <h3>Depot</h3>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.accountsContainer}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit} className={classes.form}>
                    <InputLabel id='demo-controlled-open-select-label'>Compte</InputLabel>
                    {<Select className={classes.select}
                        labelId='demo-simple-select-label'
                        id='operation_account_select'
                        value={selectedAccountId}
                        onChange={(event: any) => setSelectedAccountId(event.target.value)}
                    >
                        {accounts.map((account: IAccount, index) => (
                            <MenuItem value={account.id}>{account.name}</MenuItem>
                        ))}
                    </Select>}
                    <TextField
                        autoFocus
                        margin='dense'
                        id='operation_amount_input'
                        label='Somme'
                        type='number'
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                        fullWidth
                    />
                    <Button id='operation_submit_button' disabled={disabledButton()} variant='contained' color='primary'
                        type='submit' className={classes.button}>
                        {withdraw ? 'Retirer' : 'Deposer'}
                    </Button>
                </form>
            </div>
            <div className={classes.callBackContainer}>
                <span className={classes.spanCallBack}>
                    {callback}
                </span>
                <span className={classes.spanError}>
                    {error}
                </span>
            </div>
        </div >
    );
}
