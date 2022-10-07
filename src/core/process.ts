import { Element } from './base';
import { Token } from './token';
import { Lane } from './lane';

export class Process extends Element {
  static $processes: { [id: string]: Process } = {};

  lanes: Lane[] = [];
  token: Token[] = [];

  constructor(data?: Partial<Process>) {
    super(data);
    Process.$processes[this.$.id] = this;
  }

  static find(id: string): Process {
    return Process.$processes[id];
  }
}
