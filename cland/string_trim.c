#include <stdio.h>
#include "string.h"

char *ltrim(char *const s)
{
  size_t len;
  char *cur;

  if(s && *s) {
    len = strlen(s);
    cur = s;

    while(*cur && isspace(*cur))
      ++cur, --len;

    if(s != cur)
      memmove(s, cur, len + 1);

  }

  return s;
}

/* Remove trailing whitespaces */
char *rtrim(char *const s)
{
  size_t len;
  char *cur;

  if(s && *s) {
    len = strlen(s);
    cur = s + len - 1;

    while(cur != s && isspace(*cur))
      --cur, --len;

    cur[isspace(*cur) ? 0 : 1] = '\0';
  }

  return s;
}

/* Remove leading and trailing whitespaces */
char *trim(char *const s)
{
  rtrim(s);  // order matters
  ltrim(s);

  return s;
}

int main(void){

  char amal[] = "    hello world   ";
  printf("%s", trim(amal));

}


