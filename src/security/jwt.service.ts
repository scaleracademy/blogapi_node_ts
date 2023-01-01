import { SignJWT, jwtDecrypt } from "jose";

const SECRET = new TextEncoder().encode(
  // TODO: save it in config / .env file and do not commit to git
  "some random long string that we use as our secret"
);

const ALG = "HS256";

export const jwtService = {
  async createToken(userId: number): Promise<string> {
    const jwtSigner = new SignJWT({ sub: userId.toString() })
      .setProtectedHeader({ alg: ALG })
      .setIssuedAt()
      .setExpirationTime("7d");

    return await jwtSigner.sign(SECRET);
  },

  async decodeToken(token: string): Promise<number> {
    // TODO: handle decription errors
    const tokenData = await jwtDecrypt(token, SECRET);
    if (!tokenData.payload.sub) {
      throw new Error("Invalid token");
    }
    return parseInt(tokenData.payload.sub);
  },
};
