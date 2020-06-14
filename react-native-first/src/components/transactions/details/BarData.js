import React from 'react'
import { connect } from 'react-redux'
import { View, ScrollView } from 'react-native'
import SingleBarData from './SingleBarData';
import { isBarEnabled, isAccountEnabled } from '../utils'

const BarData = props => {

    function dataLayout() {

        var barIdx = 0;
        var transIdx = 0;
        var barLayout = []

        for (barIdx = 0; barIdx < props.barData.length; barIdx++) {

            if (!isBarEnabled(props.enabledBars, barIdx)) {
                continue
            }

            for (transIdx = 0; transIdx < props.barData[barIdx].transaction_data.length; transIdx++) {

                var institution = props.barData[barIdx].transaction_data[transIdx]["institution"]
                var accountId = props.barData[barIdx].transaction_data[transIdx]["accountId"]

                // if the inst is not listed, then by default show it
                var isVisible = institution in props.isVisible ? !props.isVisible[institution] : false
                if (isVisible) {
                    continue
                }

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

    return (
        <ScrollView>
            {dataLayout()}
        </ScrollView>
    )

}

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        isVisible: state.SettingsReducer.institutionVisibility,
        enabledBars: state.BarGraphReducer.enabledBars,
        enabledAccounts: state.AccountsReducer.enabledAccounts
    }
}

export default connect(mapStateToProps)(BarData)