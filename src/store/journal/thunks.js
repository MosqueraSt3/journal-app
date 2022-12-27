import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';

import { addNewEmptyNote, deleteNote, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        };

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const response = await loadNotes( uid );
        dispatch( setNotes(response) );
    }
}

export const startSavingNote = () => {
    return async (dispatch, getState) => {
        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active } = getState().journal;
        const noteToFireStore = { ...active };
        delete noteToFireStore.id;
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch( updateNote(active) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }
        const photosUrl = await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNote( photosUrl ) );
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active } = getState().journal;
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);
        dispatch( deleteNote(active.id) );
    }
}