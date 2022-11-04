/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DataObject, Metadata, NodeKey, NodeOption, Option } from './common';
import { Definition, Element, Token } from './core';
import { Flow } from './core/flows';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

const updateToken = <T = any>(
  token: Token,
  element: Element,
  options: {
    value?: T;
    timestamp: number;
  } & NodeOption,
) => {
  const { timestamp, value } = options;

  if (options.start && !token.history.length)
    token.push(element, { timestamp, value, start: true });
  else if (token.history.length) {
    if (!token.chields.length) {
      if (token.state.end) throw new Error('State already ended');

      if ('id' in element && token.state.$.id === element.id)
        throw new Error('This state already taken');
      if ('name' in element && token.state.$.name === element.name)
        throw new Error('This state already taken');

      // TODO: check outgoing of token.state.ref
      token.push(element, { timestamp, value });
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
    const element = process.getNode(node) as Element;
    if (!element) throw new Error('Node element not found');

    const jobQueue = [{ element, value }];
    for (const { element, value } of jobQueue) {
      updateToken(token, element, { timestamp, value });

      const result: DataObject<K> =
        (this as any)[property.propertyName](process, { ...options, value }) ?? {};

      if (result.next) {
        if (!Array.isArray(result.next))
          jobQueue.push({ element: result.next, value: result.value });
        else {
          result.next.forEach((item) =>
            jobQueue.push({ element: item, value: result.value }),
          );
        }
      }
    }

    return options.token;
  }
}
