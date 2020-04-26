
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
