import React, { useEffect, useState } from 'react';
import { Card, CardContent, MenuItem, Select, InputLabel, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import './manage.css';
import { useStyles } from './style';
import AccountRepository from '../../repositories/account';
import { IAccount } from '../../models/account/account.i';
import OperationRepository from '../../repositories/operation';
import { CreateOperation } from '../../models/operation/createOperation';
import { connect } from 'react-redux';
import { AuthState, AuthAction } from '../../reducers/auth';
import { useHistory } from 'react-router-dom';
import CommonFunction from '../../common/common';
import { ApiResponse } from '../../models/apiResponse/apiResponse';
import { IOperation } from '../../models/operation/operation.i';
import { replaceCookie, getLocalStorageValue, replaceLocalStorage } from '../../utils';
import { user } from '../../tests-files';

function Manage(props: any) {
    const [accounts, setAccounts] = useState(new Array<IAccount>());
    const [canRequest, setCanRequest] = useState(true);
    const [selectedAccountId, setSelectedAccountId] = useState('');
    const [amount, setAmount] = useState('');
    const [withdraw, setWithdraw] = useState(true);
    const [deposit, setDeposit] = useState(false);
    const [callback, setCallback] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            if (props.state.user) {
                await getAccountByUserIdHandler(props.state.user.id);
            }
        };
        if (canRequest) {
            fetchData();
        }
    }, []);

    async function getAccountByUserIdHandler(userId: any) {
            const getAccountResponse = await getAccountByUserId(userId);
            if (getAccountResponse.error && getAccountResponse.error.message === 'Request failed with status code 401') {
                replaceCookie('accessToken', getLocalStorageValue('refreshToken'));
                const getNewTokenResponse = await CommonFunction.getNewToken();
                if (getNewTokenResponse.error && getNewTokenResponse.error.message === 'Request failed with status code 401') {
                    CommonFunction.logoutAction(props, history);
                } else {
                    replaceCookie('accessToken', getNewTokenResponse!.data!.accessToken);
                    replaceLocalStorage('refreshToken', getNewTokenResponse!.data!.refreshToken);
                    await getAccountByUserIdHandler(userId);
                }
            } else {
                updateAccountView(getAccountResponse!.data!);
            }
    }

    async function getAccountByUserId(userId: number) {
        try {
            const data = await AccountRepository.getAccountByUserId(userId);
            return data.data;
        } catch (e) {
            const errorResponse: ApiResponse<IAccount[]> = {error : e};
            return errorResponse;
        }
    }

    function updateAccountView(accounts: IAccount[]) {
        setAccounts(accounts);
        setCanRequest(false);
    }

    async function updateAccountHandler(createOperation: CreateOperation) {
        const updateAccountResponse = await updateAccount(createOperation);
        if (updateAccountResponse.error && updateAccountResponse.error.message === 'Request failed with status code 401') {
            replaceCookie('accessToken', getLocalStorageValue('refreshToken'));
            const getNewTokenResponse = await CommonFunction.getNewToken();
            if (getNewTokenResponse.error && getNewTokenResponse.error.message === 'jwt expired') {
                CommonFunction.logoutAction(props, history);
            } else {
                replaceCookie('accessToken', getNewTokenResponse!.data!.accessToken);
                replaceLocalStorage('refreshToken', getNewTokenResponse!.data!.refreshToken);
                await updateAccountHandler(createOperation);
            }
        } else if (updateAccountResponse.error && updateAccountResponse.error.message !== 'Request failed with status code 401') {
            setError(updateAccountResponse.error.message);
        } else {
            updateCallBackView(updateAccountResponse!);
        }
    }

    async function updateAccount(createOperation: CreateOperation) {
        try {
            const response = await OperationRepository.createOperation(createOperation);
            return response.data;
        } catch (e) {
            const errorResponse: ApiResponse<IOperation> = {error : e};
            return errorResponse;
        }
    }

    function updateCallBackView(response: ApiResponse<IOperation>) {
        if (response!.error) {
            setError(response!.error!.message);
        } else {
            setCallback('Operation has been done with success');
        }
    }

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
        let formatAmount = Number(amount);
        if (withdraw) {
            formatAmount = Number('-' + amount);
        }
        const createOperation = new CreateOperation();
        createOperation.accountId = Number(selectedAccountId);
        createOperation.amount = Number(formatAmount);
        updateAccountHandler(createOperation);
    };

    function disabledButton() {
        if (selectedAccountId.length === 0 || !amount || Number(amount) === 0) {
            return true;
        }
        return false;
    }

    function resetInput() {
        setAmount('');
        setSelectedAccountId('');
        setCallback('');
        setError('');
    }

    return (
        <div className={classes.manageContainer}>
            <h1 className={classes.title}>Welcome  {props.state.user!.name}</h1>
            <div className={classes.operationContainer}>
                <Card id='withdraw_card_button' className={`${classes.card} ${getSelected('withdraw') ? classes.selectedCard : ''}`} onClick={
                    event => {
                        setWithdraw(true);
                        setDeposit(false);
                        resetInput();
                    }
                }>
                    <CardContent>
                        <h3>WithDraw</h3>
                    </CardContent>
                </Card>
                <Card id='deposit_card_button' className={`${classes.card} ${getSelected('deposit') ? classes.selectedCard : ''}`} onClick={
                    event => {
                        setWithdraw(false);
                        setDeposit(true);
                        resetInput();
                    }
                }>
                    <CardContent>
                        <h3>Deposit</h3>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.accountsContainer}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit} className={classes.form}>
                    <InputLabel id='demo-controlled-open-select-label'>Account</InputLabel>
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
                        label='Amount'
                        type='number'
                        value={amount}
                        onChange={event => setAmount(event.target.value)}
                        fullWidth
                    />
                    <Button id='operation_submit_button' disabled={disabledButton()} variant='contained' color='primary'
                        type='submit' className={classes.button}>
                        {withdraw ? 'WithDraw' : 'Deposit'}
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

const mapStateToProps = (state: AuthState) => {
    return {state};
};

const mapDispatchToProps = (dispatch: React.Dispatch<AuthAction>) => {
    return {
        dispatch: (action: AuthAction) => dispatch(action),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manage);
