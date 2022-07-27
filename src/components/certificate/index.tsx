import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import image from '../../../public/images/metacamp-cert01.png';
import { useParams } from 'react-router-dom';
import { PublicKey } from '@solana/web3.js';
import { initElearnClient } from '../../client/common/init';

const Certificate = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { certPda } = useParams();
    const [canvasUrl, setCanvasUrl] = useState<string>(image);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const populateCert = async (recognition: string, studentName: string, courseName: string, date: string) => {
        const certImg = new Image();
        certImg.src = image;
        await certImg.decode();

        // images are loaded here and we can go about our business
        const canvas = canvasRef.current;
        if (canvas == null) throw new Error('Could not get canvas');
        const ctx = canvas.getContext('2d');
        if (ctx == null) throw new Error('Could not get context');

        const spaceWords = (words: string) => {
            return words.split('').join(String.fromCharCode(8202));
        };
        ctx.drawImage(certImg, 0, 0, 2000, 1414);
        ctx.font = '600 124px League Spartan';
        ctx.fillStyle = '#20201E';
        ctx.fillText('CERTIFICATE OF', 248, 490);
        ctx.fillText(recognition, 248, 620);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords('This certificate is presented to'), 248, 706);
        ctx.font = '500 84px League Spartan';
        ctx.fillText(studentName, 248, 820);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords('For successfully completing the course'), 248, 891);
        ctx.font = '500 64px League Spartan';
        ctx.fillText(courseName, 248, 990);
        ctx.font = '28px Montserrat';
        ctx.fillText(spaceWords(`on ${date}`), 248, 1060);

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
            if (certPda) {
                const certPdaKey = new PublicKey(certPda);
                const elClient = await initElearnClient();
                const certAcc = await elClient.fetchCertificateAcc(certPdaKey);
                await populateCert(certAcc.studentGrade, certAcc.studentName, certAcc.courseName, '22 July 2022');
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            <div className="absolute -mt-96" style={{fontFamily: "League Spartan", fontWeight: 600}}>.</div>
            <div className="absolute -mt-96" style={{fontFamily: "League Spartan", fontWeight: 500}}>.</div>
            <div className="absolute -mt-96" style={{fontFamily: "Montserrat", fontWeight: 300}}>.</div>
            {isLoading && (
                <div className="flex justify-center items-center" style={{ height: '80vh' }}>
                    <div className="flex flex-row items-center">
                        <svg
                            className="animate-spin -ml-1 mr-3 h-7 w-7 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="text-lg">Fetching certificate...</p>
                    </div>
                </div>
            )}
            <div className={`flex flex-col md:pt-6 px-4 md:px-20 ${isLoading ? 'hidden' : ''}`}>
                <div className="flex justify-center my-8">
                    <a
                        className="w-max text-base leading-5 text-sky-400 bg-sky-400/10 rounded-lg py-3 px-5 flex items-center hover:bg-sky-400/20"
                        href={`https://solana.fm/address/${certPda}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg className="w-6 h-6 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Verified certificate, metadata found on blockchain
                        <svg width="4" height="6" className="ml-3 overflow-visible text-sky-400" aria-hidden="true">
                            <path
                                d="M0 0L3 3L0 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </a>
                </div>
                <img width="2000px" height="1414px" alt="Certificate" src={canvasUrl} />
                <canvas className={`rounded-t-lg hidden`} ref={canvasRef} width={2000} height={1414} />
                <div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 justify-center">
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
        </div>
    );
};

export default Certificate;
