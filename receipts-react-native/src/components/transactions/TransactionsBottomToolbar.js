/*
 * All transactions to be displayed are setup and retrieved here
 */

'use strict'

import { connect } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native'
import { toggleAccountTransaction } from './details/BarDetails';
import { theme } from '../common/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TransactionsBottomToolbar = props => {


    useEffect(() => {
    }, []);

    return (
        <>
            <View style={{ height: 60, paddingLeft: 10, backgroundColor: theme.subtlePrimary, borderTopWidth: 0.5 }} >
                <View style={{ height: 10 }} />

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

                    <TouchableOpacity onPress={() => { props.changeCurWeek(-1) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapleft" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Previous Week</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { toggleAccountTransaction(() => { }, "left") }} style={{ width: 60 }}>
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

                    <TouchableOpacity onPress={() => { toggleAccountTransaction(() => { }, "right") }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <MaterialCommunityIcons name="bank-outline" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Bank Accounts</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.changeCurWeek(1) }} style={{ width: 60 }}>
                        <View style={{ alignItems: "center" }}>
                            <AntDesign name="swapright" size={24} color="black" />
                            <Text style={{ fontSize: 8 }}>Next Week</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ height: 100, backgroundColor: theme.subtlePrimary }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsBottomToolbar)