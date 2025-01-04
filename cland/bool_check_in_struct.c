
#include <stdio.h>
#include <stdlib.h>

typedef struct injmsg{
  union {
    int *command_block;
    struct {
      int *client_msg;
      int *ra_handle;
    } client_info;
  } u;
  unsigned injection_done:1;
} injmsg_t;

int main(void){

  injmsg_t hello;
  hello.injection_done = 0;

  if(hello.injection_done){
      printf("you have done injection");
  }

  if(!hello.injection_done){
    printf("you have not done injection");
  }


  return 0;
}
