import { Link as RouterLink } from 'react-router-dom';

import { Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
    return (
        <AuthLayout title='Sign up'>
            <form>
                <Grid container>
                    <Grid item 
                            xs={ 12 }
                            sx={{ mt: 2 }}
                        >
                        <TextField 
                            label='Name'
                            type='name'
                            placeholder='name'
                            fullWidth
                        />
                    </Grid>

                    <Grid item 
                        xs={ 12 }
                        sx={{ mt: 2 }}
                    >
                        <TextField 
                            label='Email'
                            type='email'
                            placeholder='email@example.com'
                            fullWidth
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
                        />
                    </Grid>

                    <Grid container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item
                            xs={ 12 }
                        >
                            <Button 
                                variant="contained" 
                                fullWidth
                            >Sign up</Button>
                        </Grid>

                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
                        <Link color='inherit' to='/auth/login' component={ RouterLink }>
                            Sign in!
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}