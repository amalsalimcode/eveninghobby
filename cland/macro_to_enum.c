
//the input we get, which is a char *, go through 1 to max on the msg_to_string and then if there is a match to the string, then set the enum. 

#include <stdio.h>
#include <stdlib.h>

#define MSGS_MAP(MACRO) \
        MACRO(NULL_MESSAGE) \
        MACRO(DISK_VERIFY)


#define MSG(A) #A




int main(void){

    enum messages {
      #define MSGS_ENUM(A) A , 
        MSGS_MAP(MSGS_ENUM) 
        MESSAGE_ENUM_SIZE
    };



    enum messages amal;
    amal = (enum messages)("MESSA");
    printf("%d", amal);
    printf("%d what", DISK_VERIFY);

    return 0;
}
