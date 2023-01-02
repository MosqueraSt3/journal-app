import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures';

describe('Auth slice store', () => { 

    test('Should return the initial state and must call auth', () => { 
        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe( 'auth' );
        expect( state ).toEqual( initialState );
    });

    test('Should do the authentication', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ));

        expect( state ).toEqual( authenticatedState );
    });

    test('Should do the log out without args', () => { 
        const state = authSlice.reducer( authenticatedState, logout());
        notAuthenticatedState.errorMessage = undefined;

        expect( state ).toEqual( notAuthenticatedState );
    });

    test('Should do the log out with args', () => { 
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage: 'test error' }));
        notAuthenticatedState.errorMessage = 'test error';

        expect( state ).toEqual( notAuthenticatedState );
    });

    test('Should turn to checking state', () => { 
        const state = authSlice.reducer( authenticatedState, checkingCredentials());

        expect( state.status ).toBe( 'checking' );
    });

})