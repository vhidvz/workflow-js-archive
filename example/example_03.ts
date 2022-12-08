/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityNode,
  DataObject,
  DefineProcess,
  EventNode,
  GatewayNode,
  Node,
  Param,
  Token,
  WorkflowJS,
} from '../src';

@DefineProcess({
  name: 'Pizza Customer',
  path: './example/supplying-pizza.bpmn',
})
class PizzaCustomer {
  @Node({ name: 'Hungry for Pizza', start: true, next: 'auto' })
  public hungryForPizza(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }

  @Node({ name: 'Order a Pizza' })
  orderAPizza(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }

  @Node({ id: 'Gateway_0s7y3gr' })
  whereIsMyPizza(
    @Param('node') node: GatewayNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    if (value) return { next: node.$default() };
    else return { next: node.takeOutgoing({ name: '60 Minutes' }) };
  }

  @Node({ name: '60 Minutes' })
  _60minutes(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ name: 'Ask for the pizza' })
  askForThePizza(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ name: 'Pizza Received' })
  pizzaReceived(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ name: 'Pay the Pizza' })
  payThePizza(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }

  @Node({ name: 'Eat the Pizza' })
  eatThePizza(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ name: 'Hunger Satisfied', end: true })
  hungerSatisfied(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }
}

const workflow = new WorkflowJS();

const { token } = workflow.run({
  factory: () => new PizzaCustomer(),
  node: { name: 'Hungry for Pizza' },
  token: new Token(),
  value: 0,
});

console.log(token);

console.log(workflow.run({ node: { name: 'Eat the Pizza' }, token }));
