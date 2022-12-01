import { Default, DefinitionOption, Option } from '../common';
import { Collaboration } from './collaboration';
import { BPMNDefinition } from '../type';
import { parse, readFile } from 'utils';
import { Process } from './process';

export class Definition {
  processes: { [id: string | symbol]: Process } = {};
  collaborations: { [id: string]: Collaboration } = {};

  constructor(data?: Partial<Definition>) {
    if (data) Object.assign(this, data);
  }

  private static definitions: { [id: string | symbol]: Definition } = {};

  public static get(id: string | symbol = Default): Definition {
    return Definition.definitions[id];
  }

  public static build(options: DefinitionOption) {
    let schema!: BPMNDefinition;

    if ('schema' in options) schema = options.schema;
    if ('xml' in options) schema = parse(options.xml)['bpmn:definitions'];
    if ('path' in options) schema = parse(readFile(options.path))['bpmn:definitions'];

    if (!schema) throw new Error('Schema not found');

    const definition = new Definition();

    // add processes
    schema['bpmn:process'].forEach((el) => {
      const process = Process.build(el);

      definition.processes[el.$.id] = process;
      if (el.$.name) definition.processes[el.$.name] = process;
    });

    // add collaborations
    schema['bpmn:collaboration'].forEach((el) => {
      const collaboration = Collaboration.build(el);

      definition.collaborations[el.$.id] = collaboration;
      if (el.$.name) definition.collaborations[el.$.name] = collaboration;
    });

    return definition;
  }

  public getProcess(option: Option): Process {
    let process!: Process;
    if ('name' in option) {
      const collaboration = Object.values(this.collaborations);

      let processId: string | undefined;
      collaboration.some((el) => (processId = el.getProcessIdByName(option)));

      if (!processId) throw new Error('Process id not found');

      process = this.processes[processId];
    } else if ('id' in option) process = this.processes[option.id];

    if (!process) throw new Error('Process not found');

    return process;
  }

  public static getProcess(option: Option, id: string | symbol = Default): Process {
    const definition = Definition.definitions[id];

    if (!definition) throw new Error('Definition not found');

    let process!: Process;
    if ('name' in option) {
      const collaboration = Object.values(definition.collaborations);

      let processId: string | undefined;
      collaboration.some((el) => (processId = el.getProcessIdByName(option)));

      if (!processId) throw new Error('Process id not found');

      process = definition.processes[processId];
    } else if ('id' in option) process = definition.processes[option.id];

    if (!process) throw new Error('Process not found');

    return process;
  }

  public static add(schema: BPMNDefinition, id: string | symbol = Default): void {
    Definition.definitions[id] = Definition.build({ schema });
  }

  public static del(id: string | symbol = Default): void {
    delete Definition.definitions[id];
  }
}
