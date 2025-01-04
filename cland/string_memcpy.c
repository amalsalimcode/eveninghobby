#include <stdio.h>
#include <string.h>

int main(){

  char *name = "amal salim";
  char name2[10];

  bzero(name2, sizeof(name2));
  if ( name2[0] == '\0' ) {
	  memcpy(name2, name, 4);
  }

  printf("%s\n", name2);

  name = "asdf";
  if ( name2[0] == '\0' ) {
	  memcpy(name2, name, 4);
  }

  printf("%s\n", name2);

}
