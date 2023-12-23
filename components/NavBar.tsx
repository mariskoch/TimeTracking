'use client';

import React from "react";
import {IoHome} from "react-icons/io5";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const NavBar: React.FC = () => {
    const session = useSession();

    return (
        <div className={'flex h-[4em] bg-gray-300 justify-center'}>
            <div className={'h-full w-full sm:max-w-[1080px]'}>
                <div className={'flex flex-row h-full'}>
                    <div className={'flex items-center ml-6'}>
                        <Link href={'/'}>
                            <IoHome size={'2em'}></IoHome>
                        </Link>
                    </div>
                    <div className={'flex ml-auto mr-6 items-center'}>
                        {session.status === 'authenticated' ? (
                            <button className={'bg-gray-800 text-white rounded-md w-full py-2 px-3 flex justify-center'}
                                    onClick={() => signOut({callbackUrl: '/'})}>Sign Out
                            </button>
                        ) : (
                            <>
                                <Link href={'/login'} className={'mr-5'}>Login</Link>
                                <Link href={'/register'}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
