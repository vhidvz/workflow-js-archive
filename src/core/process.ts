import { Element } from './base';
import { Token } from './token';

export class Process extends Element {
  token?: { [x: string]: Token };
  elements?: { [x: string]: Element };

  constructor(data?: Partial<Process>) {
    super(data);
  }
}
