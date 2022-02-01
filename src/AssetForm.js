import {useState} from "react";
import { Avatar, Container, Flex, HStack, Image, Link, LinkOverlay, Wrap, WrapItem } from '@chakra-ui/react';
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
        <Flex height="100%" direction="column" justify="end">
            <Image src="/historic.png" />
            <form onSubmit={onSubmit}>
              <HStack align="flex-end" mb="40vh">
                <FormControl>
                    <FormLabel htmlFor="nmcAsset">Asset</FormLabel>
                    <Input id="nmcAsset" name="nmcAsset" type="text"
                        value={nmcAsset} onChange={handleChange} placeholder="d/bitcoin"/>
                </FormControl>
                <Button type="submit">Generate</Button>
              </HStack>
            </form>
            <Wrap mb={4} alignSelf="center">
              <WrapItem>
                <Link href="https://www.historicaldomains.io/">
                  <Avatar name="historicaldomains.io" src="/images/bit.png"/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://discord.gg/xkeaCsJjxr">
                  <Avatar name="discord" src="/images/discord.jpg"/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://discord.gg/xkeaCsJjxr">
                  <Avatar name="twitter" src="/images/twitter.png" showBorder={false}/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://www.youtube.com/channel/UCGV8u_HG5wGBwNyoR44j45A">
                  <Avatar name="youtube" src="/images/youtube.png" bg="transparent" showBorder={false}/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://medium.com/@Historical_Domains">
                  <Avatar name="youtube" src="/images/medium.png" bg="transparent" showBorder={false}/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://opensea.io/collection/emblem-vault?search[query]=Namecoin%20&search[sortAscending]=true&search[sortBy]=PRICE&search[stringTraits][0][name]=Year&search[stringTraits][0][values][0]=2011">
                  <Avatar name="youtube" src="/images/opensea.png" bg="transparent" showBorder={false}/>
                 </Link>
              </WrapItem>
              <WrapItem>
                <Link href="https://www.namecoin.org/">
                  <Avatar name="youtube" src="/images/namecoin.png" bg="transparent" showBorder={false}/>
                 </Link>
              </WrapItem>
            </Wrap>
        </Flex>
    </Container>   
     )
}

export default AssetForm;