import { useRef, useState } from "react";
import Description from "./Description";
import { Navigate, useParams } from "react-router-dom";
import DomainName from "./domains";
import { Flex } from '@chakra-ui/react'

const SCALE = 1;

const EVAssets = () => {
    const canvasEl = useRef(null);
    const imgEl = useRef(null);
    const domainEl = useRef(null);
    const [title, setTitle] = useState("");
    const {prefix, domain} = useParams();

    const nmcAsset = prefix.concat("/"+domain);
    const domainObj = DomainName.find(({Domains}) => Domains === nmcAsset);
    const {Rank, Domains, Registration, Time} = {...domainObj };
    const isPunyCode = Domains?.includes("xn--");

    const onLoad = () => {        
        const canvas = canvasEl.current;
        const imgWidth = imgEl.current.width;
        const imgHeight = imgEl.current.height;
    
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext("2d");
        ctx.scale(SCALE, SCALE);

    
        ctx.drawImage(imgEl.current, imgWidth*(1-SCALE), imgHeight*(1-SCALE));
    
        ctx.font = "800 50px sans-serif"
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.fillText(Rank.replace(/\s/g, ""), imgWidth*(1-SCALE + 1/2), 60);

        ctx.font = "800 42px sans-serif"
        ctx.fillText(Registration, imgWidth*(1-SCALE + 1/2), imgHeight-50);

        ctx.font = "800 30px sans-serif"
        ctx.fillText("First Registration", imgWidth*(1-SCALE + 1/2), imgHeight-95);

        ctx.font = "800 25px sans-serif"
        ctx.fillText(Time.replace(/\s/g, ""), imgWidth-80, imgHeight-35);

         const svgCode = `
    <svg width="620" height="500" xmlns="http://www.w3.org/2000/svg">
        <foreignObject x="0" y="0" width="620" height="500">
            <div xmlns="http://www.w3.org/1999/xhtml">
                ${domainEl.current?.outerHTML}
            </div>
        </foreignObject>
    </svg>`;

        const svgCodeEncoded = svgCode.replace(/\n/g, "").replace(/"/g, "'");

        const img = new Image();
        img.src = `data:image/svg+xml,${svgCodeEncoded}`; 

        img.onload = () => {
          ctx.drawImage(img, (imgWidth-620)/2, ((imgHeight-350)/2)-20);
        };


        
        setTitle(`${Rank.replace(/\s/g, "")} | ${Domains} | ${Registration} | Namecoin Domain`);

    
        //ctx.font = "20px sans-serif";
        //ctx.textAlign = "right";  
        //ctx.fillText(nmcAsset, imgWidth*(2-SCALE)-35, imgHeight*(2-SCALE)-68);
        //ctx.fillText(`${registrationImage}`, imgWidth*(2-SCALE) - 35, imgHeight*(2-SCALE) - 43);
    
   };    
   if (isPunyCode || !domainObj) {
     return <Navigate to="/" />
   }

    return (
     <>
     <Flex direction={{base: "column", xl: "row"}}>
       <canvas ref={canvasEl} style={{marginLeft: "8vh", marginTop: "15vh"}}></canvas>
          <Description 
            title={title} 
            rank={Rank.replace(/\s/g, "")}
            domains={Domains}
            registration={Registration}
            time={Time}
            domainName={domain}
          />
     </Flex>
      <div style={{ display: "none" }}>
        <img
            src="/nmcframe.png"
            ref={imgEl}
            alt="nmcframe"
            onLoad={onLoad}
        />
          <div ref={domainEl}
               style={{
                 width: "620px",
                 height: "350px",
                 color: "rgb(0, 147, 233)",
                 fontFamily:  "sans-serif",
                 fontWeight: "800",
                 fontSize: "70px",
                 display: "flex",
                 textAlign: "center",
                 justifyContent: "center",
                 alignItems: "center"
               }}
          >
            <p style={{margin: 0, verticalAlign: "baseline", lineHeight:"80px", overflowWrap: "anywhere"}}>{Domains}</p>
          </div>
      </div>           
      </>
    );
}

export default EVAssets;