# TimeTracking

<div align="center" style="margin: 10px 0px">
    <a href="https://time-tracking-gamma.vercel.app" target="_blank">
    <button style="background-color: #FFFFFF; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: .25rem; box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0; color: rgba(0, 0, 0, 0.85); cursor: pointer; font-family: system-ui,-apple-system,system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 16px; font-weight: 600; line-height: 1.25; padding: calc(.875rem - 1px) calc(1.5rem - 1px); text-decoration: none; transition: all 250ms; user-select: none; -webkit-user-select: none; touch-action: manipulation;">
        Try the TimeTracking application now!
    </button>
    </a>
</div>

This application enables everyone to track your working hours reliably. With the intuitive UI you can login and submit your work time. Your working hours can be exported into PDF through the exports menu.

## Benefits of using this TimeTracking application

1. **Secure registration and storage of the data.** Nobody except you will be able to access your work time.
2. **Intuitive UI. Everyone can get started in no-time.** Everything is self explanatory.
3. **It is open source.** Are you missing a feature? Add it and create a PR! And you will benefit from features others have implemented.
4. **Multi-language support.** This application currently supports the English and Germany language. Further langues can be added with ease.

## How to develop

To start developing, follow these steps:

1. Run `npm install` to install all dependencies.
2. Create a `.env` file at root level and copy the contents from the `.env.example` into it. **Do not use the given secret in production, it is for development only.**
3. Run `docker compose up -d` to start the PostgreSQL database and pgAdmin.
4. Run `npx prisma migrate dev` to inject the database schemas.
5. Run `npm run dev` to start the development server with hot reload.

The application is running at [`localhost:3000`](http://loclahost:3000).

## CI/CD

The application is currently deployed at Vercel. You can find the current deployment at [this link](https://time-tracking-gamma.vercel.app). 

When a new feature is merged into the master branch, it is automatically detected by Vercel and a new build is triggered. The new version of the application is live after approximately 1 minute after merging. Each branch is also being build and published under a branch-specific URL.
