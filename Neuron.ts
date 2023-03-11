import { Value } from "./Value";

export class Neuron {
  nin: number;
  w: Value[];
  b: Value;
  constructor(nin: number) {
    this.nin = nin;
    this.w = Array.from(
      { length: nin },
      () => new Value(Math.random() * 2 - 1)
    );
    this.b = new Value(Math.random() * 2 - 1);
  }

  call(x: Value[]) {
    let sum = new Value(0)
    const wxs = this.w.map((_, i) => this.w[i].multiply(x[i]));
    // console.log('-------------------------------------------------------------------')
    // wxs.forEach((wx) => console.log('wx pair: ', wx.data))
    // console.log('-------------------------------------------------------------------')

    // console.log('-------------------------------------------------------------------')
    // console.log('sum before adding wx: ', sum.data)
    // console.log('-------------------------------------------------------------------')
    wxs.forEach((wx) => {
        sum = sum.add(wx)
    });
    // console.log('-------------------------------------------------------------------')
    // console.log('sum after adding wx: ', sum.data)
    // console.log('-------------------------------------------------------------------')
    // console.log('-------------------------------------------------------------------')
    // console.log('b before adding wx pairs: ', this.b.data)
    // console.log('-------------------------------------------------------------------')
    const t = this.b.add(sum)
    // console.log('-------------------------------------------------------------------')
    // console.log('b after adding wx pairs: ', t.data)
    // console.log('-------------------------------------------------------------------')
    // console.log('-------------------------------------------------------------------')
    // console.log('t before tanh: ', t.data)
    // console.log('-------------------------------------------------------------------')
    const out = t.tanh();
    // console.log('-------------------------------------------------------------------')
    // console.log('b after tanh(also the output:) ', out.data)
    // console.log('-------------------------------------------------------------------')
    return out;
  }
  params() {
    return [...this.w, this.b];
  }
}
