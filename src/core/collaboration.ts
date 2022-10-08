import { Property } from './base';

export class Collaboration extends Property {
  static $collaborations: { [id: string]: Collaboration } = {};

  constructor(data?: Partial<Collaboration>) {
    super(data);
    Collaboration.$collaborations[this.$.id] = this;
    if (this.$.name) Collaboration.$collaborations[this.$.name] = this;
  }

  static find(id: string): Collaboration {
    return Collaboration.$collaborations[id];
  }
}
