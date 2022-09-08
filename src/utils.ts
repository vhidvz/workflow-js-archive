import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

const parser = () =>
  new XMLParser({
    attributeNamePrefix: '',
    ignoreAttributes: false,
    allowBooleanAttributes: true,
  });

export function getProcess(data: string) {
  let process;
  try {
    process = getProcessFromFile(data);
  } catch {
    process = getProcessFromString(data);
  }

  if (!process) throw new Error('Process not found');
  if (process?.length) throw new Error('Multiple process is not supported');

  return process;
}

export function getProcessFromFile(path: string) {
  let data = fs.readFileSync(path, 'utf8');
  data = data.split('bpmn:').join('');
  return parser().parse(data)?.definitions?.process ?? null;
}

export function getProcessFromString(str: string) {
  str = str.split('bpmn:').join('');
  return parser().parse(str)?.definitions?.process ?? null;
}
