// https://nextjs.org/docs/app/building-your-application/routing/middleware
export { default } from "next-auth/middleware";

export const config = {
  // matcher allows you to filter Middleware to run on specific paths.
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
