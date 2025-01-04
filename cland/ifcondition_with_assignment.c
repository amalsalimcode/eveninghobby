#include <stdio.h>
#include <stdint.h>


int return_number(int a);

int main (void ){

    int assign = 21;
    if(assign = (return_number(30) < 100)){
        printf("here is what assign is assigned to %d", assign);
    }

    return 0;
}


int return_number(int a){

    return a;

}
