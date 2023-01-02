import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'ddao1t4ac',
    api_key: '248432817464552',
    api_secret: 'CfrbY9fvEvThCHW5qbQa9gt2ic8',
    secure: true,
});

describe('File upload helper', () => { 

    test('should upload the file to cloudinary', async () => { 
        const imgUrl = 'https://cdn.eso.org/images/thumb300y/eso1907a.jpg';
        const response = await fetch( imgUrl );
        const blob = await response.blob();
        const file = new File( [blob], 'test.jpg' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe( 'string' );
        
        
        const segments = url.split('/');
        const imgId = segments[ segments.length - 1 ].replace('.jpg', '');
        cloudinary.api.delete_resources([ 'journal/' + imgId ], {
            resource_type: 'image',
        });

    });

    test('should return null', async () => { 
        const file = new File( [], 'test.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });

})