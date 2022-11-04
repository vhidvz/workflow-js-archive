/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Metadata, NodeKey, NodeOption, Option } from './common';
import { Definition, Token } from './core';
import { Flow } from './core/flows';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

const updateToken = <T = any>(
  token: Token,
  element: Flow,
  options: {
    value?: T;
    node: Option;
    timestamp: number;
  } & NodeOption,
) => {
  const { node, value, timestamp } = options;

  if (options.start && !token.history.length)
    token.push(element, { value, timestamp, start: true });
  else if (token.history.length) {
    if (!token.chields.length) {
      if (token.state.end) throw new Error('State already ended');

      if ('id' in node && token.state.$.id === node.id)
        throw new Error('This state already taken');
      if ('name' in node && token.state.$.name === node.name)
        throw new Error('This state already taken');

      // TODO: check outgoing of token.state.ref
      token.push(element, { value, timestamp });
    }
  }
};

export class WorkflowJS<T = any> {
  $__metadata__!: Metadata;

  public run<K = any>(
    options: { node: Option; token: Token<T, K>; value?: K },
    timestamp = Date.now(),
  ) {
    const properties = Reflect.getMetadata(NodeKey, this, '$__metadata__');

    let property!: { options: Option & NodeOption; propertyName: string };
    if ('name' in options.node) property = properties[options.node.name];
    else if ('id' in options.node) property = properties[options.node.id];

    if (!property) throw new Error('Requested method not found');

    const metadata = (this as any).$__metadata__ as Metadata;
    const process = Definition.getProcess(metadata.process, metadata.definition.id);

    const { node, token, value } = options;

    const element = process.getNode(node) as Flow;
    if (!element) throw new Error('Node element not found');

    updateToken(token, element, { node, value, timestamp });

    let val = value;
    do {
      const state = token.state;

      val = (this as any)[property.propertyName](process, { ...options, value: val });

      if (state.$?.id && token.state.$.id === state.$.id) break;
      if (state.$?.name && token.state.$.name === state.$.name) break;

      const element = process.getNode(token.state.$) as Flow;
      updateToken(token, element, { node, timestamp, value: val });
      // eslint-disable-next-line no-constant-condition
    } while (true);

    return options.token;
  }
}
