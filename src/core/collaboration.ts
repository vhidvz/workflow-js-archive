import { BPMNCollaboration, BPMNMessageFlow, BPMNParticipant } from '../type';
import { Attribute } from './base';

export class Collaboration extends Attribute {
  participants!: BPMNParticipant[];
  messageFlows!: BPMNMessageFlow[];

  public getProcessIdByName({ name }: { name: string }): string | undefined {
    const participant = this.participants.find((el) => el.$.name === name);

    return participant?.$.processRef;
  }

  constructor(data?: Partial<Collaboration>) {
    super(data);
  }

  static build(el: BPMNCollaboration) {
    return new Collaboration({
      ...el,
      participants: el['bpmn:participant'],
      messageFlows: el['bpmn:messageFlow'],
    });
  }
}
