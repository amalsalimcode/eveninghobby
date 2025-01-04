#include <stdio.h>
#include <string.h>
#include <stdlib.h>


  void
scsi_trim_quotes_set_error(char * st, char *disk_name)
{
  int counter=0;
  int space_count=0;
  char **formatted_string;
  char *temp;
  int a = 0;
  if(!st){
    return;
  }

  for(; *st; st++){
    if(*st == ' '){
      space_count++;
    }
    a++;
  }
  st=st-a;

  formatted_string = malloc(a);
  temp=strtok(st, " ");

  while(temp){
    formatted_string[counter] = malloc(strlen(temp+1));
    strcpy(formatted_string[counter], temp);
    counter++;
    temp=strtok(NULL, " ");
  }

  printf("%d\n", counter);
  printf("%d\n", space_count);
  if(strcmp(formatted_string[space_count], disk_name)){
    printf("disk name not found");
    return;
  }
  counter=0;
  for(counter=0; counter<=space_count; counter++){
    free(formatted_string[counter]);
  }
  free(formatted_string);

}


int main() {

  char **ch;
  char *what;
  char *disk_name = "4a.01.7";
  char st[] ="hello disk 4a.01.7";


  scsi_trim_quotes_set_error(st, disk_name);

  return;

/*
  int i=0;
  char *temp = strtok(st, " ");
  ch = malloc(sizeof(strlen(temp)));
  ch[0] = malloc(sizeof(strlen(temp)));
  strcpy(ch[0], temp);
  printf("%s", ch[0]);


  while(ch[i] != NULL){
    i++;
    ch[i] = strtok(NULL, " ");
  }
 
  printf("%s", ch[0]);
  printf("%s", ch[i-1]);
  
  return;
  */

}


