'use strict'

import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import constants, { getFormattedDateAbbrev, getColor, checkPrependZero, getSQLformattedDate } from './common/constants'

import { commonStyles, theme } from './common/styles'
import GradientBackground from './common/GradientBackground';
import TopToolbar from './TopToolbar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChangeDate from './common/ChangeDate';
import LabelModal from './LabelModal';
import { buildSearchQuery } from './common/Db';


const SearchBar = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
    }, []);

    return (
        <View style={{ ...commonStyles.inputView, flexDirection: "row", paddingLeft: 15, borderColor: "red", borderWidth: 0.2, marginTop: 50 }} >
            <View style={{ marginRight: 10, marginTop: 12 }}>
                <AntDesign name="search1" size={24} color="black" />
            </View>
            <TextInput style={{ ...commonStyles.inputText, flex: 1 }} placeholder="Search" placeholderTextColor={theme.placeholderText} onChangeText={(e) => { setValue(e); props.setSearchVal(e) }}
                value={value} autoCorrect={false} autoCapitalize='none' autoFocus={false} onBlur={() => { console.log(value) }} />
        </View>
    )
}

const Search = props => {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [exactDate, setExactDate] = useState(null);
    const [curDatePick, setCurDatePick] = useState(null)
    const [searchVal, setSearchVal] = useState(null)

    const [modalVisible, setModalVisible] = useState(false);
    const [labelValue, setLabelValue] = useState('Label')
    const [selectedLabel, setSelectedLabel] = useState([])

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [categoryValue, setCategoryValue] = useState('Category')
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
    }, [])

    const donePressed = (labelsSetTrue) => {
        setModalVisible(!modalVisible)
        setSelectedLabel(labelsSetTrue)
        console.log("chosen labels", labelsSetTrue)
        if (labelsSetTrue.length == 1) {
            setLabelValue(labelsSetTrue.length + " Label Chosen")
        } else {
            setLabelValue(labelsSetTrue.length + " Labels Chosen")
        }
    }

    const donePressedCategory = (categorySetTrue) => {
        setModalCategoryVisible(false)
        setSelectedCategory(categorySetTrue)
        if (categorySetTrue.length == 1) {
            setCategoryValue(categorySetTrue.length + " Category Chosen")
        } else {
            setCategoryValue(categorySetTrue.length + " Categories Chosen")
        }
    }


    const executeSearch = () => {
        // console.log("here is search val", searchVal, "label val", selectedLabel, "start date", startDate, "end date", endDate, "categories", selectedCategory, "exact date", exactDate)

        // if no fields are pressed, then the button should give a pop up saying something needs to be filled
        if (!searchVal && !selectedLabel.length && !selectedCategory.length && !startDate && !endDate && !exactDate) {
            console.log("no search val entered")
            return
        }

        let query = buildSearchQuery(searchVal, selectedLabel, selectedCategory, startDate, endDate, exactDate)
        props.navigation.navigate("SearchResults", { query: query })
    }

    const formatSetDate = (arg) => {

        let formattedDate = arg

        if (curDatePick == "start") {
            setStartDate(formattedDate)
            if (exactDate != null) {
                setExactDate(null)
            }
        } else if (curDatePick == "end") {
            if (startDate != null && formattedDate < startDate) {
                setStartDate(null)
            }
            if (exactDate != null) {
                setExactDate(null)
            }
            setEndDate(formattedDate)
        } else if (curDatePick == "exact") {
            if (startDate != null) {
                setStartDate(null)
            }
            if (endDate != null) {
                setEndDate(null)
            }
            setExactDate(formattedDate)
        }
    }

    return (
        <>
            < GradientBackground colors={[theme.subleSecondary, theme.subtlePrimary]} >
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <TopToolbar {...props} goBack={props.navigation.goBack} />
                    <SearchBar setSearchVal={setSearchVal} />

                    <View style={{ height: "10%" }} />
                    <View style={{ borderBottomColor: "grey", borderBottomWidth: 1, width: 90, alignItems: "center" }}>
                        <Text style={{ fontSize: 15, fontWeight: "200" }}>FILTERS</Text>
                    </View>
                    <View style={{ height: 20 }} />

                    <TouchableOpacity style={{ ...styles.square, borderWidth: 0.7 }} onPress={() => { setModalCategoryVisible(true) }} >
                        <Text style={{ color: getColor(categoryValue, "Category") }}>{categoryValue}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.square, borderWidth: 0.7 }} onPress={() => { setModalVisible(true) }} >
                        <Text style={{ color: getColor(labelValue, "Label") }}>{labelValue}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ ...styles.square, borderWidth: 0.7, width: 100, marginHorizontal: 8 }} onPress={() => { setCurDatePick("start"); setShowDatePicker(true) }}>
                            <Text style={{ color: getColor(startDate, null) }}>{startDate == null ? "Start Date" : getFormattedDateAbbrev(startDate)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ ...styles.square, borderWidth: 0.7, width: 100, marginHorizontal: 8 }} onPress={() => { setCurDatePick("end"); setShowDatePicker(true) }} >
                            <Text style={{ color: getColor(endDate, null) }}>{endDate == null ? "End Date" : getFormattedDateAbbrev(endDate)}</Text>
                        </TouchableOpacity>
                        <View style={{ ...styles.square, width: 1, borderWidth: 0.7 }} />
                        <TouchableOpacity style={{ ...styles.square, borderWidth: 0.7, width: 100, marginHorizontal: 8 }} onPress={() => { setCurDatePick("exact"); setShowDatePicker(true) }} >
                            <Text style={{ color: getColor(exactDate, null) }}>{exactDate == null ? "Exact Date" : getFormattedDateAbbrev(exactDate)}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 0.2 * constants.windowHeight }} />
                    <View style={{ ...commonStyles.button, width: "50%", borderWidth: 1, borderColor: "grey" }}>
                        <TouchableOpacity style={{ width: 0.3 * constants.windowWidth }} onPress={executeSearch}>
                            <Text style={commonStyles.buttonText}>Find</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ GradientBackground>
            <ChangeDate visible={showDatePicker} setVisible={setShowDatePicker} setDate={formatSetDate} />
            <LabelModal type={"label"} donePressed={donePressed} selectedTrueLabel={selectedLabel} modalVisible={modalVisible} />
            <LabelModal type={"category"} donePressed={donePressedCategory} selectedTrueLabel={selectedCategory} modalVisible={modalCategoryVisible} />
        </>
    )

}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeCurWeek: (direction) => dispatch({ type: "ADD_SUB_CUR_WEEK", direction: direction })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


const styles = StyleSheet.create({
    square: {
        alignSelf: "center",
        borderColor: "#3e424b",
        width: constants.windowWidth * 0.8,
        height: 30,
        marginBottom: 8,
        justifyContent: "center",
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10
    },
});