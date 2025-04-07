export default defineNuxtRouteMiddleware(async (to) => {
  const { status, signOut, getSession } = useAuth();
  if (status.value === 'loading') return;
  if (status.value === 'unauthenticated') return;

  const session = await getSession();
  const exp = new Date(session?.accessTokenExpires || 0).getTime();
  const now = Date.now();

  // 만료된 세션이면 로그아웃 처리
  if (exp && now >= exp) {
    signOut();
  }
});
