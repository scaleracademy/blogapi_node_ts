import { SignJWT, jwtVerify } from "jose";

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
    let sub;
    try {
      const tokenData = await jwtVerify(token, SECRET);
      sub = tokenData.payload.sub;
    } catch (err) {
      throw new Error("Token validation failed");
    }
    if (!sub) {
      throw new Error("Invalid token data");
    }
    return parseInt(sub);
  },
};
