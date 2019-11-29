import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserService from '../../services/user';
import { CreateUser } from '../../models/user/createUser';
import { useStyles } from './style';
import { Link } from 'react-router-dom';

export function Register() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassord] = useState('');
    const [callback, setCallback] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const createUser = new CreateUser();
        createUser.name = name;
        createUser.email = email;
        createUser.password = password;
        createUser.address = address;
        try {
            const response = await UserService.createUser(createUser);
            if (response.data.data) {
                setCallback('Votre compte à été crée avec succes');
            } else {
                setCallback(response.data.error);
            }
        } catch (error) {
            setCallback(error);
        }
    };

    return (
        <form className={classes.container} noValidate autoComplete='off'>
            <div>
                <TextField
                    id='register_name_input'
                    className={classes.textField}
                    label='Name'
                    margin='normal'
                    variant='outlined'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_email_input'
                    className={classes.textField}
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_address_input'
                    className={classes.textField}
                    label='Address'
                    margin='normal'
                    variant='outlined'
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
            </div>
            <div>
                <TextField
                    id='register_password_input'
                    className={classes.textField}
                    label='Password'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    value={password}
                    onChange={event => setPassord(event.target.value)}
                />
            </div>
            <div>
                <Button data-testid='register_submit_btn' variant='contained' color='primary' className={classes.button} onClick={handleSubmit}>
                    Inscription
                </Button>
            </div>
            <div>
                <li className={classes.list}>
                    <Link to='/login'>Vous avez deja un compte?</Link>
                </li>
            </div>
            <div className={classes.spanContainer}>
                <span className={classes.span}>
                    {callback}
                </span>
            </div>
        </form>
    );
}

export default Register;