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
