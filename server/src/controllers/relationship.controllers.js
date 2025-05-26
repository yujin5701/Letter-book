import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import { generateInviteCode } from "../utils/inviteCode.js";
import { createRelationship, acceptRelationship } from "../repositories/relationship.repository.js"
import { setStartDateByUserId } from "../repositories/relationship.repository.js";

export const invite = async (req, res) => {
    try{
        const userId = req.user.id;
        const inviteCode = generateInviteCode();

        const relationship = await createRelationship(userId, inviteCode); // DB에 저장
        
        return res.status(201).json({
            message: "초대 코드가 생성되었습니다.",
            relationship_id: relationship.id,
            invite_code: relationship.inviteCode,
        });
    } catch (error) {
        console.error("❌ 관계 생성 오류:", error);
        return res.status(500).json({ error: "관계 생성에 실패했습니다. "});
    }
};

export const handleAcceptRelationship = async (req, res) => {
    try{
        const invite_code = req.body.invite_code;
        const user_id = req.user.id;
        if (!invite_code || typeof invite_code !== "string") {
            return res.status(400).json({ error: "유효한 초대 코드가 필요합니다." });
        }

        const {relationship_id} = await acceptRelationship(user_id, invite_code);

        return res.status(200).json({
            message: "관계가 성공적으로 연결되었습니다.",
            relationship_id: relationship_id,
        });
    } catch (error) {
        console.error("❌ 관계 연결 오류:", error);
        if (error.message === "이미 연결된 초대 코드입니다.") {
            return res.status(409).json({ error: error.message });
        } if (error.message === "초대 코드를 찾을 수 없습니다.") {
            return res.status(404).json({ error: error.message });
        }

    return res.status(500).json({ error: "서버 내부 오류로 관계 연결에 실패했습니다." });
    }
    
}

export const setStartDate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { date } = req.body;

        const updated = await setStartDateByUserId(userId, date);

        res.status(200).json({
            message: "시작일이 저장되었습니다.",
            relationship: updated,
        });
    } catch (error) {
        console.log("❌ 시작일 저장 오류:", error);
        res.status(500).json({
            message: error.message || "서버 오류",
        });
    }
};