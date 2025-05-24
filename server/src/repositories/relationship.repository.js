import prisma from "../prisma/client.js"

export const createRelationship = async (user1Id, inviteCode) => {
    return await prisma.relationship.create({
        data: { // 관계 테이블에 이 데이터 넣어서 저장(나머지 필드는 기본값)
            user1Id,
            inviteCode,
        },
    });
};

export const findRelationshipByInviteCode = async (inviteCode) => {
    // 초대 코드로 관계를 DB에서 조회해서 반환
    const relationship = await prisma.relationship.findUnique({ 
        where: {inviteCode}
    });
    return relationship;
}

export const updateRelationshipWithUser2 = async (relationshipId, user2Id) => {
    const updateRelationship = await prisma.relationship.update({
        where: {id: relationshipId},
        data: {
            user2Id: user2Id,
            connectedAt: new Date(),
        }
    })
}

export const acceptRelationship = async (user2Id, inviteCode) => {
    // 1. 초대코드로 관계 조회
    // 2. 관계가 없으면 예외 발생
    // 3. 이미 user2Id가 있으면 예외 발생
    // 4. user2Id와 connectedAt 업데이트
    // 5. 결과 반환
    const relationship = await findRelationshipByInviteCode(inviteCode);
    
    if(!relationship) {
        console.log("초대 코드를 찾을 수 없습니다.");
        throw new Error("초대 코드를 찾을 수 없습니다.");
    }
    if(relationship.user2Id) {
        console.log("이미 연결된 초대 코드입니다.");
        throw new Error("이미 연결된 초대 코드입니다.");
    }

    const updatedRelationship = await updateRelationshipWithUser2(
        relationship.id, user2Id
    );

    return {
        relationship_id: updatedRelationship.id,
    };       
};