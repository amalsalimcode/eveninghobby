#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/*
 * check to see if characters are repeating
 * If yes, then delete them from the string
 */
int main (void) {

  char str[12] = "hello world";

  /*
   * create an array, to check if
   * this character was visited 
   */
  bool val_visit[256];
  int idx = 0;
  for ( idx = 0; idx < 256; idx++ ) {
    val_visit[idx] = 0;
  }

  /*
   * traverse the array with two pointers
   * insertion ptr, and traverse ptr
   */
  char *tr_ptr = str;
  char *ins_ptr = str;

  while ( *tr_ptr ) {

    bool is_val_exist = val_visit[(int)*tr_ptr];

    /*
     * check if the val exists, through val_visit[]
     * if no val, then set the val_visit, set ins_ptr val to tr_ptr,
     * then increment ins_ptr
     */
    if ( !is_val_exist ) {
      val_visit[(int)*tr_ptr] = 1;
      *ins_ptr = *tr_ptr;
      ins_ptr++;
    }

    tr_ptr++;
  }

  /*
   * if tr_ptr reaches NULL,
   * set ins_ptr to NULL
   */
  *(ins_ptr) = '\0';

   printf("%s", str);
   return 0;

}
