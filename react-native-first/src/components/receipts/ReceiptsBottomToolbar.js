/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { theme } from '../common/styles';
import constants, { uuidv4, getFormattedDate } from '../common/constants'

const ReceiptsBottomToolbar = props => {

    useEffect(() => {
    }, []);

    let iter = 0
    return (
        <>
            <View style={{ height: 65, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5 }} >
                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity onPress={() => { iter > 0 ? iter -= 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapleft" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Prev Person</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('RestrictedPerson') }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <Feather name="plus" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Add Restricted</Text>
                            <Text style={{ fontSize: 8 }}>Person</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('ShareTransactions') }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <Entypo name="share" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Share Your</Text>
                            <Text style={{ fontSize: 8 }}>Transactions</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { iter < props.maxScrollCount - 1 ? iter += 1 : {}; props.scroller.scrollTo({ x: constants.windowWidth * iter }) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapright" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Next Person</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsBottomToolbar)