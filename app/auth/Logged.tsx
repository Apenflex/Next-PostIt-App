"use client";

import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";

type User = {
    image: string;
};

export default function Logged({ image }: User) {
    return (
        <li className="flex gap-8 items-center">
            <button
                className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md"
                onClick={() => signOut()}
            >
                Sign out
            </button>
            <Link href={"/dashboard"}>
                <Image
                    className="w-14 rounded-full"
                    width={64}
                    height={64}
                    src={image}
                    alt={"avatar"}
                    priority
                />
            </Link>
        </li>
    );
}
