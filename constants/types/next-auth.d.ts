import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  // getSession(), getServerSession()으로 반환되는 객체
  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;
  }
}

declare module 'next-auth/jwt' {
  // next-auth.session-token 으로 쿠키에 암호화 되어 저장되는 객체
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}
