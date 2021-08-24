/**
 * 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
 */
interface Person{
    readonly id:number;
    name:string;
    age?:number;
    //规定了能定义的全部属性
    [propName: string]: string | number;
}

let tom1:Person ={
    id:15165,
    name:'tom',
    age:15
}

/**
 * 函数重载 让函数匹配更加精准
 */
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void{
    if(typeof x === "number"){
        return Number(x.toString().split('').reverse().join(''));
    }else if(typeof x === "string"){
        return x.split('').reverse().join('');
    }
}

reverse(156651);

/**
 * 类型断言 
 * 【欺骗】TS编译器，无法避免运行错误
 * 接口用as类型断言
 * 类用instance
 */
 interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom2: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom2);

/**
 * 断言 不等同于赋值
 * animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
 * animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
 */
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom3 = animal as Cat;
// let tom3 :Cat= animal;

/**
 * npm模块ts
 * 只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
 */