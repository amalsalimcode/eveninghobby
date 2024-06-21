#include <list>
#include "stack.h"

using namespace std;

class stack_provider {
    int x;
    stack cur_stack;
    std::list<stack> mylist;

    public:
    stack_provider();
    int pop(int stack_no=0);
    void push(int val);
};

