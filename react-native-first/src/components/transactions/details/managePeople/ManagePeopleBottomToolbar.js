/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../../common/styles';

const ManagePeopleBottomToolbar = props => {

    useEffect(() => {
    }, []);

    {/* <View style={{ flexDirection: "row", borderWidth: 2 }}>
                <Button title="prev" onPress={() => { iter > 0 ? iter -= 1 : {}; scroller.scrollTo({ x: constants.windowWidth * iter }) }} />
                <Button title="next" onPress={() => { iter < accountsView.length - 1 ? iter += 1 : {}; scroller.scrollTo({ x: constants.windowWidth * iter }) }} />
            </View> */}

    let iter = 0
    console.log("this is the scroller", props.scroller)
    return (
        <>
            <View style={{ height: 60, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5 }} >
                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity onPress={() => { iter > 0 ? iter -= 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapleft" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Previous Week</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <Feather name="dollar-sign" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Transactions</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('Search') }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="search1" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Search</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <MaterialCommunityIcons name="bank-outline" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Bank Accounts</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { iter < props.maxScrollCount - 1 ? iter += 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapright" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Next Week</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ height: 10, backgroundColor: theme.subtlePrimary }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePeopleBottomToolbar)