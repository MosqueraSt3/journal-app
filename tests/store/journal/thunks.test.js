import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from '../../../src/store/journal';

describe('Journal thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote must create a new note', async () => {
        getState.mockReturnValue({ auth: { uid: 'TEST-UID' } });
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            date: expect.any( Number ),
            id: expect.any( String ),
            imageUrls: [],
            title: '',
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            date: expect.any( Number ),
            id: expect.any( String ),
            imageUrls: [],
            title: '',
        }));

        const collectionRef = collection( FirebaseDB, `TEST-UID/journal/notes` );
        const docs = await getDocs( collectionRef );
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push(deleteDoc( doc.ref )));
        await Promise.all( deletePromises );
    });

})