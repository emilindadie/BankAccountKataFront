import React, { useEffect } from 'react';
import useAuth from '../../contexts/auth';
import { useStyles } from './style';
import { IAccount } from '../../models/account/account.i';
export function Operation(props: any) {
    const {
        state: { isAuthenticated, user },
        dispatch,
    } = useAuth();


    let account: IAccount;

    const classes = useStyles();

    useEffect(() => {
    }, []);
    return (
        <div className={classes.operationContainer}>
            <h1 className={classes.title}>Historique du compte : {props!.location.state.account.name} </h1>
        </div>
    );
}
