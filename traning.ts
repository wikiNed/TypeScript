type PersonType={
    name:string,
    age:number
}

interface PersonInterface{
    name:string,
    age:number
}

type GreetType = (name:string)=>string;

interface GreetInterface{
    (name:string):string
}

type StatusType = 'active' | 'inactive'

interface StatusInterface{
    status:'active' | 'inactive'
}

//type定义元组类型
type pos = [number, number];
const pos1:pos = [1,1];

/**
 * type 可以使用 typeof 关键字获取某个值的类型
 * 现有变量，再作类型规定
 */
const person1 = {
    name:'123',
    age:18
};

type PersonType1 = typeof  person1;
const person2:PersonType1 = {
    name:'23',
    age:18
}

/**
 * keyof 索引类型查询操作符 获取索引类型的属性名，构成联合类型。
 */
type PersonKey= keyof PersonInterface // "name" | "age"

/**
 * 泛型示例
 */

/**
 * 1.示例
 */
function identity<T>(value: T) : T {
    return value
}
console.log(identity<Number>(1))

//会自动去寻找类型
function identity1<T,U>(value: T,msg: U): T {
    return value
}
console.log(identity1(1, 'number'))

/**
 * 2 泛型接口
 */
interface Identities<V, M>{
    value:V,
    msg:M
}
function identity2<T, U>(value:T, msg:U):Identities<T, U>{
    let identities:Identities<T, U> = {
        value,
        msg
    };
    return identities
}

/**
 * 3 泛型类
 */
interface Getter<U>{
    value: U
    getValue:()=> U
}

class PersonClass<T> implements Getter<T>{
    value:T

    constructor(value:T) {
        this.value = value
    }

    getValue():T{
        return this.value
    }
}

/**
 * 4.泛型约束
 * 类型变量对应的类型上存在某些属性
 */
interface Length{
    length: number
}

function identity4<T extends Length>(arg:T):T{
    console.log(arg.length);
    return arg
}

/**
 * keyof 安全获取value
 */
function getProperty<T,K extends keyof T>(obj:T, key: K):T[K]{
    return obj[key]
}

/**
 * 5.泛型约束
 * 类型变量对应的类型上存在某些属性
 */
interface A<T=string> {
    name: T;
}

const strA: A = { name: "Semlinker" };
const numB: A<number> = { name: 101 };

/**
 * 6.泛型条件类型
 */
interface Dictionary<T= any>{
    [key:string]:T
}

type StrDict = Dictionary<string>

type DictMember<T> = T extends Dictionary<infer V> ? V : never

type StrDictMember = DictMember<StrDict>//string

/**
 * 7.泛型工具类型
 */
//7.1 Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?
type Partial1<T> = {
    [P in keyof T]?:T[P]
}

//7.2 Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。
type Record1<K extends keyof any, T> = {
    [P in K] : T
}

//7.3 Pick<T, K extends keyof T> 的作用是将某个类型中的子属性挑出来，变成包含这个类型部分属性的子类型。
type Pick1<T, K extends keyof T> = {
    [P in K] : T[P]
}

//7.4 Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉。
type Exclude1<T, U> = T extends U ? never : T

//7.5 ReturnType<T> 的作用是用于获取函数 T 的返回类型。
type ReturnType1<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * 使用泛型创建对象
 */
//8.1 构造函数类型应用
interface Point{
    x:number;
    y:number
}

interface PointCon{
    new(x:number, y:number):Point //构造签名
}

class Point2D implements Point{
    readonly x:number;
    readonly y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

function newPoint(pointCon:PointCon, x:number, y:number):Point{
    return new pointCon(x,y)
}

//8.2 使用泛型创建对象
class FirstClass{
    id:number | undefined
}

class SecClass{
    name:number | undefined
}

class GenericCreator<T>{
    //new (x: number, y: number) => Point 等价于{ new (x: number, y: number): Point; }
    create<T>(c:{ new (): T}): T{
        return new c()
    }
}

const creator1 = new GenericCreator<FirstClass>();
const firstClass : FirstClass = creator1.create(FirstClass);
