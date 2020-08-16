import { connect } from 'react-redux'
import React, { useState } from 'react';
import { View, Platform, Text } from 'react-native';

import { Overlay } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';

import { theme, commonStyles } from './styles';
import { ReadCategoryTypes } from './Db';


const SelectCategory = props => {
    const [value, setValue] = useState('')
    const [categories, setCategories] = useState([])

    if (!categories.length) {
        ReadCategoryTypes(setCategories)
    }

    const onChange = (value, index) => {
        setValue(value)
        props.setValue(value)
        props.setVisible(false)
    };

    if (Platform.OS == 'ios') {
        return (
            <Overlay onBackdropPress={() => { props.setVisible(false) }} overlayStyle={commonStyles.overlayStyle} isVisible={props.visible} height={220}>
                <View style={{ height: 220 }}>
                    <Picker selectedValue={value} onValueChange={(val, ind) => { onChange(val, ind) }}>
                        {categories.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}
                    </Picker>
                </View>
            </Overlay >
        );
    } else {
        return (
            <Picker selectedValue={value} onValueChange={(val, ind) => { onChange(val, ind) }}>
                {categories.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={index} />)
                })}
            </Picker>
        )

    }

};


export default SelectCategory 
