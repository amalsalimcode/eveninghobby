#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define STR_LEN 15
#define BUF_LEN 25 

void process_digits(int dig, char *str, char *buf);

/* zero evaluates to printing nothing, hence skip arr_index for 0 */
char ones_arr[10][STR_LEN] = { "none", "one", "two", "three",
                               "four", "five", "six",
                               "seven", "eight", "nine" };

char tens_arr[10][STR_LEN] = { "ten", "eleven", "twelve",
                               "thirteen", "fourteen", "fifteen",
                               "sixteen", "seventeen", "eighteen",
                               "nineteen" };

/* we only access this arr, if num is >= 20,
   hence skip arr_index for '0' and '1' */
char tens_2_arr[11][STR_LEN] = { "none", "none", "twenty",
                                 "thirty", "forty", "fifty",
                                 "sixty", "seventy", "eighty",
                                 "ninety", "hundred" };


int main (void) {

    int num = 999999;

    /* memory to store parsed string values */
    char buf1[BUF_LEN], buf2[BUF_LEN], buf3[BUF_LEN], buf4[BUF_LEN];
    /* zero out the strings */
    memset(buf1,0,strlen(buf1));
    memset(buf2,0,strlen(buf2));
    memset(buf3,0,strlen(buf3));
    memset(buf4,0,strlen(buf4));

    /* get last two digits */
    int dig = num % 100;
    /* get rid of last two digits */
    num = num / 100;
    process_digits(dig, "", buf4);

    /* get last digit */
    dig = num % 10;
    /* get rid of last digit */
    num = num/10;
    process_digits(dig, "hundred", buf3);

    /* get last two digits */
    dig = num % 100;
    /* get rid of last two digits */
    num = num / 100;
    process_digits(dig, "thousand", buf2);

    /* get last digit */
    dig = num % 10;
    /* get rid of last digit */
    num = num/10;
    process_digits(dig, "hundred", buf1);

    printf("output: %s %s %s %s\n", buf1, buf2, buf3, buf4);

    return 0;
}

void
process_digits(int dig, char *append, char *buf) {


    if ( dig <= 0 ) {
        return;
    }

    /* less than 10 goes to one array */
    if ( dig > 0 && dig < 10 ) {
        snprintf(buf, BUF_LEN, "%s %s", ones_arr[dig], append);
    }

    /* 9 to 20 has another array */
    else if ( dig > 9 && dig < 20 ) {
        snprintf(buf, BUF_LEN, "%s %s", tens_arr[dig - 10], append);
    }

    else if ( dig >= 20 ) {
        /* separate the digits */
        int ones_dig = dig % 10;
        dig = dig / 10; 
        int tens_dig = dig % 10;
        snprintf(buf, BUF_LEN, "%s %s %s", tens_2_arr[tens_dig],
                                  ones_arr[ones_dig], append); 
    }

    return;
}
