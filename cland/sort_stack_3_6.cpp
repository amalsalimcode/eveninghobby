#include <iostream>
#include <stack>

using namespace std;

int main ( void ) {

    stack<int> s;
    stack<int> p;

    s.push(19);
    s.push(9);
    s.push(3);
    s.push(5);
    s.push(8);

    while ( !s.empty() ) {
        int tmp = s.top();
        s.pop();
        while ( !p.empty() && p.top() > tmp ) {
            int tmp2 = p.top();
            p.pop();
            s.push(tmp2);
        }
        p.push(tmp);
    }

    while ( !p.empty() ) {
        cout << "the stack val is " << p.top() << endl;
        p.pop();
    }

}
