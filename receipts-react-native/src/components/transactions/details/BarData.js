import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import SingleBarData from './SingleBarData';
import { isBarEnabled, isAccountEnabled } from '../utils'
import FadeInView from '../../common/FadeInView';

const BarData = props => {

    console.log("im in bar data")

    function dataLayout() {

        var barIdx = 0;
        var transIdx = 0;
        var barLayout = []

        for (barIdx = 0; barIdx < props.barData.length; barIdx++) {

            if (!isBarEnabled(props.enabledBars, barIdx)) {
                continue
            }

            for (transIdx = 0; transIdx < props.barData[barIdx].transaction_data.length; transIdx++) {

                var accountId = props.barData[barIdx].transaction_data[transIdx]["accountId"]
                if (!isAccountEnabled(props.enabledAccounts, accountId)) {
                    continue
                }

                // make a unique key. In this case: 'barIdx' concat 'transIdx'
                var uniqKey = barIdx.toString().concat(transIdx.toString())
                barLayout.push(<SingleBarData key={uniqKey} uuid={barIdx.toString()} transIdx={transIdx} />)
            }
        }
        return (
            <View style={{ marginTop: 10 }}>
                {barLayout}
            </View>
        )
    }

    if (!props.dataLoaded) {
        return (
            <>
                <View style={{ justifyContent: "center", alignContent: "center" }}>
                    <ActivityIndicator />
                </View>
            </>
        )
    } else {
        return (
            <ScrollView>
                <FadeInView>
                    {dataLayout()}
                </FadeInView>
            </ScrollView>
        )
    }

}

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        enabledBars: state.BarGraphReducer.enabledBars,
        enabledAccounts: state.EnabledAccountsReducer.enabledAccounts,
        dataLoaded: state.AccountsReducer.dataLoaded
    }
}

export default connect(mapStateToProps)(BarData)