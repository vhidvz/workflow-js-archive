import { Element } from './element';

export class Sequence extends Element {
  sourceRef: Element = new Element();
  targetRef: Element = new Element();

  constructor(data?: Partial<Sequence>) {
    super(data);
  }
}
