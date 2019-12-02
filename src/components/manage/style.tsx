import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    manageContainer: {
        top: '65px',
        position: 'absolute',
        width: '100%',
    },
    operationContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: '15%',
        marginBottom: '30px',
    },
    accountsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: '15%',
    },
    select: {
        width: '330px',
    },
    form: {
        width: '330px',
    },
    button: {
        width: '330px',
    },
    title: {
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '80px',
    },
    card: {
        cursor: 'pointer',
        boxShadow: 'none',
        borderRadius: '0',
        borderTop: '1px solid #eee',
        borderBottom: '1px solid #eee',
        width: '10%',
        marginRight: '40px',
        height: '60px',
    },
    selectedCard: {
        background: '#17479E',
        color: 'white',
    },
    callBackContainer: {
        width: '330px',
        paddingLeft: '15%',
        marginTop: '10px',
        textAlign: 'center',
    },
    spanCallBack: {
        color: 'green',
    },
    spanError: {
        color: 'red',
    },
}));
