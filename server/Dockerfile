# 베이스 이미지
FROM node:18

# 작업 디렉토리 생성
WORKDIR /app

# 의존성 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# Prisma client 생성 (prisma generate)
RUN npx prisma generate --schema=src/prisma/schema.prisma

# 서버 실행
EXPOSE 3000
CMD ["npm", "start"]
