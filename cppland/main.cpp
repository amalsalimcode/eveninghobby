#include <iostream>

using namespace std;

#define ALLOC_SZ 128

void multiply(string num1, string num2, int depth, string sum);
void sum_two_num(string first_num, string second_num, int start_pos, string& sum);

int main(void)
{
    string num1  = "3141592653589793238462643383279502884197169399375105820974944592";
    string num2  = "2718281828459045235360287471352662497757247093699959574966967627";
    string carry (ALLOC_SZ, '0');
    string prod (ALLOC_SZ, '0');

    multiply(num1, num2, 0, prod);

    return 0;
}

int
char_to_int(char val) {
    return (int)val - '0';
}

void
multiply(string num1, string num2, int depth, string prod) {


    string carry (ALLOC_SZ, '0');

    /* cout << "\nnum size " << num2.size() << " depth " << depth << 
       " prod " << prod << " carry " << carry << endl; */

    /* num2 is the bottom number in the table,
     * when written by hand */
    if ( depth >= num2.size() ) {
        printf("End of multiply: prod is %s\n", prod.c_str());
        return;
    }

    /* for each digit of num2, we have to multiply with
     * each digit of num */
    int idx_2 = num2.size() - 1 - depth;

    /* carry always begins not at the last digit,
     * but the one before */
    int idx_carry = carry.size() - 2 - depth;
    
    string new_prod (ALLOC_SZ, '0');
    int idx_prod = new_prod.size() - 1 - depth;

    for (int idx_1 = num1.size()-1; idx_1 >= 0; idx_1--) {

        int first_num  = char_to_int(num1[idx_1]);
        int second_num = char_to_int(num2[idx_2]);

        //cout << "first_num " << first_num << " second_num " << second_num << endl;

        int prod_compute   = first_num * second_num;
        //cout << "after multiplication " << prod_compute << endl;

        new_prod[idx_prod] = (prod_compute % 10) + '0';
        carry[idx_carry]  = (prod_compute / 10) + '0';

        //printf("new_prod %s, carry %s\n", new_prod.c_str(), carry.c_str());

        idx_prod--;
        idx_carry--;

    }

    /* first compute prod + carry */
    string sum (ALLOC_SZ, '0');
    sum_two_num(new_prod, carry, carry.size(), sum);
    //printf("After sum %s \n", sum.c_str());
    
    /* then output from that with prod from previous iters */
    string new_sum (ALLOC_SZ, '0');
    sum_two_num(sum, prod, sum.size(), new_sum);
    //printf("After sum again %s\n", new_sum.c_str());

    multiply(num1, num2, depth+1, new_sum);
}

void
sum_two_num(string first_num_str, string second_num_str, int start_pos, string& sum) {

    int idx = 0;

    string carry (ALLOC_SZ, '0');

    //printf("sum_two_num: first_num: %s, second_num %s\n\n", first_num_str.c_str(), second_num_str.c_str());
    int result = 0;
    for ( idx = ALLOC_SZ-1; idx >= 0; idx-- ) {

        int first_num  = char_to_int(first_num_str[idx]);
        int second_num = char_to_int(second_num_str[idx]);
        int carry_num  = char_to_int(carry[idx]);

        int carry_num_prev = char_to_int(carry[idx-1]);

        result = first_num + second_num + carry_num;

        sum[idx]     = result % 10 + '0';
        carry[idx-1]   = (carry_num_prev + result / 10) + '0';

    }

    /* get the last carry */
    sum[0] = (result / 10) + '0';
    //printf("sum_two_num: After addition: sum: %s, carry %s\n\n", sum.c_str(), carry.c_str());
}
