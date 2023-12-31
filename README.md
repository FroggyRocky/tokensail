
# TokenSail - Chart Your Course with TokenSail
#### Video Demo:  https://youtu.be/5aF1IkKEXJk
#### Description: 
This is my final cs50 project. It is a web app that is a toolbox/analyzer for you cryptowallet. The app allows you to follow for the changes of a particular currency. Create Nft Gallery Folders and analyze your wallet activity. 
The app uses GraphQL, React, Prisma, Postgresql, and Node.js (express).
The app uses the Coinbase, Alchemy and Bitquery API services to query the blockchain for data.

## How to run the app
1. Clone the repo
2. Install requirements `npm i` (preserve all versions, don't update)
3. Run the client folder `cd client & npm run dev`
4. Run the server folder `cd server & npm run dev`
5. Set up postgresql database
6. push the schema to the database with prisma `cd server & npx prisma db push`