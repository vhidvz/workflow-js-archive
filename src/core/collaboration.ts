import { BPMNCollaboration } from '../type';
import { Attribute } from './base';

export class Collaboration extends Attribute {
  public collaboration!: BPMNCollaboration;

  constructor(data?: Partial<Collaboration>) {
    super(data);
  }
}
