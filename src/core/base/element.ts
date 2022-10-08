import { BPMNElement } from '../../type';

export class Property {
  $!: { id: string; name?: string };

  constructor(data?: Partial<Property>) {
    if (data) Object.assign(this, data);
  }
}

export class Element extends Property {
  static $elements: { [id: string]: Element } = {};

  constructor(data?: Partial<Element>) {
    super(data);
    Element.$elements[this.$.id] = this;
  }

  static find(id: string): Element {
    return Element.$elements[id];
  }

  static build(el: BPMNElement): Element {
    return Element.$elements[el.$.id] ?? new Element(el);
  }
}
