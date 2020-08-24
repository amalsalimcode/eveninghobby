import { connect } from 'react-redux'
import React, { useState } from 'react';
import { View, Platform, Picker, Text } from 'react-native';

import { Overlay } from 'react-native-elements';

import { commonStyles } from './styles';
import { ReadCategoryTypes } from './Db';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const SelectCategory = props => {
    const [value, setValue] = useState('Category')
    const [visible, setVisible] = useState(false)
    const [categories, setCategories] = useState([])

    if (!categories.length) {
        ReadCategoryTypes(setCategories)
    }

    const onChange = (value, index) => {
        setValue(value)
        props.setValue(value)
        if (Platform.OS == 'ios') {
            setVisible(false)
        }
    };


    const getColor = (value) => {
        if (value == "Category") {
            return ("rgb(150, 150, 150)")
        }
        else {
            return ("black")
        }
    }

    if (Platform.OS == 'ios') {
        return (
            <View style={{ ...commonStyles.textInput, width: "35%", justifyContent: "center" }}>
                <TouchableWithoutFeedback onPress={() => { setVisible(true) }}>
                    <Text style={{ color: getColor(value) }}>{value}</Text>
                </TouchableWithoutFeedback>
                <Overlay onBackdropPress={() => { setVisible(false) }} overlayStyle={commonStyles.overlayStyle} isVisible={visible} height={220}>
                    <View style={{ height: 220 }}>
                        <Picker selectedValue={value} onValueChange={(val, ind) => { onChange(val, ind) }}>
                            {categories.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index} />)
                            })}
                        </Picker>
                    </View>
                </Overlay >
            </View>
        );
    } else {
        return (
            <View style={{ ...commonStyles.textInput, width: "37%", justifyContent: "center" }}>
                <Picker selectedValue={value} onValueChange={(val, ind) => { onChange(val, ind) }}>
                    {categories.map((item, index) => {
                        return (<Picker.Item label={item} value={item} key={index} />)
                    })}
                </Picker>
            </View>
        )
    }
};


export default SelectCategory 
