
/*
 * Main view has 800x800 size defined.
 * This means that everything below should be a subset of that space.
 * ie: don't define a child view > 800px in this example
 */

<View style={{flexDirection: "column", width: "800px", height: "800px", alignItems: "flex-end", justifyContent: "space-evenly"}}>
    <Text style={{ backgroundColor: "red", width: "80px"}}>1</Text>
    <Text style={{ backgroundColor: "blue"}}>2</Text>
</View>

/*
 * variable definition code
 */
const [count, setCount] = useState(0)
<View>
    <Text>Hello world {count}</Text>
    <Button onPress={(() => setCount(count+1))}/>
</View>

/*
 * Sample component code
 */

import React from 'react';
import { View, StyleSheet } from 'react-native'


const TestClass = props => {

    return (
        <View style={styles.sample}>
        </View>
    )

}

const styles = StyleSheet.create({
    sample: {
        backgroundColor: "rgba(60, 80, 101, 0.5)",
    },
});

export default TestClass

/*
 * Set Timer that runs every second
 */

const [seconds, setSeconds] = useState(0);
const [isPause, setPause] = useState(false);
const [timer, setTimer] = useState(null)

useEffect(() => {
    if (isPause) {
        clearInterval(timer);
    } else {
        const id = setInterval(() => {
            setSeconds(Math.random())
        }, 1000);
        setTimer(id);
    }
    return () => clearInterval(timer);
}, [isPause]);

/*
 * Somewhere in the code you can print seconds,
 * and when a condition matches to stop the timer,
 * call setPause(true)
 */

