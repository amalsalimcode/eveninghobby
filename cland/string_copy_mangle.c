#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* removes all chars from string */
char *scsi_string_format(char *string)
{
  char *newstr = malloc(strlen(string) + 1);
  int counter = 0;

   for ( ; *string; string++) {
    if (*string != '\'') {
      newstr[ counter ] = *string;
      ++ counter;
    }
   }

  newstr[counter] = 0;
  return newstr;
}

int main(void)
{
  char *new = scsi_string_format("'scsi set_error -f -e my_inq 4a.01.7'");
  printf("%s\n", new);
  free(new);

  return 0;
}
