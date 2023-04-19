/**
 * 1.实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，
 * 以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false，
 * T 和 F 可以是任意类型。
 */
type If<C extends boolean,T,F> = C extends true ? T : F;

/**
 * 2.从类型 `T` 中选择出属性 `K`，构造成一个新的类型
 */
type MyPick<T, K extends keyof T> = {
    [P in K] : T[P]
}

interface Todo2 {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = MyPick<Todo2, 'title' | 'completed'>

const todo2: TodoPreview = {
    title: 'Clean room',
    completed: false,
}


/**
 * 3.该 `Readonly` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。
 */
type MyReadonly<T> = {
    readonly [P in keyof T]:T[P]
}

interface Todo3 {
    title: string
    description: string
}

const todo: MyReadonly<Todo3> = {
    title: "Hey",
    description: "foobar"
}

/**
 *4.传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。
 */
type TupleToObject<T extends readonly any[]> = {
    [K in T[number]]:K
};

const tuple = ['one', 'two', 'three', 'four'] as const;

type result = TupleToObject<typeof tuple>

/**
 *5.取数组第一项。
 */
type First<T extends readonly any[]> = T extends [infer F,...infer R] ? F : never;

type arr1 = ['a', 'b', 'c']

type head1 = First<arr1>

/**
 *6.创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度
 */
type MyLength<T extends readonly any[]> = T["length"];

type nums = ['one', 'two', 'three', 'four']

type numsLength = MyLength<nums> // expected 4

/**
 * 7.假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。
 * 在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
 */
type MyAwaited<T extends Promise<any>> = T extends Promise<infer R>
    ? R extends Promise<any>
        ?  MyAwaited<R>
        :R
    :never

type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string

/**
 * 8.在类型系统里实现 JavaScript 内置的 Array.concat 方法，
 * 这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。
 */
type Concat<T extends readonly any[] ,U extends readonly any[]> = [...T,...U]

type Result1 = Concat<[1], [2]>

/**
 * 9.实现内置的Exclude <T, U>类型，但不能直接使用它本身。
 * 从联合类型T中排除U的类型成员，来构造一个新的类型。
 */
type MyExclude<T, U> = T extends U ? never : T;
type Result2 = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

/**
 * 10.在类型系统里实现 JavaScript 的 Array.includes 方法，
 * 这个类型接受两个参数，返回的类型要么是 true 要么是 false。
 */
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
        ? 1
        : 2
    ? true
    : false;
type MyIncludes<T extends readonly any[], U> = T extends [infer X,...infer Rest]
    ? Equals<X, U> extends true
        ?true
        :MyIncludes<Rest, U>
    :false
type isPillarMen = MyIncludes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>
