export const generateInviteCode = (length = 6) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for(let i = 0; i < length; i++){
        const rand = Math.floor(Math.random() * characters.length);
        code += characters[rand];
    }
    return code;

};
