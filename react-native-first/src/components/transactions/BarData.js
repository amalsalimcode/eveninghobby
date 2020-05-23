import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView } from 'react-native'
import SingleBarData from './SingleBarData';

const BarData = props => {

    function isAnyBarEnabled() {
        let idx = 0
        for (idx = 0; idx < props.barData.length; idx++) {
            if (props.enabledBars[idx]) {
                return true
            }
        }
        return false
    }

    function dataLayout() {

        var barIdx = 0;
        var transIdx = 0;
        var barLayout = []

        for (barIdx = 0; barIdx < props.barData.length; barIdx++) {
            // if all bars is unclicked, then show all data 
            // otherwise, show data for only those bars that are clicked
            if (isAnyBarEnabled() && !props.enabledBars[barIdx]) {
                continue
            }

            for (transIdx = 0; transIdx < props.barData[barIdx].transaction_data.length; transIdx++) {

                var institution = props.barData[barIdx].transaction_data[transIdx]["institution"]
                if (!props.isVisible[institution]) {
                    continue
                }

                // make a unique key. In this case: 'barIdx' concat 'transIdx'
                var uniqKey= barIdx.toString().concat(transIdx.toString())
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

const styles = StyleSheet.create({
    plot_container: {
        height: 150
    },
})

function mapStateToProps(state) {
    return {
        barData: state.TransactionsReducer.bar_data,
        isVisible: state.SettingsReducer.institutionVisibility,
        enabledBars: state.BarGraphReducer.barsPressed
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarData)