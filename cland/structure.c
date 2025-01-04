#include <stdio.h>
#include <stdlib.h>
#define max 20



typedef struct leg {
   int toe_count;
   char *name;
}leg_t;

typedef struct animal{
    char* name;
    leg_t *leg;
} animal_t;

int main (void){


 leg_t *hello;
 hello = (leg_t *)malloc(sizeof (leg_t));
 
 hello->name = "toes";

 animal_t elephant;
 elephant.name = "olaola";
 elephant.leg = hello;

 printf("%s", elephant.leg.name);
 
 
 return 0;

}
