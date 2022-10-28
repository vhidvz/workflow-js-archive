import { Collaboration } from './collaboration';
import { Default, Option } from '../common';
import { BPMNDefinition } from '../type';
import { Process } from './process';

export class Definition {
  processes: { [id: string | symbol]: Process } = {};
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

  public static getProcess(option: Option, id: string | symbol = Default): Process {
    const definition = Definition.definitions[id];

    if (!definition) throw new Error('Definition not found');

    let process!: Process;
    if ('name' in option) process = definition.processes[option.name];
    else if ('id' in option) process = definition.processes[option.id];

    if (!process) throw new Error('Process not found');

    return process;
  }
}
