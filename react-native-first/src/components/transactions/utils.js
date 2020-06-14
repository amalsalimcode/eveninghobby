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

export function isAccountEnabled(enabledAccounts, accountId) {

    // console.log("checking for accountId", accountId)

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

    /* accountId has never been clicked, so its enabled */
    var enabled = accountId in enabledAccounts ? enabledAccounts[accountId] : false

    return enabled
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
