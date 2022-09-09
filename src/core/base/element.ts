import { Process } from 'core/process';

export class Element {
  id = 'NOT_INITIALIZED';
  name?: string;

  process?: Process;

  static build(): Element {
    return new Element();
  }

  constructor(data?: Partial<Element>) {
    if (data) Object.assign(this, data);
  }
}
