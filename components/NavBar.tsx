'use client';

import React, {useState} from "react";
import {IoHome} from "react-icons/io5";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {BarLoader} from "react-spinners";

const NavBar: React.FC = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
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
                    {session.status === 'authenticated' && (
                        <div className={'flex ml-auto items-center'}>
                            Hello, {session.data.user.firstName} {session.data.user.lastName}
                        </div>
                    )}
                    <div className={'flex ml-auto mr-6 items-center'}>
                        {session.status === 'authenticated' ? (
                            <button
                                disabled={isLoading!}
                                className={'bg-gray-800 text-white rounded-md w-full py-2 px-3 flex justify-center h-[40px] disabled:bg-gray-400'}
                                onClick={() => {
                                    setLoading(true);
                                    signOut({callbackUrl: '/'});
                                }}>
                                {isLoading ? (
                                    <BarLoader
                                        color="rgba(200, 200, 200, 0.3)"
                                        height={5}
                                        loading={true}
                                        speedMultiplier={2}
                                        width={75}
                                        className={'mt-[10px]'}
                                    />
                                ) : (
                                    'Sign Out'
                                )}
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
