import { MLP } from "./MLP";
import { Value } from "./Value";
// const x1 = [new Value(2.0), new Value(3.0), new Value(-1.0)]
// const x2 = [new Value(3.0), new Value(-1.0), new Value(0.5)]
// const x3 = [new Value(0.5), new Value(1.0), new Value(1.0)]
const xs = [
  [new Value(2.0), new Value(3.0), new Value(-1.0)],
  [new Value(3.0), new Value(-1.0), new Value(0.5)],
  [new Value(0.5), new Value(1.0), new Value(1.0)],
  [new Value(1.0), new Value(1.0), new Value(-1.0)],
];

const ys = [new Value(1.0), new Value(-1.0), new Value(-1.0), new Value(1.0)];

const n = new MLP(3, [4, 4, 1]);

//const r = n.call(x)

let i = 0;

while (i < 5) {
  const ypred: Value[] = [];
  xs.forEach((x) => {
    const f = n.call(x);

    ypred.push(f[0]);
  });

  let loss = new Value(0);

  const loss_list: Value[] = ys.map((_, i) => ypred[i].subtract(ys[i]).pow(2));
  console.log("loss_list length: ", loss_list.length);

  loss_list.forEach((l) => {
    loss = loss.add(l);
  });

  n.params().forEach((p) => (p.grad = 0));
  // console.log(loss)
  n.params()
    .slice(0, 10)
    .forEach((p) => console.log("p before grad: ", p.data, p.grad));
  loss.backward();
  n.params()
    .slice(0, 10)
    .forEach((p) => console.log("params: ", p.data, p.grad));

  const lr = 0.05;
  n.params().forEach((p) => {
    p.data -= p.grad * lr;
  });

  n.params()
    .slice(0, 10)
    .forEach((p) => console.log("p after backprop: ", p.data, p.grad));
  console.log(
    "-------------------------------------------------------------------"
  );
  console.log("ys: ", ys[0].data, ys[1].data, ys[2].data, ys[3].data);
  console.log(
    "ypred: ",
    ypred[0].data,
    ypred[1].data,
    ypred[2].data,
    ypred[3].data
  );
  console.log(i, loss.data);
  console.log(
    "-------------------------------------------------------------------"
  );

  i++;
}
