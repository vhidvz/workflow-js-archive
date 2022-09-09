import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';

const parser = () =>
  new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '$_',
    allowBooleanAttributes: true,
  });

export function getProcessFromFile(path: string) {
  let data = fs.readFileSync(path, 'utf8');
  data = data.split('bpmn:').join('');
  return parser().parse(data)?.definitions?.process ?? null;
}

export function getProcessFromString(str: string) {
  str = str.split('bpmn:').join('');
  return parser().parse(str)?.definitions?.process ?? null;
}

export function toProcess(obj: any, exclude?: string[]) {
  if (typeof obj === 'object')
    for (const key in obj) {
      if (exclude?.includes(key)) continue;

      obj[key] = toProcess(Array.isArray(obj[key]) ? obj[key] : [obj[key]]);
    }

  return obj;
}
