'use client'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect,useCallback,useMemo } from 'react';
import fileworker from './fileworker';
import {useDropzone} from 'react-dropzone'
import { ModalHeader,ModalCloseButton,ModalBody,Button,ModalFooter } from '@chakra-ui/react';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };



const UploadFile = (props:any) => {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
    const userId = uuidv4();

    
   
    const onDrop = useCallback((acceptedFiles : Array<File>) => {
        const file = new FileReader;

        file.onload = function() {
          setPreview(file.result);
        }
    
        file.readAsDataURL(acceptedFiles[0])
        }, [])
    const {getRootProps, getInputProps, isDragActive,acceptedFiles,isFocused,isDragAccept,isDragReject} = useDropzone({onDrop})

    const handleSubmit = (event: any) => {
        const newfile  = acceptedFiles[0]
        if (newfile) {
            console.log("file is being uploaded")
            props.setFile(newfile)
            console.log("File Added")
            props.setView("Option")
        }
    };
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);

    return (
        <>
        <ModalHeader>Drop/Add your file</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
              
            <div {...getRootProps({style})}>
                <input {...getInputProps()} />
                    {
                        isDragActive ?
                        <p>{`Drop the files here ...`}</p> :
                        <p>{`Drag 'n' drop some files here, or click to select files`}</p>
                    }
    </div>
              {preview && <p><img src={preview as string} /></p>}
            
              
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSubmit}>Submit</Button>
              
            </ModalFooter>
        </>
    );
}
export default UploadFile