import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const session = await getServerSession(req, res, authOptions);
        if (!session)
            return res
                .status(401)
                .json({ message: "Please sign in" });

        // Get Auth Users Posts
        try {
            const result = await prisma.post.create({
                data: {
                    title,
                    userId: prismaUser?.id,
                },
            });
            res.status(200).json(result);
        } catch (err) {
            res.status(403).json({
                err: "Error has occured whilst making a post",
            });
        }
    }
}
