'use client'
import { useState,useRef,useEffect } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { v4 as uuidv4 } from 'uuid';
import fileworker from './fileworker'
import UploadFile from "./uploadfile";
import FileOptions from "./fileoptions";
import FileDownload from "./filedownload";
import LoadingScreen from "./loading";
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
import Loading from "./loading";
 
 const Mainmodal =  () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [file,setFile] = useState<File | undefined>(undefined);
  const [option,setOption] = useState<string>("");
  const [Submitted, setSubmitted] = useState(false);
  const [view, setView]  = useState<string>("Upload");
  const [url, setUrl] = useState("");
  
  const userId = uuidv4();
  
  
  useEffect(() => {
    if (view === "Wait") {
        handleSubmit();
    }
}, [view]);
 
  const  handleSubmit =  async () => {
    
    console.log("Handle Submit is being called")
    if(file && option && userId){
      const formData = new FormData();
      console.log("file is being uploaded")
      
      
      formData.append('file',file);
      formData.append('userId',userId);
      formData.append('option',option);
      
      try {
        const response  =  await fileworker(formData);
        console.log("Response is being awaited")
        setUrl(response)
        console.log(response)
        setView("Submit");
      } catch (error) {
        
      }
    }
    
    

    
   
  };
    

    return(
        <>
        <Button onClick={onOpen}>Upload File</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent minH={"50%"} minW={"50%"} >
            {view === "Upload" ? (
              <UploadFile onClose={onClose} setFile={setFile} setView={setView} />
            ) : view === "Option" ? (
              <FileOptions  onClose={onClose} setOption={setOption} setView={setView} setSubmitted={setSubmitted}  />
            ) : view === "Wait" ? (

              <LoadingScreen  />
            ) : view == "Submit" ? (
              <FileDownload onClose={onClose} setOption={setOption} setView={setView} setSubmitted={setSubmitted} url={url} />
            )
          : null}
          </ModalContent>
        </Modal>
      </>
    )


}
export default Mainmodal;
