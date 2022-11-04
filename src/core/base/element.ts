import { BPMNElement } from '../../type';

export class Attribute {
  $!: { id: string; name?: string };

  get id(): string {
    return this.$.id;
  }

  get name(): string | undefined {
    return this.$.name;
  }

  constructor(data?: Partial<Attribute>) {
    if (data) Object.assign(this, data);
  }
}

export class Element extends Attribute {
  constructor(data?: Partial<Element>) {
    super(data);
  }

  static build(el: BPMNElement): Element {
    return new Element(el);
  }
}
