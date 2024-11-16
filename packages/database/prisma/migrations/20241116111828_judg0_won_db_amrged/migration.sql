-- CreateTable
CREATE TABLE "submissions" (
    "id" SERIAL NOT NULL,
    "source_code" TEXT,
    "language_id" INTEGER,
    "stdin" TEXT,
    "expected_output" TEXT,
    "stdout" TEXT,
    "status_id" INTEGER,
    "created_at" TIMESTAMP(6),
    "finished_at" TIMESTAMP(6),
    "time" DECIMAL,
    "memory" INTEGER,
    "stderr" TEXT,
    "token" VARCHAR,
    "number_of_runs" INTEGER,
    "cpu_time_limit" DECIMAL,
    "cpu_extra_time" DECIMAL,
    "wall_time_limit" DECIMAL,
    "memory_limit" INTEGER,
    "stack_limit" INTEGER,
    "max_processes_and_or_threads" INTEGER,
    "enable_per_process_and_thread_time_limit" BOOLEAN,
    "enable_per_process_and_thread_memory_limit" BOOLEAN,
    "max_file_size" INTEGER,
    "compile_output" TEXT,
    "exit_code" INTEGER,
    "exit_signal" INTEGER,
    "message" TEXT,
    "wall_time" DECIMAL,
    "compiler_options" VARCHAR,
    "command_line_arguments" VARCHAR,
    "redirect_stderr_to_stdout" BOOLEAN,
    "callback_url" VARCHAR,
    "additional_files" BYTEA,
    "enable_network" BOOLEAN,
    "submissionId" TEXT,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "submissions_token_key" ON "submissions"("token");

-- CreateIndex
CREATE INDEX "index_submissions_on_token" ON "submissions"("token");

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
