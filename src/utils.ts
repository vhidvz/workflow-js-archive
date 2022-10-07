import { BPMNCollaboration, BPMNDefinition, BPMNProcess, BPMNSchema } from './type';

import { parseString } from 'xml2js';
import { find } from 'xml2js-xpath';

import fs from 'fs';

export const readFile = (path: string): string => fs.readFileSync(path, 'utf8');

export const parse = (xml: string): BPMNSchema => {
  let parse;
  parseString(xml, { async: false }, (err, result) => {
    if (err) throw err;
    parse = result;
  });

  if (!parse) throw new Error('Input string is not parsable');

  return parse;
};

export const processes = (obj: BPMNSchema | BPMNDefinition): BPMNProcess[] =>
  find(obj, '//bpmn:process');
export const collaborations = (obj: BPMNSchema | BPMNDefinition): BPMNCollaboration[] =>
  find(obj, '//bpmn:collaboration');
