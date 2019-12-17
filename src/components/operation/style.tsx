import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    operationContainer: {
        top: '65px',
        position: 'relative',
        width: '70%',
        margin: '0 auto',
    },
    title: {
        textAlign: 'center',
    },
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    tableHead: {
        background: '#17479E',
    },
    tableCell: {
        color: 'white',
    },
    balance: {
        float: 'right',
    },
    search: {
        marginBottom: '30px',
    },
}));
