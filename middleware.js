export {default} from 'next-auth/middleware'
//"/api/:path*"
export const config = {matcher: ["/dashboard", "/dashboard/:path*"]}
