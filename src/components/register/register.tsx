
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import UserRepository from '../../repositories/user';
import { CreateUser } from '../../models/user/createUser';
import { useStyles } from './style';
import { Link } from 'react-router-dom';

export function Register() {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        callback: '',
        error: '',
    });

    const {name, email, password, address, callback, error} = formData;

    const onChange = (e: any) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setFormData({...formData, callback: ''});
        setFormData({...formData, error: ''});
        const createUser = new  CreateUser(name, email, address, password);
        try {
            const response = await UserRepository.createUser(createUser);
            if (response.data.error) {
                setFormData({...formData, error: response.data.error.message});
            } else {
                setFormData({...formData, callback: 'Your account has been create with success'});
            }
        } catch (error) {
            setFormData({...formData, error: error.message});
        }
    };

    function disabledButton() {
        if (email.length > 0 && password.length > 0 && name.length > 0 && address.length > 0 && email.match(new RegExp('\\@gmail.com|\\@yahoo.com|\\@hotmail.com|\\@hotmail.fr', 'g'))) {
            return false;
        }
        return true;
    }

    return (
        <form className={classes.container} noValidate autoComplete='off' onSubmit={handleSubmit}>
            <div>
                <TextField
                    id='register_name_input'
                    className={classes.textField}
                    label='Name'
                    margin='normal'
                    variant='outlined'
                    name='name'
                    value={name}
                    onChange={event => onChange(event)}
                />
            </div>
            <div>
                <TextField
                    id='register_email_input'
                    className={classes.textField}
                    label='Email'
                    margin='normal'
                    variant='outlined'
                    name='email'
                    value={email}
                    onChange={event => onChange(event)}
                />
            </div>
            <div>
                <TextField
                    id='register_address_input'
                    className={classes.textField}
                    label='Address'
                    margin='normal'
                    variant='outlined'
                    name='address'
                    value={address}
                    onChange={event => onChange(event)}
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
                    name='password'
                    value={password}
                    onChange={event => onChange(event)}
                />
            </div>
            <div>
                <Button disabled={disabledButton()} data-testid='register_submit_btn' variant='contained' color='primary'
                    className={classes.button} type='submit'>
                    SignUp
                </Button>
            </div>
            <div>
                <li className={classes.list}>
                    <Link to='/login'>You already have account?</Link>
                </li>
            </div>
            <div className={classes.spanContainer}>
                <span className={classes.spanCallBack}>
                    {callback}
                </span>
                <span className={classes.spanError}>
                    {error}
                </span>
            </div>
        </form>
    );
}
