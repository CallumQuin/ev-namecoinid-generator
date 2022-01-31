import { useRef, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import DomainName from "./domains";
import { format, parseISO } from 'date-fns';
import { SimpleGrid, Flex, Spacer } from '@chakra-ui/react'
import Graphemer from 'graphemer';


const SCALE = 1;

const EVAssets = () => {
    const canvasEl = useRef(null);
    const imgEl = useRef(null);
    const [title, setTitle] = useState("");
    const {prefix, domain} = useParams();

    const nmcAsset = prefix.concat("/"+domain);
    const domainObj = DomainName.find(({Domains}) => Domains == nmcAsset);
    const {Rank, Domains, Registration, Time} = domainObj;
    console.log(domainObj)
    //const punyDescription = Punycodes.find(({ ID }) => ID === nmcAsset);
    //const {Day, Month, Year, Category} = punyDescription;

    const calculateFontSize = (unicode, Category) => {
      /* const splitter = new Graphemer();

      const graphemeCount = splitter.countGraphemes(unicode);
      switch(Category) {
        case "Emoji":
          let size = "200px";
          if (graphemeCount >= 11) {
            size = "45px"
          }
          return size;
        case "Text":
          if (["xn--clchc0ea0b2g2a9gcd", "xn--xkc2al3hye2a",
              "xn--xkc2dl3a5ee0h", "xn--smrgsbord-82a8p",
              "xn--8-7sbabhcv6b1cfn"].includes(punycode)) {
            return "100px";
          } else if (["xn--cckbak0byl6e", "xn--n8juczb8ml64m5r6a",
                      "xn--h9jeami8py253a", "xn--fiq4mp3eqscr2bfxgex2c",
                      "xn--80ahnahceodec3ba", "xn--fiqq24b8jea300hll5d",
                       "xn--eckfz3byc3fk"].includes(punycode)) {
            return "90px";
          } else if (graphemeCount >= 10) {
            return "70px";
          }
          return "110px";
        case "ASCII Art":
          if (graphemeCount > 6) {
            if (graphemeCount >= 11) {
              return "70px";
            }
            return "80px";
          }
          return "100px";
        case "Symbol":
          return "180px";
        default: */
          return "150px";
      
    }

    const onLoad = () => {        
        const canvas = canvasEl.current;
        const imgWidth = imgEl.current.width;
        const imgHeight = imgEl.current.height;
    
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext("2d");
        ctx.scale(SCALE, SCALE);

    
        ctx.drawImage(imgEl.current, imgWidth*(1-SCALE), imgHeight*(1-SCALE));
    
        ctx.font = "50px Montserrat"
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.fillText(Rank.replace(/\s/g, ""), imgWidth*(1-SCALE + 1/2), 60);

        ctx.font = "42px Montserrat"
        ctx.fillText(Registration, imgWidth*(1-SCALE + 1/2), imgHeight-50);

        ctx.font = "30px Montserrat"
        ctx.fillText("First Registration", imgWidth*(1-SCALE + 1/2), imgHeight-95);

        ctx.font = "25px Montserrat"
        ctx.fillText(Time, imgWidth-80, imgHeight-35);

        ctx.font = "70px Montserrat"
        ctx.fillStyle= "#0093e9"
        ctx.fillText(nmcAsset, imgWidth*(1-SCALE + 1/2), imgHeight*(1-SCALE+ 1/2));

        

    
        //ctx.font = "20px sans-serif";
        //ctx.textAlign = "right";  
        //ctx.fillText(nmcAsset, imgWidth*(2-SCALE)-35, imgHeight*(2-SCALE)-68);
        //ctx.fillText(`${registrationImage}`, imgWidth*(2-SCALE) - 35, imgHeight*(2-SCALE) - 43);
    
        //setTitle(`${convertedPunycode} | ${registrationTitle} | Punycodes | ${nmcAsset}`);
   };    

    return (
    <>
     <Flex direction={{base: "column", xl: "row"}}>
       <canvas ref={canvasEl} style={{marginLeft: "8vh", marginTop: "8vh"}}></canvas>
          {/*<Description 
            title={title} 
            punycode={unicode} 
            nmcAsset={nmcAsset} 
            registration={registrationDescription}
            category={Category}
            translation={translation}
            setTranslation={setTranslation}
            onLoad={onLoad}
          /> */}
     </Flex>
      <div style={{ display: "none" }}>
        <img
            src="/ev-punycode-generator/nmcframe.png"
            ref={imgEl}
            alt="nmcframe"
            onLoad={onLoad}
        />
      </div>           
      </>
    );
}

export default EVAssets;