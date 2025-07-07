import axios from 'axios';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { API_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants';

function MyDropzone({ userProfileID }: any) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0];

        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        axios.post(
            `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.uploadImage}/${userProfileID}/image/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            // Success handled - could show user notification here
        }).catch(err => {
            // Error handled - could show user error message here
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop profile image, or click to select profile image</p>
            }
        </div>
    )
}

export default MyDropzone
