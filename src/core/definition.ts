import { BPMNDefinition } from '../type';
import { Default } from '../common';
import { Process } from './process';
import { Collaboration } from './collaboration';

export class Definition {
  processes: { [id: string]: Process } = {};
  collaborations: { [id: string]: Collaboration } = {};

  constructor(data?: Partial<Definition>) {
    if (data) Object.assign(this, data);
  }

  private static definitions: { [id: string | symbol]: Definition } = {};

  public static add(schema: BPMNDefinition, id: string | symbol = Default): void {
    const definition = new Definition();

    // add processes
    schema['bpmn:process'].forEach((el) => {
      const process = Process.build(el);

      definition.processes[el.$.id] = process;
      if (el.$.name) definition.processes[el.$.name] = process;
    });

    // add collaborations
    schema['bpmn:collaboration'].forEach((el) => {
      const collaboration = new Collaboration(el);

      definition.collaborations[el.$.id] = collaboration;
      if (el.$.name) definition.collaborations[el.$.name] = collaboration;
    });

    Definition.definitions[id] = definition;
  }

  public static del(id: string | symbol = Default): void {
    delete Definition.definitions[id];
  }

  // public static getProcess(id: string | symbol, params: Params): BPMNProcess | void {
  //   const definition = Definition.definitions[id];

  //   if (!definition) throw new Error('Definition not found');

  //   const findProcessById = (_id: string): BPMNProcess =>
  //     find(definition, `//bpmn:process[@id='${_id}']`).pop();

  //   if ('id' in params) return findProcessById(params.id.toString());

  //   if ('name' in params) {
  //     const participant: BPMNParticipant = find(
  //       definition,
  //       `//bpmn:participant[@name='${params.name}']`,
  //     ).pop();

  //     if (!participant) throw new Error('Process not found');

  //     return findProcessById(participant.$.processRef);
  //   }
  // }

  // public static getFlowNode(metadata: Metadata, params: Params): FlowNode | void {
  //   const process = Definition.getProcess(metadata.definition.id, metadata.process);

  //   if (!process) throw new Error('Process not found');

  //   if ('id' in params)
  //     return JSONPath({
  //       path: `$..[?(@.name==="${params.id.toString()}")]^`,
  //       json: process,
  //     }).pop();

  //   if ('name' in params)
  //     return JSONPath({
  //       path: `$..[?(@.name==="${params.name}")]^^`,
  //       json: process,
  //     }).pop();
  // }
}
