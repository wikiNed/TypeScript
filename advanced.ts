/**
 * 类型别名
 */
type event = 'click' | 'dbclick';
function handleEvent(ele:Element,event:event){

}

// handleEvent(document.getElementById('wk'),'click');
// handleEvent(document.getElementById('wk'),'scroll');

/**
 * 元组
 * 只能推入定义的类型
 */
 let tom: [string, number];
 tom = ['Tom', 25];
 tom.push('male');
//  tom.push(true);
console.log(tom);

/**
 * 枚举
 * 未手动赋值的枚举项会接着上一个枚举项递增
 */
 enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

 console.log(Days["Sun"] === 7); // true
 console.log(Days["Mon"] === 1); // true
 console.log(Days["Tue"] === 2); // true
 console.log(Days["Sat"] === 6); // true

 /**
  * 静态属性、方法
  */
  class Animal2{
    //实例属性
    name = 'jack';
    //静态方法
    static isAnimal(a){
        return a instanceof Animal1;
    }
    //静态属性
    static num =42;
}
let a = new Animal2();
Animal2.isAnimal(a);
//  a.isAnimal(a);
console.log(a.name);
console.log(Animal2.num);

 /**
  * 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
  * 对象（Object）：类的实例，通过 new 生成
  * 面向对象（OOP）的三大特性：封装、继承、多态
  * 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
  * 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
  * 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
  * 存取器（getter & setter）：用以改变属性的读取和赋值行为
  * 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
  * 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
  * 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
  */
 class Animal1{
     constructor(name:string){
         this.name = name;
     }
     sayHi() {
        return `My name is ${this.name}`;
    }
    get name(){
        return this.name
    }
    set name(value){
        this.name =value
    }
 }

 class Cat1 extends Animal1{
     constructor(name:string){
         super(name);
     }
     sayHi(){
         return 'Meow' + super.sayHi();
     }
 }


/**
 * private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
 * protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
 */
class Animal3{
    //无法访问，继承与实例化
    private name;
    public constructor(name){
        this.name = name;
    }
}
class Cat3 extends Animal3{
    constructor(name){
        super(name);
        console.log(this.name);
    }
}
let a11 = new Animal3('jack');
console.log(a11.name);
a11.name = 'tom';
 
class Animal4{
    //子类可访问，可继承无法实例化
    protected name;
    public constructor(name){
        this.name = name;
    }
}
class Cat4 extends Animal4{
    constructor(name){
        super(name);
        console.log(this.name);
    }
}
let a12 = new Animal3('jack');
console.log(a12.name);
a12.name = 'tom';

/**
 * 抽象类
 * 无法实例化，抽象方法必被子类实现
 */
abstract class Animal5 {
    public name;
    constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat5 extends Animal5 {
    sayHi(){
        console.log(111);
    }
}
let a5 = new Animal5('jack');

/**
 * 类实现接口
 */
interface Alarm{
    alert():void;
}

interface LightOn{
    lightOn():void;
}
// 接口继承接口
interface Light extends LightOn{
    lightOff():void
}
//类继承接口,同时产生一个实例的类型
class Car1 implements Alarm,Light {
    alert(){
    }
    lightOn(){
    }
    lightOff(){
    }
}
//即
interface Car1Inter{
    alert():void;
    lightOn():void;
    lightOff():void;
}
//接口继承类
interface Car2 extends Car1{
    alertOff():void
}

/**
 * 泛型
 */
function createArray<T>(length:number,value:T):Array<T>{
    let result : T[] = [];
    for (let index = 0; index < length; index++) {
        result[index] = value;
    }
    return result;
}