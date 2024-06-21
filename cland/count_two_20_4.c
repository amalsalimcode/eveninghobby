#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int get_total(int num, int dig_iter, int dig_iter2, int two_count);

int main (void) {

    int two_count = get_total(30, 0, 1, 0);
    printf("the numer of twos are %d\n", two_count);
    return 0;
}


/*
 * num: the original num. During recursive calls,
 *      num decreases digit count. eg: 1234 -> 123 -> 12 -> 1
 *
 * dig_iter: the number of two's without including the 20-29, or 200-299
 *
 * dig_iter2: the number of twos for 20-29, 200-299
 *
 * if num is single digit, then dig_iter == 1,   and dig_iter2 == 0
 * if num is double digit, then dig_iter == 10,  and dig_iter2 == 1
 * if num is triple digit, then dig_iter == 100, and dig_iter2 == 10
 *
 * we also only account for dig_iter2, if num is greater than 2.
 * Eg: num == 18, it doesnt make sense to include dig_iter2 based on its
 *     definition.
 */
int
get_total(int num, int dig_iter, int dig_iter2, int two_count) {

    if (num == 0) {
        return two_count;
    }

    /* get the last digit */
    int dec = num % 10;
    num = num/10;

    two_count = two_count + (dig_iter * dec);
    if ( dec >= 2 ) {
        two_count += dig_iter2;
    }
    
    printf("num: %d, dig_iter: %d, two_count: %d\n", num, dig_iter, two_count);

    /* first iteration */
    if ( dig_iter == 0 ) {
        return get_total(num, 1, 10, two_count);
    }

    return get_total(num, dig_iter*10, dig_iter2*10, two_count);

}
