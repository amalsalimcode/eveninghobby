import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Overlay } from 'react-native-elements';
import { theme, commonStyles } from '../../common/styles';
import SingleDataTemplate from '../details/SingleDataTemplate';
import { getStartOfWeek } from '../utils';
import { connect } from 'react-redux'


const ChangeDate = props => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true);

    // we can allow up to two years from now
    var d = new Date();
    var diff = d.getDate() - 365 * 2;
    var minimumDate = new Date(d.setDate(diff));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);

        // android has its own close button which we can't handle,
        // so when a date is picked, we just set it
        if (Platform.OS != 'ios') {
            applyDateChange()
        }
    };

    const applyDateChange = () => {
        var newDt = getStartOfWeek(date)
        props.setVisible(false)
        props.setWeek(newDt)
    }

    const getDatePicker = () => {
        return (
            <DateTimePicker
                testID="dateTimePicker"
                textColor="red"
                value={date}
                mode='date'
                display="spinner"
                onChange={onChange}
                style={{}}
                overlayStyle={{ backgroundColor: theme.subtlePrimary }}
                maximumDate={new Date()}
                minimumDate={minimumDate}
            />
        )
    }

    if (Platform.OS == 'ios') {
        return (
            <Overlay onBackdropPress={() => { props.setVisible(false) }} overlayStyle={commonStyles.overlayStyle} isVisible={props.visible} height={300}>
                <View style={{ height: 280, justifyContent: "space-evenly" }}>
                    {getDatePicker()}
                    <SingleDataTemplate onClick={() => { applyDateChange() }}
                        containerStyle={{
                            alignItems: "center",
                            backgroundColor: theme.primary,
                            borderRadius: 40
                        }} enableExpand={false}>
                        <Text style={{ color: "white" }}>Set Date</Text>
                    </SingleDataTemplate>
                </View>
            </Overlay>
        );
    } else {
        return(props.visible ? getDatePicker() : <></>)
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
