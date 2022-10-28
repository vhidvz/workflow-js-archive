import { DefineOption, Metadata } from '../types';
import { parse, readFile } from '../../utils';
import { Definition } from '../../core';
import 'reflect-metadata';

export function DefineProcess(options: DefineOption, id?: string | symbol) {
  if ('path' in options)
    Definition.add(parse(readFile(options.path))['bpmn:definitions'], id);

  if ('xml' in options) Definition.add(parse(options.xml)['bpmn:definitions'], id);
  if ('schema' in options) Definition.add(options.schema['bpmn:definitions'], id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      $__metadata__: Metadata = {
        definition: { id },
        process: {
          ...('id' in options ? { id: options.id } : {}),
          ...('name' in options ? { name: options.name } : {}),
        } as Metadata['process'],
      };
    };
  };
}
