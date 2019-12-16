import React, { useEffect, useState } from 'react';
import useAuth from '../../contexts/auth';
import { useStyles } from './style';
import BalanceService from '../../repositories/balance';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OperationRepository from '../../repositories/operation';
import { IOperation } from '../../models/operation/operation.i';
import moment from 'moment';

export function Operation(props: any) {
    const {
        state: { isAuthenticated, user },
        dispatch,
    } = useAuth();

    const [canRequest, setCanRequest] = useState(true);
    const [balance, setBalance] = useState(0);
    const [operations, setOperations] = useState(new Array<IOperation>());
    const classes = useStyles();

    useEffect(() => {
        setOperations(new Array<IOperation>());
        const fetchData = async () => {
            if (props!.location.state.account.id) {
                try {
                    const operationsRes =
                        await OperationRepository.getOperationByAccountId(props!.location.state.account.id, undefined, undefined, new Date());
                    setOperations(operationsRes.data.data);
                    const balanceRes = await BalanceService.getBalanceByAccountId(props!.location.state.account.id, undefined, undefined, new Date());
                    setBalance(balanceRes.data.data);
                    setCanRequest(false);
                } catch (e) { }
            }
        };

        if (canRequest) {
            fetchData();
        }
    }, []);
    return (
        <div className={classes.operationContainer}>
            <h1 className={classes.title}>Historical of account: {props!.location.state.account.name} </h1>
            <Paper className={classes.root}>
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableCell}>Operation type</TableCell>
                            <TableCell className={classes.tableCell} align='right'>Date</TableCell>
                            <TableCell className={classes.tableCell} align='right'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operations.map((operation: IOperation, index) => (
                            <TableRow key={operation.id}>
                                <TableCell component='th' scope='row'>
                                    {operation.type}
                                </TableCell>
                                <TableCell align='right'>{moment(operation.date).format('MM/DD/YYYY')}</TableCell>
                                <TableCell align='right'>{operation.amount} €</TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </Paper>
            <h3 className={classes.balance}>{
                operations.length > 0 && balance !== 0 ? 'Balance of account : ' + balance! + ' €' : ''}</h3>
        </div>
    );
}
