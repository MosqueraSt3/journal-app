import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startSignInWithEmailPassword, startGoogleSignIn } from '../../store/auth';

const formData = {
    email: '',
    password: '',
};

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch()

    const { email, password, onInputChange } = useForm(formData);

    const isAuthenticating = useMemo( () => status === 'checking', [ status ]);

    const onSubmit = ( e ) => {
        e.preventDefault();
        dispatch( startSignInWithEmailPassword({email, password}) );
    };

    const onGoogleSignIn = () => dispatch( startGoogleSignIn() );;

    return (
        <AuthLayout title='Login'>
            <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster' aria-label='submit-form'>
                <Grid container>
                    <Grid item 
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label='Email'
                            type='email'
                            placeholder='email@example.com'
                            fullWidth
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid item
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label='Password'
                            type='password'
                            placeholder='password'
                            fullWidth
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            inputProps={{
                                'data-testid': 'password'
                            }}
                        />
                    </Grid>

                    <Grid container display={ !!errorMessage ? '' : 'none' } sx={{ mt: 1}}>
                        <Grid item
                            xs={ 12 }
                        >
                            <Alert severity='error'>
                                { errorMessage }
                            </Alert>
                        </Grid>
                    </Grid>

                    <Grid container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item
                            xs={ 12 }
                            sm={ 6 }
                        >
                            <Button 
                                variant="contained" 
                                fullWidth
                                type='submit'
                                disabled={ isAuthenticating }
                            >Login</Button>
                        </Grid>

                        <Grid item
                            xs={ 12 }
                            sm={ 6 }
                        >
                            <Button 
                                variant="contained" 
                                fullWidth
                                onClick={ onGoogleSignIn }
                                disabled={ isAuthenticating }
                                aria-label='google-btn'
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Link color='inherit' to='/auth/register' component={ RouterLink }>
                            Sign up
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}