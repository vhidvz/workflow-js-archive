import { BPMNDefinition, BPMNParticipant, BPMNProcess } from '../type';
import { Metadata, Params } from '../common';
import { find } from 'xml2js-xpath';

export class Definition {
  private static definitions: { [id: string | symbol]: BPMNDefinition } = {};

  constructor() {
    throw new Error('Does not Implemented');
  }

  public static add(id: string | symbol, schema: BPMNDefinition) {
    Definition.definitions[id] = schema;
  }

  public static getProcess(id: string | symbol, params: Params) {
    const definition = Definition.definitions[id];

    if (!definition) throw new Error('Definition not found');

    const findProcessById = (_id: string): BPMNProcess =>
      find(definition, `//bpmn:process[@id='${_id}']`).pop();

    if ('id' in params) return findProcessById(params.id.toString());

    if ('name' in params) {
      const participant: BPMNParticipant = find(
        definition,
        `//bpmn:participant[@name='${params.name}']`,
      ).pop();

      if (!participant) throw new Error('Process not found');

      return findProcessById(participant.$.processRef);
    }
  }

  public static getFlowNode(metadata: Metadata, params: Params) {
    const process = Definition.getProcess(metadata.definition.id, metadata.process);

    if (!process) throw new Error('Process not found');

    return find(process, `//bpmn:*[${params}]`).pop();
  }
}
