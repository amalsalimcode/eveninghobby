#include <stdio.h>
#include <string.h>


void     ra_inject_set_error(int handle, char *err_seq, int loop, int fromfile, int cmd_index, int loop_count, int strio_transfer_dir);

int stringtoken_to_uint(char *);

int main() {
  char st[] ="4a.01.7:my_inq:0:i:0:234:0";
  char *ch;
  int loop=0, fromfile=0, cmd_index, loop_count, strio_transfer_dir;

  ch = strtok(st, ":");
  char *disk_name;
  if(ch != NULL){
    disk_name = ch;
  } else {
    printf("you passed in a null value for disk name\n");
    return;
  }

  ch = strtok(NULL, ":");

  char *err_seq;
  if(ch != NULL){
    err_seq = ch;
  } else {
    printf("you passed in a null value for error sequence\n");
    return;
  }

  loop=                stringtoken_to_uint(ch);
  fromfile=            stringtoken_to_uint(ch);
  cmd_index=           stringtoken_to_uint(ch);
  loop_count=          stringtoken_to_uint(ch);
  strio_transfer_dir=  stringtoken_to_uint(ch);

  printf("%s \n", disk_name);
  printf("%s \n", err_seq);
  printf("%d \n", loop);
  printf("%d \n", fromfile);
  printf("%d \n", cmd_index);
  printf("%d \n", loop_count);
  printf("%d \n", strio_transfer_dir);

  ra_inject_set_error(0, err_seq, loop, fromfile, cmd_index, loop_count, strio_transfer_dir);
  return 0;

}

int stringtoken_to_uint(char * ch){
 if(ch != NULL){
   ch = strtok(NULL, ":");
   return (int)strtol(ch, (char **)NULL, 10);
 }
}

void ra_inject_set_error(int handle, char *err_seq, int loop, int fromfile, int cmd_index, int loop_count, int strio_transfer_dir){

  printf("handle %d, err_seq %s, loop %d, fromfile %d,cmd_index %d,loop_count %d, strio_transfer_dir %d", 
                                                          handle, err_seq, loop,
                                                          fromfile, cmd_index,
                                                          loop_count, strio_transfer_dir);

  return;
}
