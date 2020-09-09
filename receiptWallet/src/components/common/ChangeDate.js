import { connect } from 'react-redux'
import React, { useState } from 'react';
import { View, Platform, Text } from 'react-native';

import { Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { theme, commonStyles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ChangeDate = props => {
    const [date, setDate] = useState(props.date ? props.date : new Date());

    // we can allow up to two years from now
    var d = new Date();
    var diff = d.getDate() - 365 * 2;
    var minimumDate = new Date(d.setDate(diff));

    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate ? selectedDate : date;
        setDate(currentDate);

        // android has its own close button which we can't handle,
        // so when a date is picked, we just set it
        if (Platform.OS != 'ios') {
            applyDateChange(currentDate)
        }
    };

    const applyDateChange = () => {
        props.setVisible(false)
        props.setDate(date)
    }

    const getDatePicker = () => {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                textColor="black"
                value={date}
                mode='date'
                display="spinner"
                onChange={onChange}
                style={{}}
                overlayStyle={{ backgroundColor: theme.subtlePrimary }}
                maximumDate={new Date().setDate(365)}
                minimumDate={minimumDate}
            />
        )
    }

    if (Platform.OS == 'ios') {
        return (
            <Overlay onBackdropPress={() => { props.setVisible(false) }} overlayStyle={commonStyles.overlayStyle} isVisible={props.visible} height={300}>
                <View style={{ height: 280, justifyContent: "space-evenly" }}>
                    {getDatePicker()}
                    <TouchableOpacity style={commonStyles.button} onPress={applyDateChange}>
                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ color: "white" }}>Set Date</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Overlay >
        );
    } else {
        return (props.visible ? getDatePicker() : <></>)
    }

};


function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setWeek: (newDate) => dispatch({ type: "SET_CUR_WEEK", newDate: newDate })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDate)
