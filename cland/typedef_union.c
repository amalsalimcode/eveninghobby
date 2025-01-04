#include <stdio.h>
#include <stdint.h>

typedef struct injerrortype{

      int *command_block;
    union {
      int *command_block;
      struct {
          int client_msg;
          int ra_handle;
          int value;
      } client_info;
    } u;

} injerrortype_t;


int main (void ){

  int b = 10;
  injerrortype_t *amal;
  (*amal).command_block=&b;


  int c=*(amal->command_block);

 printf("here is decimal %d", *(amal->command_block));

    return 0;
}
