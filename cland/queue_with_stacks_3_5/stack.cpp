#include "stack.h"
#include <iostream>
#include <string>

using namespace std;

stack::stack()
{
    cur_idx = 0;
}

stack::stack(string name)
{
    my_name = name;
    cur_idx = 0;
}

int stack::push(int value)
{

    cout << my_name << " my cur_idx is " << cur_idx << endl;

    if ( cur_idx >= 10 ) {
        return -1;
    }
    if ( cur_idx < 0 ) {
        cur_idx = 0;
    }

    //cout << "putting in value" << value << endl;

    array[cur_idx] = value;
    cur_idx++;

    return value;
}

int stack::pop(void)
{
    cout << my_name << " my cur_idx is " << cur_idx << endl;

    if ( cur_idx < 0 ) {
        return -1;
    }

    int value = array[cur_idx];
    cur_idx--;

    //cout << "removing value" << value << endl;

    return value;
}
