import { Injectable } from "@nestjs/common";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

@Injectable()
export class TaskOutputService {
    async writeTaskOutput(taskId: number) {
        const outputDir = join(process.cwd(), '..', 'data', 'tasks');
        await mkdir(outputDir, { recursive: true });

        const outputPath = join(outputDir, `task-${taskId}.json`);

        const payload = {
            taskId,
            generatedAt: new Date().toISOString(),
            records: [
                { source: 'users', count: Math.floor(Math.random() * 100) },
                { source: 'accounts', count: Math.floor(Math.random() * 100) },
                { source: 'transactions', count: Math.floor(Math.random() * 100) },
            ],
        };

        await writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf-8');

        return outputPath;
    }
}
