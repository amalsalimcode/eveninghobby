#include <stdio.h>
#include <string.h>

void givein(char **av){

  if(*(av+2) == NULL){
    printf("im fucked");
  }
  if(**(av+2) == '?'){
    printf("question mark");
  }
  printf("%s", *(av+1));
  return;
}


int main(void){

  char *scsi="scsi";
  char *set="set";
  char *errors="error";

  char *hello[3];
  hello[0]=scsi;
  hello[1]=set;
  hello[2]=errors;


  char *error = "scsiset_error";

  char *sender;
  char *last;

  sender = strtok_r(error, "_");
  //printf("%s", sender);
  return;
}
/*
  char parse[10][5];

  int i = 0;
  int row=0;
  
  
  while(error[i] != ' '){
    (*parse)[i]=error[i];
    i++;
  }
  i++;
  while(error[i] != ' '){
    parse[row][i]=error[i];
    i++;
  }
  //i++;
  while(error[i] != NULL){
    printf("%c",error[i]);
    i++;
  }

  printf("%d", i);

  printf("%s",parse[0]);
}

  //  printf("%s", *(hello+1));

//  givein(hello);
*/
