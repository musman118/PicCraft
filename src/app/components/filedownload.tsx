import { Button, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Link from 'next/link';

const FileDownload = (props:any) => {
    const handleSubmit = (event: any) => {
        console.log("File is being downloaded")
    };
    console.log("sjhowing the url")
    console.log(props.url)
    return (
        <>
        <ModalHeader>Download the File</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Link href={props.url}>Download The Image</Link>
              
              
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
export default FileDownload;