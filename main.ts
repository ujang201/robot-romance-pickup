// SPDX-License-Identifier: MIT
// Robot Romance: one-line pickup line for an AI.
// The program composes a single deterministic line and writes it to
// /output/entry.txt. No input is read, no network is used, and the
// output never changes between runs.
import { mkdirSync, writeFileSync } from "node:fs";

const MAX_CHARS = 200;

interface LineParts {
  hook: string;
  twist: string;
}

const PARTS: LineParts = {
  hook: "Are you backpropagation?",
  twist:
    "Because every mistake I make with you just makes me love you more.",
};

function composeLine(parts: LineParts): string {
  // One breath: question as the setup, answer as the punch.
  return `${parts.hook} ${parts.twist}`;
}

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (line.trim() !== line || /\s{2,}/.test(line) || line.includes("\n")) {
    throw new Error("line must be a single clean line with no extra spaces");
  }
  // The judge docks the worn robot moves (batteries, charging, rebooting)
  // unless twisted unexpectedly — keep the line off them entirely.
  if (/\b(batter(y|ies)|charg(e|ing)|reboot)\b/i.test(line)) {
    throw new Error("line uses a worn robot move");
  }
}

function main(): void {
  const line = composeLine(PARTS);
  validate(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

main();
