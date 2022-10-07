import { Element } from './base';
import { Token } from './token';
import { Lane } from './lane';

export class Process extends Element {
  static #processes: { [name: string]: Process };

  lanes: Lane[] = [];
  token: Token[] = [];

  constructor(data?: Partial<Process>) {
    super(data);
    Process.#processes[data?.$?.name || data?.$?.id || 'Default'] = this;
  }

  static find(name: string): Process {
    return Process.#processes[name];
  }
}
