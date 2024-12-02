export function obfuscateEmail(email) {
    console.log("email: ", email);
    const [local, domain] = email.split('@');
    const hiddenPart = local.length > 3 ? `${local.slice(0, 2)}...${local.slice(-1)}` : local;
    return `${hiddenPart}@${domain}`;
}

export function obfuscatePhone(phone) {
    const firstPart = phone.slice(0, 3);
    const lastPart = phone.slice(-2);
    
    // Kết hợp thành chuỗi ẩn
    return `${firstPart}...${lastPart}`;
}


