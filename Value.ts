export class Value {
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
    neg(): Value {
        const x = this.data * -1
        const out = new Value(x)
        return out
    }

    subtract(other: Value): Value {
        // console.log('other: ', other)
        // const n = other.neg()
        // return this.add(n)
        const out = new Value(this.data - other.data, [this, other], "-")
        const _backward = () => {
            this.grad += out.grad
            other.grad += out.grad
        }
        out._backward = _backward
        return out
    }

    pow(other: number):Value {
        const out = new Value(this.data**other, [this,], `**${other}`)
        const _backward = () => {
            this.grad += (other * (this.data ** (other-1))) * out.grad
        }
        out._backward = _backward
        return out
    }

    exp(): Value{
        // const x = this.data
        const out = new Value(Math.exp(this.data), [this,], "exp")
        const _backward = () => {
            this.grad += out.data * out.grad
        }
        out._backward = _backward
        return out
    }

    divide(other: Value): Value{
        const out = this.multiply(other.pow(-1))
        return out
    }

    backward(){
        const topo: Value[] = []
        const visited = new Set()
        const build_topo = (v: Value) => {
            if(!visited.has(v)){
                visited.add(v)
                v._prev?.forEach((e) => {build_topo(e)})
                topo.push(v)
                
            }
        }

        build_topo(this)

        this.grad = 1
        topo.reverse()
        topo.forEach((node) => node._backward())
        // topo.forEach((node) => console.log('node: ',node))
        // console.log('topo length: ', topo.length)


    }


}