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
  name: 'Pizza Vendor',
  path: './example/supplying-pizza.bpmn',
})
class PizzaCustomer extends WorkflowJS {
  @Node({ name: 'Order Received', start: true })
  public orderReceived(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ id: 'Gateway_1o79jph' })
  gateway1o79jph(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ): DataObject {
    console.log(node);
    console.log(token);
    console.log(value);
    return { next: node.takeOutgoing() };
  }

  @Node({ name: 'Calm Customer' })
  calmCustomer(
    @Param('node') node: ActivityNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }

  @Node({ name: 'Bake the Pizza' })
  bakeThePizza(
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

  @Node({ name: 'Deliver the Pizza' })
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

  @Node({ name: 'Receive Payment', next: 'auto' })
  pizzaReceived(
    @Param('node') node: EventNode,
    @Param('token') token: Token,
    @Param('value') value: any,
  ) {
    console.log(node);
    console.log(token);
    console.log(value);
  }
}

const workflow = new PizzaCustomer();

const token = workflow.run({
  node: { name: 'Order Received' },
  token: new Token(),
  value: 0,
});

console.log(token);
