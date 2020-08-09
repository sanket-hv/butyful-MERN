import React, {useRef, useEffect} from "react";
import qrious from "qrious";

const QRCode = ({text,size}) => {
    const canvas = useRef(null);
    useEffect(() => {
        if(canvas != null && canvas.current != null){
            let qr = new qrious({
                element: canvas.current,
                value: text,
                size: size
            });
        }
    });
    return (<canvas ref={canvas}></canvas>);
}

export default QRCode;