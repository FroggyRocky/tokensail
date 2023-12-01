-- CreateTable
CREATE TABLE "NftFolders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tokens" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "NftFolders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NftFolders" ADD CONSTRAINT "NftFolders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
