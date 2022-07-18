import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import image from '../../../public/images/metacamp-cert01.png';

const Home = () => {
    const baseUrl = window.location.origin;
    const [canvasUrl, setCanvasUrl] = useState<string>(image);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const populateCert = async () => {
        const certImg = new Image();
        certImg.src = image;
        await certImg.decode();

        // images are loaded here and we can go about our business
        const canvas = canvasRef.current;
        if (canvas == null) throw new Error('Could not get canvas');
        const ctx = canvas.getContext('2d');
        if (ctx == null) throw new Error('Could not get context');

        const spaceWords = (words: string) => {
          return words.split("").join(String.fromCharCode(8202))
        }
        ctx.drawImage(certImg, 0, 0, 2000, 1414);
        ctx.font = '600 124px League Spartan';
        ctx.fillStyle = '#20201E';
        ctx.fillText('CERTIFICATE OF', 248, 490);
        ctx.fillText('DISTINCTION', 248, 620);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords('This certificate is presented to'), 248, 706);
        ctx.font = '500 84px League Spartan';
        ctx.fillText('KEVIN WONG', 248, 820);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords('For successfully completing the course'), 248, 891);
        ctx.font = '500 64px League Spartan';
        ctx.fillText('BACKEND DEVELOPMENT WITH RUST', 248, 990);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords('on 22 July 2022'), 248, 1060);

        if (canvasRef.current) setCanvasUrl(canvasRef.current.toDataURL()!);
    };

    const downloadPng = () => {
        const canvas = canvasRef.current;
        if (canvas == null) throw new Error('Could not get canvas');
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'certificate.png';
        document.body.appendChild(a);
        a.click();
    };

    const downloadPdf = () => {
        const canvas = canvasRef.current;
        if (canvas == null) throw new Error('Could not get canvas');
        const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
            orientation: 'l', // landscape
            unit: 'pt', // points, pixels won't work properly
            format: [canvas.width, canvas.height], // set needed dimensions for any element
        });

        pdf.addImage(dataUrl, 'JPEG', 0, 0, canvas.width, canvas.height);
        pdf.save('certificate.pdf');
    };

    useEffect(() => {
        (async () => {
            await populateCert();
        })();
    }, []);

    return (
        <div className="flex flex-col pt-6 px-20">
            <img width="2000px" height="1414px" alt="Certificate" src={canvasUrl} />
            <canvas className={`rounded-t-lg hidden`} ref={canvasRef} width={2000} height={1414} />
            <div className="mt-8 flex space-x-4 justify-center">
                <a
                    onClick={downloadPng}
                    className="cursor-pointer rounded-lg bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 active:bg-sky-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50"
                >
                    Download as PNG
                </a>
                <a
                    onClick={downloadPdf}
                    className="cursor-pointer rounded-lg bg-slate-700 py-2 px-4 text-sm font-medium text-white hover:bg-slate-600 active:text-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                >
                    Download as PDF
                </a>
            </div>
        </div>
    );
};

export default Home;
