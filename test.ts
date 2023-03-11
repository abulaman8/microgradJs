class Value {
    data: number;
    _prev: [Value, Value] | [Value,] | undefined;
    _op: String | undefined;
    label: String | undefined
    grad: number
    _backward: () => void;
    
    constructor(data: number, _children?: [Value, Value] | [Value,] | undefined, _op?: String,label?: String | undefined ) {
        this.data = data;
        this._prev = _children
        this._op = _op
        this.label = label
        this.grad = 0
        this._backward = () => {}
    }

    add(other: Value): Value{
        const out = new Value(this.data + other.data, [this, other], "+")
        const _backward = () => {
            this.grad += out.grad
            other.grad += out.grad
        }
        out._backward = _backward
        return out
    }

    multiply(other: Value): Value{
        const out = new Value(this.data * other.data, [this, other], "*")
        const _backward = () => {
            this.grad += other.data * out.grad
            other.grad += this.data * out.grad

        }
        out._backward = _backward
        return out
    }
    tanh(): Value{
        const x = this.data
        const t = (Math.exp(2*x) - 1)/(Math.exp(2*x) + 1)
        const out = new Value(t, [this,], "tanh")
        const _backward = () => {
            this.grad += (1 - (t**2)) * out.grad
        }
        out._backward = _backward
        return out
    }

    backward(){
        const topo: Value[] = []
        const visited = new Set()
        const build_topo = (v: Value) => {
            if(!visited.has(v)){
                visited.add(v)
                v._prev?.forEach((e) => build_topo(e))
                topo.push(v)
            }
        }

        build_topo(this)

        this.grad = 1
        topo.reverse()
        // console.log(topo)
        // console.log(this.grad)
        topo.forEach((node) => node._backward())


    }


}


const v1 = new Value(1.67)
const v2 = new Value(0.8)
const v3 = v1.add(v2)
const v4 = new Value(0.006)
const v5 = v3.multiply(v4)
const v6 = v5.tanh()
v6.backward()
console.log('v6: ',v6)
console.log('v5: ',v5)
console.log('v4: ',v4)
console.log('v3: ',v3)
console.log('v2: ',v2)
console.log('v1: ',v1)
