import React from "react";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#fefaf4] flex items-center justify-center text-[#5b4636] px-6">
      <div className="w-full max-w-[700px] bg-[#fffefb] rounded-2xl shadow-xl py-16 px-12 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-12 tracking-tight">You&In 💌</h1>

        {/* ✅ 여기가 핵심: space-y-6으로 버튼 사이 여백 확실히 줌 */}
        <div className="flex flex-col items-center space-y-6">
          <button className="block w-[240px] bg-[#f3e9dc] hover:bg-[#e9dfd1] text-[#5b4636] py-3 rounded-xl shadow text-base font-semibold transition">
            🌸 커플 등록하기
          </button>
          <button className="block w-[240px] bg-[#f3e9dc] hover:bg-[#e9dfd1] text-[#5b4636] py-3 rounded-xl shadow text-base font-semibold transition">
            💌 편지 쓰기
          </button>
          <button className="block w-[240px] bg-[#f3e9dc] hover:bg-[#e9dfd1] text-[#5b4636] py-3 rounded-xl shadow text-base font-semibold transition">
            📖 지난 편지 보기
          </button>
          <button className="block w-[240px] bg-[#f3e9dc] hover:bg-[#e9dfd1] text-[#5b4636] py-3 rounded-xl shadow text-base font-semibold transition">
            🎉 기념일 보기
          </button>
        </div>

        <p className="mt-12 text-sm text-[#9c8670] tracking-tight text-center">
          오늘도 서로를 향한 마음을 기록해보세요.
        </p>
      </div>
    </div>
  );
}
