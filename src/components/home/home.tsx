import React, { useState, useEffect } from 'react';
import { useStyles } from './style';
import AccountRepository from '../../repositories/account';
import CommonFunction from '../../common/common';
import { IAccount } from '../../models/account/account.i';
import { Fab, Button, Card, CardContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreateAccount } from '../../models/account/createAccount';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthState, AuthAction } from '../../reducers/auth';

function Home(props: any) {
    const classes = useStyles();
    const [accounts, setAccounts] = useState(new Array<IAccount>());
    const [canRequest, setCanRequest] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [accountName, setAccountName] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            if (props.state.user) {
                 await getAccountsHandler(Number(props.state.user.id));
            }
        };
        if (canRequest) {
            fetchData();
        }
    }, [props.state.user]);

    async function getAccountsHandler(userId: any) {
        let hasData = false;
        while (!hasData) {
            let error: any = await getAccountByUserId(userId);
            if (error && error.message === 'Request failed with status code 401') {
                error = await CommonFunction.getNewToken();
                if (error && error.message === 'Request failed with status code 401') {
                    CommonFunction.logoutAction(props, history);
                }
            } else {
                hasData = true;
            }
        }
    }

    async function getAccountByUserId(userId: number) {
        try {
            const res = await AccountRepository.getAccountByUserId(userId);
            setAccounts(res.data.data);
            setCanRequest(false);
        } catch (e) {
            return e;
        }
    }

    async function saveAccountHandler(createAccount: CreateAccount) {
        let hasSave = false;
        while (!hasSave) {
            let saveAccountError: any = saveAccount(createAccount);
            if (saveAccountError && saveAccountError.message === 'Request failed with status code 401') {
                saveAccountError = await CommonFunction.getNewToken();
                if (saveAccountError && saveAccountError.message === 'Request failed with status code 401') {
                    CommonFunction.logoutAction(props, history);
                }
                hasSave = true;
            } else {
                hasSave = true;
            }
        }
    }

    async function saveAccount(createAccount: CreateAccount) {
        try {
            const saveAccountResponse = await AccountRepository.createAccount(createAccount);
        } catch (e) {
            return e;
        }
    }

    const handleClickOpen = () => {
        setAccountName('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function save() {
        const createAccount = new CreateAccount();
        createAccount.user = props.state.user!;
        createAccount.name = accountName;
        saveAccountHandler(createAccount);
        getAccountsHandler(Number(props.state.user.id));
    }

    const goToOperation = (account: IAccount) => {
        history.push('home/' + Number(account.id) + '/operation', { account });
    };

    return (
        <div className={classes.homeContainer}>
            <h1 className={classes.title}>Welcome  {props.state.user!.name}</h1>
            {
                accounts.map((account: IAccount, index) => (
                    <div className='account-row' key={index}>
                        <Card className={classes.card} onClick={() => goToOperation(account)}>
                            <CardContent>
                                <span>{account.name}</span>
                                <span className={classes.spanRight}>{account.solde}  €</span>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
            <Fab color='primary' data-testid='open_new_account_dialog' aria-label='add' className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <form noValidate autoComplete='off' onSubmit={save}>
                    <DialogTitle id='form-dialog-title'>Create account</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            For create a new bank account, please taped account name below.
                    </DialogContentText>
                        <TextField
                            id='create_account_name_input'
                            data-testid='create_account_name_input'
                            autoFocus
                            margin='dense'
                            label='Account name'
                            name='accountName'
                            value={accountName}
                            onChange={event => setAccountName(event.target.value)}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='primary'>
                            Cancel
                    </Button>
                        <Button data-testid='create_account_submit_btn' type='submit' color='primary' disabled={!accountName}>
                            Create
                    </Button>
                    </DialogActions>
                </form>
            </Dialog>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
