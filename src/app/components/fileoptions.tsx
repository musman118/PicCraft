'use client'
import { ModalHeader,ModalCloseButton,ModalBody,Button,ModalFooter } from '@chakra-ui/react';
import { useRadio,useRadioGroup,useToast,Box,Image,Stack,HStack,Text,chakra } from '@chakra-ui/react'

const Imageoptions  = ["Gaussian","Blur","Invert","Grayscale","Normalize","Sepia"]
const FileOptions = (props:any) => {
    let VALUE = "Blur"
    const handleSubmit = (event:any) => {
        console.log("Option Submitted",value)
        props.setOption(value)
        props.setView("Wait")
    }
    const { value ,getRootProps, getRadioProps } = useRadioGroup({
        name: 'Imageoptions',
        defaultValue: 'Blur',
        onChange: console.log,  
      })
    
      const group = getRootProps()
    function RadioCard(props:any) {
        const { getInputProps, getRadioProps } = useRadio(props)
      
        const input = getInputProps()
        const checkbox = getRadioProps()
      
        return (
          <Box as='label'>
            <input {...input} />
            <Box
              {...checkbox}
              cursor='pointer'
              borderWidth='1px'
              borderRadius='md'
              boxShadow='md'
              _checked={{
                bg: 'teal.600',
                color: 'white',
                borderColor: 'teal.600',
              }}
              _focus={{
                boxShadow: 'outline',
              }}
              px={5}
              py={3}
            >
              {props.children}
            </Box>
          </Box>
        )
            }
    return (
        <>
        <ModalHeader>Select the Options to Manipulate the Image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
              <div className="flex flex-row">
                {/* {
                    Imageoptions.map((option) => {
                        return (
                        <Button className="flex-1/3 "key={option} onClick={() => {handleSubmit(null,option)}}>{option}</Button>
                        )
                    })
                } */}
                <HStack {...group}>
                    {Imageoptions.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                        <RadioCard key={value} {...radio}>
                        {value}
                        </RadioCard>
                    )
                    })}
                </HStack>
              </div>
            
              
            </ModalBody>
  
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                    Close
                </Button>
                <Button variant="ghost" onClick={handleSubmit}>Submit</Button>
            </ModalFooter>
        </>
    )
}

export default FileOptions



