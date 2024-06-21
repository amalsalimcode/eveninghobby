#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int main (void) {

  char str[5] = "abcde";
  int str_len = strlen(str);

  int idx = 0;

  //because str begins at idx 0, and ends at strlen(str) - 1
  int rev_idx = str_len-1; 

  //swap with first char and last
  for ( idx = 0; idx < (str_len)/2; idx++ ) {
    char tmp = str[idx];
    str[idx] = str[rev_idx];
    str[rev_idx] = tmp;
    rev_idx--;
  }

  printf("%s\n", str);

}
