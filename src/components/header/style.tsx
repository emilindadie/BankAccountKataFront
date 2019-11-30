import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    button: {
        right: '10px',
        position: 'absolute',
    },
    appBar: {
        background: 'white',
        color: '#333333',
        borderBottom: '2px solid #eee',
    },
    isactive: {
        color: '#17479E',
    },
    menuItem: {
        a: {
            textDecoration: 'none',
        },
    },
}));
