import { Property } from './base';

export class Process extends Property {
  static $processes: { [id: string]: Process } = {};

  constructor(data?: Partial<Process>) {
    super(data);
    Process.$processes[this.$.id] = this;
    if (this.$.name) Process.$processes[this.$.name] = this;
  }

  static find(id: string): Process {
    return Process.$processes[id];
  }
}
