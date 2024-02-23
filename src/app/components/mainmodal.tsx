'use client'
import { useState,useRef } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';
import fileworker from './fileworker'

// Different ModalViews 
// View 1 : Upload File (Drag & Drop)
// View 2 : Options list (View, Edit, Delete , etc)
// view 3 : Spcific to the Option selected (View : Image, Edit : Edit Image, Delete : Delete Image)
// view 4 : Download the image button
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
 
 const Mainmodal = () => {
  const [isOpened,setOpened]  = useState(false);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file,setFile] = useState<File | undefined>(undefined);
  
  const userId = uuidv4();
  
  
  const onfilechange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }
    setFile(target.files[0]);
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }
  
    file.readAsDataURL(target.files[0])
  }
  
  const handleSubmit = (event:any) => {
    event.preventDefault()
    console.log("Handle Submit is being called")
    if(file){
      const formData = new FormData();
      console.log("file is being uploaded")
      // console.log(file.name)
      // console.log(file.arrayBuffer)
      
      formData.append('file',file);
      formData.append('userId',userId);
      const res = fileworker(formData);
      console.log(res)
    }
    

    
   
  };
    

    return(
        <>
        <Button onClick={onOpen}>Upload File</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent minH={"50%"} minW={"50%"} >
          
            <ModalHeader>Drop/Add your file</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
              
              <form >
                <input id="image" name="imagefile" accept="image/png image/jpg" type="file" onChange={onfilechange}></input>
                
              </form>
              {preview && <p><img src={preview as string} /></p>}
            
              
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSubmit}>Submit</Button>
              
            </ModalFooter>
            
          </ModalContent>
        </Modal>
      </>
    )


}
export default Mainmodal;