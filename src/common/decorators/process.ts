import { Definition, Token } from '../../core';
import { parse, readFile } from '../../utils';
import { BPMNProcess } from '../../type';
import { ProcessKey } from '../keys';
import { Options } from '../types';
import 'reflect-metadata';

/**
 * It takes a BPMN process definition and adds it to the `Definition` class
 *
 * @param {string | symbol} id - The id of the definition.
 * @param {Options} options - Options
 *
 * @returns A function that takes a class and returns a new class that extends the original class.
 */
export function DefineProcess(id: string | symbol, options: Options) {
  if ('path' in options)
    Definition.add(id, parse(readFile(options.path))['bpmn:definitions']);
  if ('schema' in options) Definition.add(id, options.schema['bpmn:definitions']);

  let process: BPMNProcess | undefined;

  if ('id' in options) process = Definition.getProcess(id, { id: options.id });
  if ('name' in options) process = Definition.getProcess(id, { name: options.name });

  if (!process) throw new Error('Process not found');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(
      ProcessKey,
      { process: { ...process?.$ }, definition: { id } },
      constructor,
    );

    return class extends constructor {
      $_token = new Token();
    };
  };
}
