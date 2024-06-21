#include "stack.h"

stack::stack(void)
{
    cur_idx = 0;
}

int stack::push(int value)
{

    if ( cur_idx >= 3 ) {
        return -1;
    }

    array[cur_idx++] = value;

    return value;
}

int stack::pop(void)
{
    if ( cur_idx < 0 ) {
        return -1;
    }

    return array[--cur_idx];
}
