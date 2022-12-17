import { FirebaseAuth } from '../../firebase/config';
import { registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ) );
    }
}

export const startSignInWithEmailPassword = ({email, password}) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signInWithEmailPassword( {email, password} );
        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        if (!ok) return dispatch( logout({errorMessage}) );
        dispatch( login( { ok, uid, email, displayName, photoURL, errorMessage } ) );
    } 
}

export const startLogoutFirebase = () => {
    return async ( dispatch ) => {
        await FirebaseAuth.signOut(FirebaseAuth);
        dispatch( logout({}) );
    }
}