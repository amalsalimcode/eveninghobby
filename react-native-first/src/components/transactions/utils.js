import { useEffect, useRef } from 'react';

export function isBarEnabled(enabledBars, curBarIdx) {
    /*
     * if all bars is unclicked, then show all data
     * otherwise, show data for only those bars that are clicked
     */

    var all_disabled = true
    for (let idx = 0; idx < enabledBars.length; idx++) {
        if (enabledBars[idx]) {
            all_disabled = false
            break
        }
    }

    // none of the bars are enabled
    if (all_disabled) {
        return true
    }

    if (enabledBars[curBarIdx]) {
        return true
    }

    return false
}

export function isAnyAccountPressed(enabledAccounts) {
    for (account in enabledAccounts) {
        if (enabledAccounts[account]) {
            return true
        }
    }
    return false
}

export function isAccountEnabled(enabledAccounts, accountId) {

    /* check if any accountId is enabled */
    var all_disabled = true
    for (account in enabledAccounts) {
        if (enabledAccounts[account]) {
            all_disabled = false
            break
        }
    }

    /* if atleast no accountId is enabled, then we show data */
    if (all_disabled) {
        return true
    }

    if (!accountId) {
        return all_disabled
    }

    /* accountId has never been clicked, so its enabled */
    var enabled = accountId in enabledAccounts ? enabledAccounts[accountId] : false

    return enabled
}

export function sleep(milliseconds) {
    /* now anywhere in your code, you can say sleep(5000)
       and it will sleep for 5 seconds */
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function getStartOfWeek(arg) {

    var d = arg == undefined ? new Date() : arg
    var day = d.getDay()

    // if current day is Saturday (6), don't subtract
    var days_to_subtract = day == 6 ? 0 : day + 1
    var diff = d.getDate() - days_to_subtract;
    var dt = new Date(d.setDate(diff));

    return dt.toString()
}
