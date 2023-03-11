import { Layer } from "./Layer";
import { Value } from "./Value";

export class MLP {
  layers: Layer[];

  constructor(nin: number, nouts: number[]) {
    const sz = [nin, ...nouts];
    this.layers = [];
    for (let i = 0; i < nouts.length; i++) {
      this.layers.push(new Layer(sz[i], sz[i + 1]));
    }
  }
  call(x: Value[]) {
    this.layers.forEach((layer) => {
        // console.log('-------------------------------------------------------------------')
        // x.forEach((i) => console.log('data going into layer: ',i.data))
        // console.log('-------------------------------------------------------------------')
      x = layer.call(x);
      // console.log('-------------------------------------------------------------------')
      //   x.forEach((i) => console.log('data coming out of layer: ',i.data))
      //   console.log('-------------------------------------------------------------------')
    });

    // console.log('-------------------------------------------------------------------')
    // x.forEach((i) => console.log('data returned at the end of calling: ',i.data))
    // console.log('-------------------------------------------------------------------')
    return x;
  }

  params() {
    const out: Value[] = [];
    this.layers.forEach((layer) => {
      const p = layer.params();
      out.push(...p);
    });
    return out;
  }
}
