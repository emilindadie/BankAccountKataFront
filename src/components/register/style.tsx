import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '40%',
        margin: '0 auto',
        marginTop: '10%',
    },
    textField: {
        marginLeft: '',
        marginRight: '',
        width: '100%',
    },
    button: {
        width: '100%',
    },
    input: {
        display: 'none',
    },
    list: {
        listStyle: 'none',
        marginTop: '10px',
        textAlign: 'center',
    },
    spanContainer: {
        marginTop: '10px',
        textAlign: 'center',
    },
    span: {
        color: 'red',
    },
}));
