#include "binary.h"

void pre_str_to_int(char *str, int *pre_dec_point, int *post_dec_point);
float decimal_to_fraction(int *post_dec_point);
int fraction_to_binary(float *post_dec_point_float, char *buffer);

int main (void) {

    
    char *str = "13.5";
    int pre_dec_point = 0;
    int post_dec_point = 0;

    /* convert string to int */
    pre_str_to_int(str, &pre_dec_point, &post_dec_point);

    /* convert post decimal (int) to fraction (float). eg: 452 -> 0.452 */
    float post_dec_point_float = decimal_to_fraction(&post_dec_point);

    /* convert post decimal (float) to binary (str) */
    char buffer[10];
    int err = fraction_to_binary(&post_dec_point_float, buffer);

    /* check error and print result */
    if (err) {
        printf("ERROR");
    } else {
        PRINT_B(pre_dec_point);
        printf(".");
        printf("%s", buffer);
    }

    return 0;
}

void
pre_str_to_int(char *str, int *pre_dec_point, int *post_dec_point)
{

    char buffer[10];
    memset (buffer,'\0',10);
    int idx = 0;

    /*
     * Converts pre_string to num
     * 13.576:
     *  pre_str = 13
     */
    /* capture str before period */
    for ( idx = 0; idx < strlen(str); idx++ ) {
        if ( str[idx] == '.' ) {
            break;
        }
        buffer[idx] = str[idx];
    }
    *pre_dec_point = atoi(buffer);

    /*
     * Converts post_dec_point to num
     * 13.576
     *  pre_dec_point = 576
     */
    idx++; //skip the period
    int buf_idx = 0; //idx for buffer
    memset (buffer,'\0',10);
    /* capture str after period */
    for ( ; idx <strlen(str); idx++, buf_idx++ ) {
        buffer[buf_idx] = str[idx];
    }

    *post_dec_point = atoi(buffer);
}

float
decimal_to_fraction(int *post_dec_point)
{

    /*
     * count number of decimals
     */
    int tmp_pdp = *post_dec_point;
    int dec_cnt = 0;

    while ( tmp_pdp ) {
        dec_cnt++;
        tmp_pdp = tmp_pdp/10;
    }

    /*
     * we want 0.1 ^ (number of decimals)
     */
    float dec_factor = 1;
    while ( dec_cnt ) {
        dec_cnt--;
        dec_factor = 0.1 * dec_factor;
    }

    return dec_factor * (*post_dec_point);

}

int
fraction_to_binary(float *post_dec_point_float, char *buffer)
{
    memset (buffer,'\0',10);
    int tmp_idx = 0;

    for ( tmp_idx = 0; tmp_idx < 10; tmp_idx++ ) {
        /* multiply itself by 2, will tell us whether to put '1' or '0' */
        *post_dec_point_float = *post_dec_point_float * 2;
        if ( *post_dec_point_float >= 1 ) {
            buffer[tmp_idx] = '1';
            *post_dec_point_float = *post_dec_point_float - 1;
        } else {
            buffer[tmp_idx] = '0';
        }

        /* condition to check if post_dec_point_float == 0.0000 */
        if ( *post_dec_point_float * 10 == *post_dec_point_float ) {
            break;
        }
    }

    /* error if fraction is not clean */
    if ( tmp_idx > 9 ) {
        return 1;
    }

    return 0;
}
