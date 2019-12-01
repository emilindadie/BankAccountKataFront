import React, { useState, useEffect } from 'react';
import useAuth from '../../contexts/auth';
import { useStyles } from './style';
import AccountService from '../../services/account';
import { IAccount } from '../../models/account/account.i';
import { Fab, makeStyles, Button, Card, CardContent } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreateAccount } from '../../models/account/createAccount';

export function Home() {
    const {
        state: { isAuthenticated, user },
        dispatch,
    } = useAuth();

    const classes = useStyles();
    const [accounts, setAccounts] = useState(new Array<IAccount>());
    const [canRequest, setCanRequest] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [accountName, setAccountName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const res = await AccountService.getAccountByUserId(Number(user.id));
                    setAccounts(res.data.data);
                    setCanRequest(false);
                } catch (e) { }
            }
        };
        if (canRequest) {
            fetchData();
        }
    }, []);

    const handleClickOpen = () => {
        setAccountName('');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function saveAccount() {
        const createAccount = new CreateAccount();
        createAccount.user = user!;
        createAccount.name = accountName;
        const saveAccount = await AccountService.createAccount(createAccount);
        const accountsResponse = await AccountService.getAccountByUserId(Number(user!.id));
        setAccounts(accountsResponse.data.data);
        setOpen(false);
    }

    return (
        < div >
            <h1 className={classes.title}>Bienvenue  {user!.name}</h1>
            {
                accounts.map((account: IAccount, index) => (
                    <div className='account-row' key={index}>
                        <Card className={classes.card}>
                            <CardContent>
                                <span>{account.name}</span>
                                <span className={classes.spanRight}>{account.solde}  euro</span>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
            <Fab data-testid='open_new_account_dialog' color='primary' aria-label='add' className={classes.fab} onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Création de compte</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pour créer un nouveau compte bancaire, s'il vous plait taper votre nom de compte ci-dessous.
                    </DialogContentText>
                    <TextField
                        id='create_account_name_input'
                        autoFocus
                        margin='dense'
                        label='Nom du compte'
                        type='text'
                        value={accountName}
                        onChange={event => setAccountName(event.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button data-testid='create_account_submit_btn' onClick={saveAccount} color='primary' disabled={!accountName}>
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Home;
