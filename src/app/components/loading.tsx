import { Spinner } from '@chakra-ui/react'
import { ModalBody,ModalHeader,ModalCloseButton, Flex} from '@chakra-ui/react'

const LoadingScreen = () => {
    return (
        
        <>
        <ModalHeader>Loading</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
            <Flex justify="center" align="center" h="full">
              <Spinner size='lg' />
            
            </Flex>
            </ModalBody>
        </>
    );
}
export default LoadingScreen;