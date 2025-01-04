#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>


void multiply(char *str1, int str1_len, char *str2, int str2_len, char *result, int res_len);
void conver_num_to_str(char *num1_str, int num1_len, int num1);
char *get_product_char_int(char *num1_str, int num1_str_len, int num2, char *result_str, int result_len);
int digit_count(int num);
char *int_to_char(int num1, int *num_sz);
char *factorial(int number);

/*
 * Alloc for saving result of num1 x num2
 * number of digits in result of num1 x num2
 * product of two nums is at most
 * num1_digits + num2_digits
 */


int main (void)
{

	char *result_str = factorial(10);

	return 0;
}

/* given a number, return the factorial of it, in char array */
/* Design:
 * convert number into char array,
 * use API to multiply char array with number - 1.
 * Set returned array, to be the input for the API,
 * in the next iteration
 */
char *factorial(int number) {

	int number_diff = number -1;
	int number_str_len = 0;

	char *result_str;
	char *number_str = int_to_char(number, &number_str_len);
	int  result_len;
	for ( number = number - 1; number > 1; number -- ) {

		//the size of the product of two numbers
		//is at most the sum of the digits of those two.
		//eg 100     * 24      = 2400 which is less than
		//   3digits + 2digits = 5digits
		result_len  = digit_count(number) + number_str_len;
		result_str  = malloc(sizeof(char) * result_len);

		get_product_char_int(number_str, number_str_len, number, result_str, result_len);
		free(number_str);


		//the result now needs to be multiplied with number - 1,
		//hence update number_str with result
		number_str     = result_str;
		number_str_len = result_len;
	}

	int idx = 0;

	while (result_str[idx] == '0' ) {
		idx++;
	}

	for ( ; idx < strlen(result_str); idx++ ) {
		printf("%c", result_str[idx]);
	}

	printf("\n");


	return result_str;
}

/*
 * given a number, return it
 * in a char array, and set
 * num1_sz to be size of array
 */
char *
int_to_char(int num1, int *num1_sz)
{
	int idx	      = 0;

	//get number of digits
	*num1_sz  = digit_count(num1);


	//malloc a string, size of digits
	char *num1_str = malloc( sizeof(char) * (*num1_sz) );

	//convert them to str
	conver_num_to_str(num1_str, *num1_sz - 1, num1);

	return num1_str;
}

/*
 * Description	: find product of two numbers
 *
 * Input	: char *num1_str
 *		  number, in the form of char array
 *
 *		  int num1_str_len
 *		  length of num1_str
 *
 *		  int num2
 *		  second number
 *
 *		  result_str
 *		  the char array, where the product
 *		  of num1_str and num2 will be saved
 *
 *		  result_str_len
 *		  the length of the result char array
 */
char *
get_product_char_int(char *num1_str, int num1_str_len, int num2, char *result_str, int result_str_len)
{
	int   idx	= 0;
	int   num2_len  = 0;
	char *num2_str  = NULL;

	//zero out the result array
	for (idx = 0; idx<result_str_len; idx++) {
		result_str[idx] = '0';
	}

	/* num2 needs to be converted to string */
	num2_len   = digit_count(num2);
	num2_str   = malloc(sizeof(char) * num2_len);
	conver_num_to_str(num2_str, num2_len-1, num2);

	(void)multiply(num1_str, num1_str_len-1, num2_str, num2_len-1, result_str, result_str_len-1);

	free(num2_str);
	return result_str;
}

/* given a number(num1) and an empty char array(num1_str), num1 is saved into num1_str */
void
conver_num_to_str( char *num1_str, int num1_len, int num1 )
{
	int idx = 0;

	for ( idx = num1_len; idx >= 0; idx-- ) {
		num1_str[idx] = num1%10 + '0';
		num1 = num1/10;
	}

	return;
}

/* count the number of digits in a given number */
int
digit_count(int num)
{
	int count = 0;

	while ( num ) {
		num = num/10;
		count++;
	}

	return count;

}

/* Does the following:
 * result = str1 x str2
 *
 * For this, each digit of str2 needs to be multiplied
 * with each digit of str1.
 *
 * Similar to multiplication by hand, we have to iterate
 * the array backwards
 *
 * Once the product is found, we put the result into result
 * char at the given index (done via sum_into_char_array())
 */
void multiply(char *str1, int str1_len, char *str2, int str2_len, char *result, int res_len){


	//get last value of str1 and str2
	int a;
	int b;
	int idx = 0;
	int res_idx = res_len, res_shift = res_len;
	int idx1 = 0, idx2 = 0;
	int prod = 0;

	for ( idx2 = str2_len; idx2 >= 0; idx2-- ) {

		a = str2[idx2] - '0';

		for ( idx1 = str1_len; idx1 >= 0; idx1-- ) {

			b = str1[idx1] - '0';

			//this should be the product of every digit of str2 with str1
			prod = a*b;

			//split the product into result array
			sum_into_char_array(result, res_idx, prod);

			res_idx--;

		}

		res_shift--;
		res_idx = res_shift;
	}

	return;
}

/*
 * num2 will be added to num1_arr at index num1_idx
 *
 * we have to think of the case where
 *	num2 + num_arr[num1_idx] >= 10
 *
 * In this case after we add, we will have a
 * carry over. This carry over will need to
 * be propogated across the array
 */
int sum_into_char_array(char *num1_arr, int num1_idx, int num2) {

	int num1 = 0;
	int carry_over = 0, add_value = 0;

	/* adding num2 into num1 by every digit */
	while ( num2 || carry_over ) {

		/* convert num1 into int */
		num1	   =  num1_arr[num1_idx] - '0';
		num1	   =  num1 + ( num2 % 10 ) + carry_over;

		add_value  =  (num1/1)  % 10;
		carry_over =  (num1/10) % 100;


		num1_arr[num1_idx] = add_value + '0';

		num2 = num2/10;
		num1_idx--;

	}
}
