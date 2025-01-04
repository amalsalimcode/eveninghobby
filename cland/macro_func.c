
//the input we get, which is a char *, go through 1 to max on the msg_to_string and then if there is a match to the string, then set the enum. 

#include <stdio.h>
#include <stdlib.h>

typedef struct sk_Msg {
  int a;
}sk_Msg_t;


#ifdef DEBUG
#define DESP(x) \
        int ab=10; \
        printf("we are printing the value of x"); \
        what nonsense \
        printdig(x.a*ab); \
        return 0; 
#else
#define DESP(x) NULL
#endif
void printdig(int digit);

int main(void){

    sk_Msg_t amal;
    amal.a=10;

    DESP(amal);

    return 0;
}

void printdig(int digit){

  printf("%d", digit);

}
