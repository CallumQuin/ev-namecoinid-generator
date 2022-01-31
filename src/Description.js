import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useClipboard,
  Textarea,
  Box,
} from '@chakra-ui/react';

const Description = ({title, rank, domains, registration, time}) => {
  const { hasCopied, onCopy } = useClipboard(title);
  const [description, setDescription] = useState("");
  const { hasCopied: hasCopiedDescription, onCopy: onCopyDescription } = useClipboard(description);

  useEffect(() => {
    if (domains) {
      setDescription(`Instructions on how to verify the authenticity of this domain can be found at: https://www.historicaldomains.io/verify

(d/) Mint order: ${rank}
      
Domain: ${domains}
      
Mint Date: ${registration}, ${time}
      
Total Supply of (d/) 2011 Domains: 12060
      
Owning this NFT gives ownership of the bitcoin.bit domain and can be unwrapped to be used as server hosting content. This domain is in the standard d/form.
      
More importantly though, this is one of the earliest domain name NFTs ever stored on a blockchain. Namecoin was the first fork of Bitcoin and the first to store domain names on a blockchain.
      
Note, Namecoin is a domain name system (DNS) & thus assets need to be renewed (every 9 months). Have a small amount of $NMC in your vault & it'll autorenew.
      
1 $NMC = Autorenewal for 5 years
      
10 $NMC = Autorenewal for 50 years
      
People used Namecoin to register on-chain domain names along with other details such as their bitcoin address, profile/splash images, their occupation, etc.`)
    }
  }, [domains, rank, registration, time])

   return (
    <Box w="100%" ml={24} mt={{base: "2em", xl: "0"}}>
        <FormControl w={{lg: "80%", xl: "70%", "2xl": "50%"}} mb={4} mt={{lg: "0", xl: "10em"}} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Title</FormLabel>
          <Flex>
            <Input type="text" value={title} isReadOnly={true} />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
        <FormControl w={{lg: "80%", xl: "95%", "2xl": "80%"}} mb={4} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Description</FormLabel>
          <Flex >
          <Textarea
              value={description}
              isReadOnly
              h="28em"
          />
            <Button onClick={onCopyDescription} ml={2}>
              {hasCopiedDescription ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
    </Box>
   )
}

export default Description;