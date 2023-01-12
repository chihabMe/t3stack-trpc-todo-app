a basic project managment web app like todois built with t3tack 
### tech stack
    -trpc
    -nextjs
    -next-auth
    -prisma
    -tailwind
    -postgresql
    
### how to run it localy 
#### 0: you need to install npm packages 
         run (pnpm/npm/yarn) install 
        ex:
             "pnpm install"
#### 1: you need to provider a local url database (postgresql ) in the .env file DATABASE_URL=("your database url") or you can change the default database to sqlite3 
#### 2: do the migratinos with prisma cli 
         run "pnpm prisma migrate dev"
#### 3:you need to provider google/github secret key and client id
#### 4: run "pnpm run dev" to run the development server or "pnpm run build"  and "pnpm start to serve" 
