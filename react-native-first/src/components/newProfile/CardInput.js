import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { CreditCardInput } from "react-native-input-credit-card";
import { Icon, Button } from 'react-native-elements';


const CardInput = props => {

    const [isValid, setIsValid] = useState(false);

    function on_change(data) {
        if (data["valid"]) {
            // data input is now complete
            console.log(data)
            setIsValid(true)
        }
    }

    function go_next() {
        if (isValid) {
            props.setCardInput(2)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.card_info}>
                <CreditCardInput onChange={on_change} requiresName={true} />
                <View style={styles.nav_button}>
                    <View style={{ marginRight: "2%" }}>
                        <Button raised
                            icon={<Icon name="navigate-before" />}
                            buttonStyle={styles.nav_icon_style}
                            onPress={props.setCardInput.bind(this, 0)}
                            rounded={false}
                        />
                    </View>
                    <View style={{ marginLeft: "2%" }}>
                        <Button raised
                            icon={<Icon name="navigate-next" />}
                            buttonStyle={styles.nav_icon_style}
                            onPress={go_next}
                            rounded={false}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

const styles = StyleSheet.create({
    card_info: {
        backgroundColor: "rgba(60, 80, 101, 0.5)",
        flex: 1,
        paddingTop: "40%",
    },
    nav_button: {
        alignItems: "center",
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "center"
    },
    nav_icon_style: {
        backgroundColor: "rgba(120, 160, 201, 0.5)",
        borderRadius: 10, height: 40, width: 40, borderRadius: 80
    }
})

export default CardInput