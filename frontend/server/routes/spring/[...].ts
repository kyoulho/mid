export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const targetURL = config.springApiBaseUrl + event.node.req.url?.replace(/^\/spring/, '');

  return proxyRequest(event, targetURL);
});
