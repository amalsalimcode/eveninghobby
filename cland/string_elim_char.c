#include <stdio.h>



void remove_all_chars(char* str, char c) {
  char *pr = str, *pw = str;
  while (*pr != 'z') {
    *pw = *pr++;
    pw += (*pw != c);
  }
  //*pw = '\0';
}

int main() {
  char *str = "llHello, world!llz";
  remove_all_chars(str, 'l');
  printf("%s", str);
  return 0;
}
