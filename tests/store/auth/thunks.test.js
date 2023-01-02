import { signOut } from 'firebase/auth';
import { registerUserWithEmailPassword, signInWithEmailPassword, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingAuthentication, checkingCredentials, login, logout, startCreatingUserWithEmailPassword, startGoogleSignIn, startSignInWithEmailPassword } from '../../../src/store/auth';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Auth thunks store', () => { 

    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    
    test('should invoke checking credentials function', async () => {
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn should call checking credentials and login', async () => {
        const loginData = { ok: true, ...demoUser };

        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn should call checking credentials and logout', async () => {
        const loginData = { ok: false, errorMessage: 'error' };

        await signInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startSignInWithEmailPassword should call checking credentials and login', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: 'test@test.com', password: '123456' }

        await signInWithEmailPassword.mockResolvedValue( loginData );
        await startSignInWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startSignInWithEmailPassword should call checking credentials and logout', async () => {
        const loginData = { ok: false, errorMessage: 'error' };
        const formData = { email: 'test@test.com', password: '123456' }

        await signInWithEmailPassword.mockResolvedValue( loginData );
        await startSignInWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );
    });

    test('startCreatingUserWithEmailPassword should call checking credentials and login', async () => {
        const loginData = { ok: true, ...demoUser };
        const formData = { email: 'test@test.com', password: '123456', displayName: 'test' }

        await registerUserWithEmailPassword.mockResolvedValue( loginData );
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

})