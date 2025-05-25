import prisma from "../prisma/client.js";

export const getHomeInfo = async (req, res) => {
    const userId = req.user.id;
    const relationship = await prisma.relationship.findFirst({
  where: {
    OR: [
      { user1Id: userId },
      { user2Id: userId }
    ]
  }
});
    if (!relationship.anniversary) {
    return res.status(400).json({ error: "기념일이 등록되어 있지 않습니다." });
}
    // 1. 관계가 없다면 예외 처리
    if(!relationship){
        return res.status(404).json({ error: "연결된 관계가 없습니다."});
    }

    // 2. 상대방 ID 추출
    let user2Id;
    if(relationship.user1Id == userId){
        user2Id = relationship.user2Id;
    } else{
        user2Id = relationship.user1Id;
    }

    // 3. 상대방 유저 조회
    const user2 = await prisma.user.findUnique(
        { where:  {id : user2Id}},
    );

    if(!user2){
        return res.status(404).json({ error: "상대방 유저를 찾을 수 없습니다."});
    }

    const latestLetters = await prisma.letter.findMany({
        where: {
            relationshipId: relationship.id
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3
    });


    const anniversary = new Date(relationship.anniversary);
    const daymilestones = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500,1600, 1700, 1800, 1900, 2000];
    const msInday = 24 * 60 * 60 * 1000;

    const dayBased = daymilestones.map((days) => {
        const date = new Date(anniversary.getTime() + days * msInday);
        return {
            label: `${days}일`,
            days,
            date: date.toISOString().split("T")[0],
        };
    });

    const yearMilestones = [1, 2, 3, 4, 5, 6, 7];
    const yearBased = yearMilestones.map((years) => {
  const year = anniversary.getFullYear() + years;
  const month = anniversary.getMonth();      // 0부터 시작 (0 = 1월)
  const day = anniversary.getDate();

  // 연, 월, 일로 새 날짜 생성
  const date = new Date(year, month, day);

  // 만약 date가 유효하지 않은 날짜라면 → 자동 보정되므로 그대로 사용 가능
  if (isNaN(date.getTime())) {
    return null; // 혹은 에러 처리
  }

  return {
    label: `${years}주년`,
    years,
    date: date.toISOString().split("T")[0],
  };
}).filter(Boolean); // 혹시 null인 항목 제거
    const milestones = [...dayBased, ...yearBased];
    milestones.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json({
        relationship_id: relationship.id,
        partner_name: user2.name,
        anniversary: anniversary.toISOString().split("T")[0],
        latest_letters: latestLetters,
        milestones: milestones,
        book_preview: {
            title: `${user2.name}와의 편지 모음`,
            preview: latestLetters.map(l => l.content.slice(0,50)).join(" ... ")
        }
    });
};