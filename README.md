# TokenSail - Chart Your Course with TokenSail

#### Video Demo:  https://youtu.be/5aF1IkKEXJk

#### Description:

This is my final cs50 project.

It is a web app that is a toolbox/analyzer for your crypto wallet. The app allows you to follow for the changes of a
particular currency. Create NFT Gallery Folders and analyze your wallet activity.

The app uses GraphQL, Nextjs, Prisma, Postgresql, and Node.js (Expressjs).
The app uses the Coinbase, Alchemy and Bitquery API services to query the blockchain for data.
Media content for the app is generated using Midjourney.

The app is very much a work in progress. I will continue to work on
it and add more features.
But for now I think it is a quite sizable and well-structured project
making it challenging to describe the purpose of each file/folder due to their abundance.

I tried to develop the app so that it is possible to sustain it and add new features
by preserving a particular architecture and using dev. patterns - MVC pattern for my server and modular architecture for
my client side.

## How to run the app

1. Clone the repo
2. Install requirements `npm i` (preserve all versions, don't update)
3. Run the client folder `cd client & npm run dev`
4. Run the server folder `cd server & npm run dev`
5. Set up postgresql database
6. push the schema to the database with prisma `cd server & npx prisma db push`