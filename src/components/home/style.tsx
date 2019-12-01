import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(theme => ({
    accountContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: '40%',
        margin: '0 auto',
        marginTop: '15%',
    },
    fab: {
        position: 'fixed',
        right: '4px',
        bottom: '8px',
    },
    card: {
        width: '60%',
        marginBottom: '30px',
        height: '140px',
        margin: '0 auto',
        background: '#17479E',
        color: 'white',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: '30px',
        textAlign: 'center',
        marginBottom: '130px',
    },
    spanRight: {
        float: 'right',
    },
}));