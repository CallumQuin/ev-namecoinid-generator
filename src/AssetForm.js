import {useState} from "react";
import { Container, Flex, HStack, Image } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const AssetForm = () => {
    const [nmcAsset, setNmcAsset] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setNmcAsset(e.target.value);
      }
    
    const onSubmit = (e) => {
        e.preventDefault();

        navigate(`/${nmcAsset}`)
    }

    return (
    <Container width="100vw" height="100vh">
        <Flex height="100%" direction="column" justify="center">
            <Image src="/historic.png" />
            <form onSubmit={onSubmit}>
              <HStack align="flex-end" mb={32}>
                <FormControl>
                    <FormLabel htmlFor="nmcAsset">Asset</FormLabel>
                    <Input id="nmcAsset" name="nmcAsset" type="text"
                        value={nmcAsset} onChange={handleChange} placeholder="d/bitcoin"/>
                </FormControl>
                <Button type="submit">Generate</Button>
              </HStack>
            </form>
        </Flex>
    </Container>   
     )
}

export default AssetForm;