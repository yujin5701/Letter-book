import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "토큰이 없습니다 "});

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await prisma.findUnique({ where: { id: decoded.userId } });

        if(!user) return res.status(401).json({ error: "유효하지 않은 사용자입니다."});

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "토큰 검증 실패" });
    }
};