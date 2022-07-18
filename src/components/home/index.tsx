import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col md:pt-6 px-4 md:px-20">
            <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group relative rounded-xl border border-slate-700">
                    <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.sky.50)),var(--link-grid-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--link-grid-hover-bg:theme(colors.slate.800)]"></div>
                    <div className="relative overflow-hidden rounded-xl p-6">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                        >
                            <defs>
                                <radialGradient
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    id=":R1j56tm:-gradient-dark-1"
                                    gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)"
                                >
                                    <stop stopColor="#0EA5E9"></stop>
                                    <stop stopColor="#22D3EE" offset=".527"></stop>
                                    <stop stopColor="#818CF8" offset="1"></stop>
                                </radialGradient>
                                <radialGradient
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    id=":R1j56tm:-gradient-dark-2"
                                    gradientTransform="matrix(0 14 -14 0 16 10)"
                                >
                                    <stop stopColor="#0EA5E9"></stop>
                                    <stop stopColor="#22D3EE" offset=".527"></stop>
                                    <stop stopColor="#818CF8" offset="1"></stop>
                                </radialGradient>
                            </defs>
                            <g
                                className="inline"
                            >
                                <path
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
                                    fill="url(#:R1j56tm:-gradient-dark-1)"
                                ></path>
                                <path
                                    d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                                    fill="url(#:R1j56tm:-gradient-dark-2)"
                                ></path>
                            </g>
                        </svg>
                        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
                            <Link to="/certificate">
                                <span className="absolute -inset-px rounded-xl"></span>Search Certificate
                            </Link>
                        </h2>
                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                            Search individual certificate by providing certificate ID.
                        </p>
                    </div>
                </div>
                <div className="group relative rounded-xl border border-slate-700">
                    <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.sky.50)),var(--link-grid-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--link-grid-hover-bg:theme(colors.slate.800)]"></div>
                    <div className="relative overflow-hidden rounded-xl p-6">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 32 32"
                            fill="none"
                            className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                        >
                            <defs>
                                <radialGradient
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    id=":R1i56tm:-gradient-dark"
                                    gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)"
                                >
                                    <stop stopColor="#0EA5E9"></stop>
                                    <stop stopColor="#22D3EE" offset=".527"></stop>
                                    <stop stopColor="#818CF8" offset="1"></stop>
                                </radialGradient>
                            </defs>
                            <g className="inline" fill="url(#:R1i56tm:-gradient-dark)">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3 17V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm16 10v-9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2Zm0-23v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1ZM3 28v-3a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"
                                ></path>
                                <path d="M2 4v13h2V4H2Zm2-2a2 2 0 0 0-2 2h2V2Zm8 0H4v2h8V2Zm2 2a2 2 0 0 0-2-2v2h2Zm0 13V4h-2v13h2Zm-2 2a2 2 0 0 0 2-2h-2v2Zm-8 0h8v-2H4v2Zm-2-2a2 2 0 0 0 2 2v-2H2Zm16 1v9h2v-9h-2Zm3-3a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1v-2Zm6 0h-6v2h6v-2Zm3 3a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1h2Zm0 9v-9h-2v9h2Zm-3 3a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1v2Zm-6 0h6v-2h-6v2Zm-3-3a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1h-2Zm2-18V4h-2v5h2Zm0 0h-2a2 2 0 0 0 2 2V9Zm8 0h-8v2h8V9Zm0 0v2a2 2 0 0 0 2-2h-2Zm0-5v5h2V4h-2Zm0 0h2a2 2 0 0 0-2-2v2Zm-8 0h8V2h-8v2Zm0 0V2a2 2 0 0 0-2 2h2ZM2 25v3h2v-3H2Zm2-2a2 2 0 0 0-2 2h2v-2Zm9 0H4v2h9v-2Zm2 2a2 2 0 0 0-2-2v2h2Zm0 3v-3h-2v3h2Zm-2 2a2 2 0 0 0 2-2h-2v2Zm-9 0h9v-2H4v2Zm-2-2a2 2 0 0 0 2 2v-2H2Z"></path>
                            </g>
                        </svg>
                        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
                            <Link to="/batches">
                                <span className="absolute -inset-px rounded-xl"></span>Manage Batches
                            </Link>
                        </h2>
                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                            Create new batches and generate certificates, approved managers only.
                        </p>
                    </div>
                </div>
                <div className="group relative rounded-xl border border-slate-700">
                    <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--link-grid-hover-bg,theme(colors.sky.50)),var(--link-grid-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--link-grid-hover-bg:theme(colors.slate.800)]"></div>
                    <div className="relative overflow-hidden rounded-xl p-6">
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 32 32"
                            fill="none"
                            className="h-8 w-8 [--icon-foreground:theme(colors.slate.900)] [--icon-background:theme(colors.white)]"
                        >
                            <defs>
                                <radialGradient
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    id=":R1j56tm:-gradient-dark-1"
                                    gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)"
                                >
                                    <stop stopColor="#0EA5E9"></stop>
                                    <stop stopColor="#22D3EE" offset=".527"></stop>
                                    <stop stopColor="#818CF8" offset="1"></stop>
                                </radialGradient>
                                <radialGradient
                                    cx="0"
                                    cy="0"
                                    r="1"
                                    gradientUnits="userSpaceOnUse"
                                    id=":R1j56tm:-gradient-dark-2"
                                    gradientTransform="matrix(0 14 -14 0 16 10)"
                                >
                                    <stop stopColor="#0EA5E9"></stop>
                                    <stop stopColor="#22D3EE" offset=".527"></stop>
                                    <stop stopColor="#818CF8" offset="1"></stop>
                                </radialGradient>
                            </defs>
                            <g
                                className="hidden dark:inline"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    d="M17.676 3.38a3.887 3.887 0 0 0-3.352 0l-9 4.288C3.907 8.342 3 9.806 3 11.416v9.168c0 1.61.907 3.073 2.324 3.748l9 4.288a3.887 3.887 0 0 0 3.352 0l9-4.288C28.093 23.657 29 22.194 29 20.584v-9.168c0-1.61-.907-3.074-2.324-3.748l-9-4.288Z"
                                    stroke="url(#:R1j56tm:-gradient-dark-1)"
                                ></path>
                                <path
                                    d="M16.406 8.087a.989.989 0 0 0-.812 0l-7 3.598A1.012 1.012 0 0 0 8 12.61v6.78c0 .4.233.762.594.925l7 3.598a.989.989 0 0 0 .812 0l7-3.598c.361-.163.594-.525.594-.925v-6.78c0-.4-.233-.762-.594-.925l-7-3.598Z"
                                    fill="url(#:R1j56tm:-gradient-dark-2)"
                                    stroke="url(#:R1j56tm:-gradient-dark-2)"
                                ></path>
                            </g>
                        </svg>
                        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
                            <a href="mailto:team@metacamp.so">
                                <span className="absolute -inset-px rounded-xl"></span>Certification Enquiries
                            </a>
                        </h2>
                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
                            Keen to issue your own certificates on our platform? Reach out to us!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
