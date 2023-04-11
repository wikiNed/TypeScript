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
 * 泛型
 */
function identity<T>(value: T) : T {
    return value
}

console.log(identity<Number>(1))
