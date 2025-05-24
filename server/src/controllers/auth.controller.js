import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashed,
                name,
            },
        });
        res.status(201).json({
            message: "회원가입 완료",
            user: { id: user.id, email: user.email, name: user.name },
        });
    } catch (err) {
        console.error("❌ 회원가입 중 에러:", err);
        res.status(400).json({ error: "회원가입 실패: 이메일 중복 또는 오류" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401).json({ error: "이메일 또는 비밀번호 오류 "});
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ message: "로그인 성공", token });
};

export const getMe = async (req, res) => {
  const user = req.user;
  res.json({ message: "인증된 사용자입니다.", user: { id: user.id, email: user.email, name: user.name } });
};