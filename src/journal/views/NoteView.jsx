import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';

import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const fileInputRef = useRef();

    const dispatch = useDispatch();

    const { active, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, formState, date } = useForm(active);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState]);

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Nota updated', messageSaved, 'success');
        }
        dispatch( setActiveNote(formState) );
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }

    const onFileInputChange = ({ target }) => {
        if(target.files === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    } 

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} className='animate__animated animate__fadeIn animate__faster'>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
            </Grid>

            <Grid item>

                <input
                    ref={ fileInputRef }
                    type="file" 
                    multiple
                    onChange={ onFileInputChange }
                    style={{ display: 'none' }}
                />

                <IconButton color='primary' disabled={ isSaving } onClick={ () =>  fileInputRef.current.click() }>
                    <UploadOutlined />
                </IconButton>

                <Button color='primary' sx={{ padding: 2 }} onClick={ onSaveNote } disabled={ isSaving }>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    value={ title }
                    name='title'
                    onChange={ onInputChange }
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Type a title'
                    label='Title'
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField 
                    value={ body }
                    name='body'
                    onChange={ onInputChange }
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='What happened today?'
                    label='Ocurrence'
                />
            </Grid>

            <Grid
                container
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            
            <ImageGallery images={ active.imageUrls } />
        </Grid>
    )
}
