import { BPMNDefinition } from 'type';
import { Property } from './base';

export class Definition extends Property {
  static $definitions: { [name: string]: Definition } = {};

  constructor(name: string, data?: Partial<Definition>) {
    super(data);
    Definition.$definitions[name] = this;
  }

  static add(name: string, el: BPMNDefinition) {
    Definition.$definitions[name] ?? new Definition(name, el);
  }
}
