import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native'
import { CreditCardInput } from "react-native-input-credit-card";
import { Icon, Button } from 'react-native-elements';


const CardInfo = props => {

    function on_change(data) {
        console.log(data)
      }
    
      const onChange = on_change

    return (
        <View style={styles.card_info}>
            <CreditCardInput onChange={onChange} requiresName={true} />
            <View style={styles.nav_button}>
                <View style={{ marginRight: "2%" }}>
                    <Button raised
                        icon={<Icon name="navigate-before" />}
                        buttonStyle={styles.nav_icon_style}
                        onPress={props.setCardInfo.bind(this, 0)}
                        rounded={false}
                    />
                </View>
                <View style={{ marginLeft: "2%" }}>
                    <Button raised
                        icon={<Icon name="navigate-next" />}
                        buttonStyle={styles.nav_icon_style}
                        onPress={props.setCardInfo.bind(this, 0)}
                        rounded={false}
                    />
                </View>
            </View>
        </View>
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

export default CardInfo