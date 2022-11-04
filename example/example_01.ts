/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataObject,
  DefineProcess,
  EventNode,
  Node,
  Param,
  Token,
  WorkflowJS,
} from '../src';

@DefineProcess({
  name: 'Pizza Customer',
  path: './example/supplying-pizza.bpmn',
})
class PizzaCustomer extends WorkflowJS {
  @Node({ name: 'Hungry for Pizza', start: true })
  public hungryForPizza(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }
}

const workflow = new PizzaCustomer();

const token = workflow.run({ node: { name: 'Hungry for Pizza' }, token: new Token() });

console.log(token);
