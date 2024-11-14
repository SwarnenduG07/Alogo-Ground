-- CreateTable
CREATE TABLE "Languages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "compile_cmd" VARCHAR,
    "rum_cmd" VARCHAR,
    "source_file" VARCHAR,
    "is_archived" BOOLEAN DEFAULT false,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);
