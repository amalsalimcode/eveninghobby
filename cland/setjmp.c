
#include <setjmp.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  jmp_buf env;
  int i;

  (void)setjmp(env);

  int bad_value = -2;

  printf("i = %d\n", i);

  if (bad_value < 0) {
	  bad_value = 0;
	  longjmp(env, 0);
	  exit(0);
  }

  printf("Does this line get printed?\n");

}
