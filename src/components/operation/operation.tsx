import React, { useEffect, useState } from 'react';
import { useStyles } from './style';
import BalanceRepository from '../../repositories/balance';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OperationRepository from '../../repositories/operation';
import { IOperation } from '../../models/operation/operation.i';
import moment from 'moment';
import { Search } from './search';
import { connect } from 'react-redux';
import { AuthState, AuthAction } from '../../reducers/auth';
import CommonFunction from '../../common/common';
import { useHistory } from 'react-router-dom';
import { ApiResponse } from '../../models/apiResponse/apiResponse';
import { replaceCookie, replaceLocalStorage, getLocalStorageValue } from '../../utils';

function Operation(props: any) {
    const [canRequest, setCanRequest] = useState(true);
    const [balance, setBalance] = useState(0);
    const [operations, setOperations] = useState(new Array<IOperation>());
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        setOperations(new Array<IOperation>());
        const fetchData = async () => {
            if (props!.location.state.account.id) {
                await getOperationsHandler(props!.location.state.account.id, undefined, undefined, new Date());
                setCanRequest(false);
            }
        };
        if (canRequest) {
            fetchData();
        }
    }, []);

    const handleSearch = async (event: any, startDate: Date, endDate: Date) => {
        event.preventDefault();
        getOperationsHandler(props!.location.state.account.id, startDate, endDate, undefined);
        getBalanceHandler(props!.location.state.account.id, startDate, endDate, undefined);
    };

    async function getOperationsHandler(id: number, startDate?: Date, endDate?: Date, currentDate?: Date) {
        let hasData = false;
        while (!hasData) {
            const getOperationResponse = await getOperationByAccountId(id, startDate, endDate, currentDate);
            if (getOperationResponse.error && getOperationResponse.error.message === 'Request failed with status code 401') {
                replaceCookie('accessToken', getLocalStorageValue('refreshToken'));
                const getNewTokenResponse = await CommonFunction.getNewToken();
                if (getNewTokenResponse.error && getNewTokenResponse.error.message === 'Request failed with status code 401') {
                    CommonFunction.logoutAction(props, history);
                } else {
                    replaceCookie('accessToken', getNewTokenResponse!.data!.accessToken);
                    replaceLocalStorage('refreshToken', getNewTokenResponse!.data!.refreshToken);
                }
            } else {
                updateOperationView(getOperationResponse!.data!);
                hasData = true;
            }
        }
    }

    function updateOperationView(operations: IOperation[]) {
        setOperations(operations);
        setCanRequest(false);
    }

    async function getOperationByAccountId(id: number, startDate?: Date, endDate?: Date, currentDate?: Date) {
        try {
            const operationsResponse = await OperationRepository.getOperationByAccountId(id, startDate, endDate, currentDate);
            return operationsResponse.data;
        } catch (e) {
            const errorResponse: ApiResponse<IOperation[]> = {error : e};
            return errorResponse;
        }
    }

    async function getBalanceHandler(id: number, startDate?: Date, endDate?: Date, currentDate?: Date) {
        let hasData = false;
        while (!hasData) {
            const getbalanceResponse  = await getBalance(id, startDate, endDate, currentDate);
            if (getbalanceResponse.error && getbalanceResponse.error.message === 'Request failed with status code 401') {
                replaceCookie('accessToken', getLocalStorageValue('refreshToken'));
                const getNewTokenResponse = await CommonFunction.getNewToken();
                if (getNewTokenResponse.error && getNewTokenResponse.error.message === 'jwt expired') {
                    CommonFunction.logoutAction(props, history);
                } else {
                    replaceCookie('accessToken', getNewTokenResponse!.data!.accessToken);
                    replaceLocalStorage('refreshToken', getNewTokenResponse!.data!.refreshToken);
                }
            } else {
                updateBalanceView(getbalanceResponse!.data!);
                hasData = true;
            }
        }
    }

    function updateBalanceView(balance: number) {
        setBalance(balance);
    }

    async function getBalance(id: number, startDate?: Date, endDate?: Date, currentDate?: Date) {
        try {
            const balanceResponse = await BalanceRepository.getBalanceByAccountId(id, startDate, endDate, currentDate);
            return balanceResponse.data;
        } catch (e) {
            const errorResponse: ApiResponse<number> = {error : e};
            return errorResponse;
        }
    }

    return (
        <div className={classes.operationContainer}>
            <h1 className={classes.title}>Historical of account: {props!.location.state.account.name} </h1>
            <div className={classes.search}>
                    <Search handleSearch={handleSearch}/>
            </div>
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

const mapStateToProps = (state: AuthState) => {
    return {state};
};

const mapDispatchToProps = (dispatch: React.Dispatch<AuthAction>) => {
    return {
        dispatch: (action: AuthAction) => dispatch(action),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
