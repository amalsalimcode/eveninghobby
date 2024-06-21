#include "stack_provider.h"
#include <iostream>

using namespace std;

int main(void)
{

    /* stack is implemented with max allowed elements of 3
     * Anything more, -1 is returned.
     * stack_provider masks that by having a list of stacks */

    stack s1; 
    cout << s1.push(10) << endl;
    cout << s1.push(20) << endl;
    cout << s1.push(30) << endl;
    cout << s1.push(50) << endl;

    cout << s1.pop() << endl;
    cout << s1.pop() << endl;
    cout << s1.pop() << endl;
    cout << s1.pop() << endl;

    stack_provider s2;
    s2.push(39);
    s2.push(49);
    s2.push(59);
    s2.push(69);
    s2.push(79);

    cout << s2.pop() << endl;
    cout << s2.pop() << endl;
    cout << s2.pop() << endl;
    cout << s2.pop() << endl;
    cout << s2.pop() << endl;

    cout << "hello" << endl;

    return 0;
}
