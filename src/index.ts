/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { DataObject, Metadata, NodeKey, NodeOption, Option } from './common';
import { Definition, Element, Token } from './core';

export * from './core';
export * from './type';
export * from './utils';
export * from './common';

type UpdateTokenOption<T = any> = Option & {
  value?: T;
  timestamp: number;
} & NodeOption;

const updateToken = <T = any>(
  token: Token,
  element: Element,
  options: UpdateTokenOption<T>,
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
  target!: any;

  public run<K = any>(
    options: {
      handler?: any;
      factory?: () => any;
      node: Option;
      token: Token<T, K>;
      value?: K;
    },
    timestamp = Date.now(),
  ) {
    const { handler, factory } = options;

    if (!this.target)
      this.target =
        '$__metadata__' in this ? this : (factory ?? (() => undefined))() ?? handler;

    if (!this.target) throw new Error('target workflow not found');

    const properties = Reflect.getMetadata(NodeKey, this.target, '$__metadata__');

    const metadata = (this.target as any).$__metadata__ as Metadata;
    const process = Definition.getProcess(metadata.process, metadata.definition.id);

    const { node, token, value } = options;
    const element = process.getNode(node) as Element;
    if (!element) throw new Error('Node element not found');

    const jobQueue = [{ element, value }];
    for (const { element, value } of jobQueue) {
      let property!: { options: Option & NodeOption; propertyName: string };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if ('name' in element.$) property = properties[element.$.name!];
      if (!property && 'id' in element.$) property = properties[element.$.id];

      if (!property) throw new Error('Requested method not found');

      updateToken<K>(token, element, { timestamp, value, ...property.options });

      const args = { token, node: element.$, value };
      const result: DataObject<K> =
        (this.target as any)[property.propertyName](process, args) ?? {};

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

    return token;
  }

  static execute<T = any, K = any>(
    options: {
      handler?: any;
      factory?: () => any;
      node: Option;
      token: Token<T, K>;
      value?: K;
    },
    timestamp = Date.now(),
  ) {
    const { handler, factory } = options;

    const target =
      '$__metadata__' in this ? this : (factory ?? (() => undefined))() ?? handler;

    if (!target) throw new Error('target workflow not found');

    const properties = Reflect.getMetadata(NodeKey, target, '$__metadata__');

    const metadata = (target as any).$__metadata__ as Metadata;
    const process = Definition.getProcess(metadata.process, metadata.definition.id);

    const { node, token, value } = options;
    const element = process.getNode(node) as Element;
    if (!element) throw new Error('Node element not found');

    const jobQueue = [{ element, value }];
    for (const { element, value } of jobQueue) {
      let property!: { options: Option & NodeOption; propertyName: string };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if ('name' in element.$) property = properties[element.$.name!];
      if (!property && 'id' in element.$) property = properties[element.$.id];

      if (!property) throw new Error('Requested method not found');

      updateToken<K>(token, element, { timestamp, value, ...property.options });

      const args = { token, node: element.$, value };
      const result: DataObject<K> =
        (target as any)[property.propertyName](process, args) ?? {};

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

    return token;
  }
}
