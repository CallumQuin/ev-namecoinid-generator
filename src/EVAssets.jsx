import { useRef, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Punycodes from "./punycodes";
import NameCoinIds from "./nameCoinId";
import { format, parseISO } from 'date-fns';
import { SimpleGrid, Flex, Spacer } from '@chakra-ui/react'
import Graphemer from 'graphemer';
const bgImage = require('./namecoinID.png');

const tr46 = require("tr46");
const SCALE = 1;



const EVAssets = () => {
  const canvasEl = useRef(null);
  const imgEl = useRef(null);
  const [title, setTitle] = useState("");
  const [unicode, setUnicode] = useState("");
  const { prefix, nameCoinId } = useParams();
  const [translation, setTranslation] = useState("");

  const nmcAsset = prefix.concat("/" + nameCoinId);
  console.log(nmcAsset)
  const nameCoinDescription = NameCoinIds.find(({ nameASCII }) => nameASCII === nmcAsset);
  console.log("HERE")
  console.log(nameCoinDescription);
  const { blockFirstNew, blockTimeFirstNew, blockFirstUpdate } = nameCoinDescription;
  // const monthFormatted = Month < 10 ? `0${Month}` : Month;
  // const dayFormatted = Day < 10 ? `0${Day}` : Day;
  //const date = blockTimeFirstNew;//`${Year}-${monthFormatted}-${dayFormatted}`;
  const date = Date.parse(blockTimeFirstNew, "MM/dd/yyyy HH:mm a");


  const registrationImage = format(date, "yyyy-MM-dd");
  const registrationTitle = format(date, "yyyy-MM");
  const registrationDescription = format(date, "MMM do, yyyy");

  const calculateFontSize = (text) => {
    if (text.length < 10) {
      return "80px"
    } else if (text.length < 15) {
      return "70px"
    } else if (text.length < 20) {
      return "60px"
    } else if (text.length < 25) {
      return "50px"
    } else if (text.length < 30) {
      return "40px"
    } else if (text.length < 35) {
      return "35px"
    } else if (text.length < 40) {
      return "30px"
    } else if (text.length < 50) {
      return "25px"
    }
    //return "20px"


  }
  //   const splitter = new Graphemer();

  //   const graphemeCount = splitter.countGraphemes(unicode);
  //   switch (Category) {
  //     case "Emoji":
  //       let size = "200px";
  //       if (graphemeCount >= 11) {
  //         size = "45px"
  //       }
  //       return size;
  //     case "Text":
  //       if (["xn--clchc0ea0b2g2a9gcd", "xn--xkc2al3hye2a",
  //         "xn--xkc2dl3a5ee0h", "xn--smrgsbord-82a8p",
  //         "xn--8-7sbabhcv6b1cfn"].includes(punycode)) {
  //         return "100px";
  //       } else if (["xn--cckbak0byl6e", "xn--n8juczb8ml64m5r6a",
  //         "xn--h9jeami8py253a", "xn--fiq4mp3eqscr2bfxgex2c",
  //         "xn--80ahnahceodec3ba", "xn--fiqq24b8jea300hll5d",
  //         "xn--eckfz3byc3fk"].includes(punycode)) {
  //         return "90px";
  //       } else if (graphemeCount >= 10) {
  //         return "70px";
  //       }
  //       return "110px";
  //     case "ASCII Art":
  //       if (graphemeCount > 6) {
  //         if (graphemeCount >= 11) {
  //           return "70px";
  //         }
  //         return "80px";
  //       }
  //       return "100px";
  //     case "Symbol":
  //       return "180px";
  //     default:
  //       return "150px";
  //   }
  // }

  const onLoad = () => {
    const punycode = nmcAsset.substring(nmcAsset.indexOf("/") + 1, nmcAsset.length);
    const convertedPunycode = tr46.toUnicode(punycode).domain;

    const namecoinId = nmcAsset.substring(nmcAsset.indexOf("/") + 1, nmcAsset.length);
    console.log(namecoinId);

    const fontSize = calculateFontSize(nmcAsset);
    console.log(fontSize);
    setUnicode(convertedPunycode);

    const canvas = canvasEl.current;
    const imgWidth = imgEl.current.width;
    const imgHeight = imgEl.current.height;

    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext("2d");
    ctx.scale(SCALE, SCALE);


    ctx.drawImage(imgEl.current, imgWidth * (1 - SCALE), imgHeight * (1 - SCALE));

    ctx.font = `${fontSize} sans-serif`
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.fillText(nmcAsset + "\n", imgWidth * (1 - SCALE + 1 / 2), imgHeight * (1 - SCALE + 1 / 2));
    ctx.fillText(nmcAsset + "\n", imgWidth * (1 - SCALE + 1 / 2), imgHeight * (1 - SCALE + 1 / 2));


    ctx.font = "20px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`Block ${blockFirstNew}`, imgWidth * (2 - SCALE) - 35, imgHeight * (2 - SCALE) - 68);
    ctx.fillText(`${registrationImage}`, imgWidth * (2 - SCALE) - 35, imgHeight * (2 - SCALE) - 43);

    //setTitle(`${convertedPunycode} | ${registrationTitle} | Punycodes | ${nmcAsset}`);
    setTitle(`${nmcAsset} | ${registrationTitle} | Namecoin Identities`);
  };

  return (
    <>
      <Flex direction={{ base: "column", xl: "row" }}>
        <canvas ref={canvasEl} style={{ marginLeft: "8vh", marginTop: "8vh" }}></canvas>
        <Description
          title={title}
          punycode={unicode}
          nmcAsset={nmcAsset}
          registration={registrationDescription}
          onLoad={onLoad}
        />
      </Flex>
      <div style={{ display: "none" }}>
        <img
          src={bgImage}
          ref={imgEl}
          alt="nmcframe"
          onLoad={onLoad}
        />
      </div>
    </>
  );
}

export default EVAssets;