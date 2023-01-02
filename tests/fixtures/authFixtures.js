export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: '123TEST',
    email: 'test@test.com',
    displayName: 'test',
    photoURL: 'https://test.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: '123TEST',
    email: 'test@test.com',
    displayName: 'test',
    photoURL: 'https://test.jpg',
    errorMessage: null,
};