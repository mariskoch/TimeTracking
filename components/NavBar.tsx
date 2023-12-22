import React from "react";
import {IoHome} from "react-icons/io5";
import Link from "next/link";

const NavBar: React.FC = () => {
    return (
        <div className={'flex h-[4em] bg-gray-300 justify-center'}>
            <div className={'h-full w-full sm:max-w-[900px]'}>
                <div className={'flex flex-row h-full'}>
                    <div className={'flex items-center ml-6'}>
                        <Link href={'/'}>
                            <IoHome size={'2em'}></IoHome>
                        </Link>
                    </div>
                    <div className={'flex ml-auto mr-6 items-center'}>
                        <Link href={'/login'} className={'mr-5'}>Login</Link>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
