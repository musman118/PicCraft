import { Button, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import Link from 'next/link';
import { ButtonGroup,Flex } from '@chakra-ui/react'
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
            <Flex justify="center" align="center" h="full">
               <Link href={props.url}>
              
              <Button colorScheme='purple' variant='solid'>
                Download
              </Button>
              </Link>
            </Flex>  
              
            </ModalBody>
  
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                    Close
                </Button>
                
            </ModalFooter>
        </>
    );
}
export default FileDownload;