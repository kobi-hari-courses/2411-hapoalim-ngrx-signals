function itut<T>(value: T) {
    const res =  () => value;

    res.set = (x: T) => { value = x; };

    return res;
}


const i = itut(42);
i();
i.set(43);
i();


export function buildMeAClass(action: () => void) {
    class MyType {
        invokeMethod() {
            console.log('Bla bla bla');
            action();
        }
    }

    return MyType;
}

let Type1 = buildMeAClass(() => console.log('Hello World'));
let Type2 = buildMeAClass(() => console.log('Goodbye World'));

let instance1 = new Type1();
let instance2 = new Type2();

instance1.invokeMethod();
instance2.invokeMethod();

buildMeAClass(() => {});
buildMeAClass.x = 42;
