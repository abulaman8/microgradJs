import { Neuron } from "./Neuron";
import { Value } from "./Value";
export class Layer {
  neurons: Neuron[];

  constructor(nin: number, nout: number) {
    this.neurons = Array.from({ length: nout }, () => new Neuron(nin));
  }

  call(x: Value[]) {
    const outs: Value[] = [];
    this.neurons.forEach((neuron) => {
        // console.log('-------------------------------------------------------------------')
        // x.forEach((i) => console.log('data going into neuron: ',i.data))
        // console.log('-------------------------------------------------------------------')
      const nc = neuron.call(x);
       // console.log('-------------------------------------------------------------------')
       // console.log('data coming out of neuron: ',nc.data)
       //  console.log('-------------------------------------------------------------------')
      outs.push(nc);
    });
    // console.log('-------------------------------------------------------------------')
    // outs.forEach((out) => console.log('data returned from neurons: ', out.data))
    // console.log('-------------------------------------------------------------------')

    return outs;
  }

  params() {
    const out: Value[] = [];
    this.neurons.forEach((neuron) => {
      const p = neuron.params();
      out.push(...p);
    });
    return out;
  }
}

