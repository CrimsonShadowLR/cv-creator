import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { getTemplate } from "@/lib/templates";
import type { Resume } from "@/types/resume";
import type { Lang } from "@/lib/templates";

const execAsync = promisify(exec);

interface PdfRequest {
  resume: Resume;
  templateId?: string;
  lang?: Lang;
}

export async function POST(req: NextRequest) {
  let inputPath = "";
  let outputPath = "";

  try {
    const { resume, templateId = "momo", lang = "en" }: PdfRequest =
      await req.json();

    const template = getTemplate(templateId);
    const typstContent = template.generate(resume, { lang });

    const id = `cv-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    inputPath = join(tmpdir(), `${id}.typ`);
    outputPath = join(tmpdir(), `${id}.pdf`);

    await writeFile(inputPath, typstContent, "utf-8");

    await execAsync(`typst compile "${inputPath}" "${outputPath}"`);

    const pdfBytes = await readFile(outputPath);
    const filename = `${(resume.title || "resume").replace(/[^\w\-]/g, "_")}.pdf`;

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);

    const isNotInstalled =
      msg.includes("ENOENT") ||
      msg.toLowerCase().includes("not found") ||
      msg.toLowerCase().includes("not recognized") ||
      msg.toLowerCase().includes("cannot find");

    if (isNotInstalled) {
      return NextResponse.json(
        {
          error:
            "Typst is not installed or not in PATH. " +
            "Install it with: winget install typst.typst  (Windows) " +
            "or: brew install typst  (macOS) " +
            "or download from https://github.com/typst/typst/releases",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: msg }, { status: 500 });
  } finally {
    if (inputPath) await unlink(inputPath).catch(() => {});
    if (outputPath) await unlink(outputPath).catch(() => {});
  }
}
