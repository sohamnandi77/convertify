import { Action } from "@/types";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

function getFileExtension(fileName: string): string {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(fileName);
  return match && match[1] ? match[1] : ""; // Return empty string if no extension
}

function removeFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  return lastDotIndex !== -1 ? fileName.slice(0, lastDotIndex) : fileName;
}

export default async function convert(
  ffmpeg: FFmpeg,
  action: Action
): Promise<{ url: string; output: string }> {
  const { file, to, file_name, file_type } = action;

  // Ensure input and output filenames
  const input = file_name;
  const output = `${removeFileExtension(file_name)}.${to}`;

  try {
    // Write input file to FFmpeg's virtual file system
    await ffmpeg.writeFile(input, await fetchFile(file));

    // Prepare FFmpeg commands
    const ffmpegCmd: string[] =
      to === "3gp"
        ? [
            "-i",
            input,
            "-r",
            "20",
            "-s",
            "352x288",
            "-vb",
            "400k",
            "-acodec",
            "aac",
            "-strict",
            "experimental",
            "-ac",
            "1",
            "-ar",
            "8000",
            "-ab",
            "24k",
            output,
          ]
        : // Using codec copy for faster transcoding
          ["-i", input, "-codec", "copy", output];

    // Execute FFmpeg conversion
    await ffmpeg.exec(ffmpegCmd);

    // Read the converted file
    const data = await ffmpeg.readFile(output);

    // Create blob and object URL
    const blob = new Blob([data], { type: file_type.split("/")[0] });
    const url = URL.createObjectURL(blob);

    return { url, output };
  } catch (error) {
    console.error("Conversion error:", error);
    throw error; // Re-throw to allow caller to handle
  }
}
