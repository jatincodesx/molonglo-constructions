import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "YourPasswordHere"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("Local env file:");
console.log(`ADMIN_PASSWORD_HASH='${hash.replace(/\$/g, "\\$")}'`);
console.log("");
console.log("Cloudflare secret value:");
console.log(hash);
