
#include <stdio.h>
#include <stdlib.h>

#define stringize(A) #A

int main(void){

     enum compass_direction
  {
    north,
    east,
    south,
    west
  };

     typedef struct enum_string {
         int enum_value; 
         char* string_value;
     } enum_string_t;

     enum_string_t string[]  = {
         {north, "north"},
         {east,  "east"}, 
         {west,  "west"}, 
         {south, "south"},
     };

     if(string[0].enum_value == north){
         printf("yaay");
     }




  enum compass_direction my_direction = west;
  int i; 
  for(i=north; i<west; i++){
      printf("value: %s", stringize(my_direction));
  }
    return 0;
}
