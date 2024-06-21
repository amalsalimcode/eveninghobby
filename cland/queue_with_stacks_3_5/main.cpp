#include <iostream>
#include "queue.h"

using namespace std;

int main(void)
{

    queue q1;

    q1.add(10);
    q1.add(20);

    cout << q1.remove() << endl;
    cout << q1.remove() << endl;
    /*
    cout << q1.remove() << endl;
    cout << q1.remove() << endl;
    cout << q1.remove() << endl;
    */

    return 0;
}

