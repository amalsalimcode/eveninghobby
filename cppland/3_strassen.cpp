#include <iostream>
#include <vector>

using namespace std;

// input two matrices, and return the product of them
vector< vector<int> > divide_conquer_matrix(vector < vector<int> > vect_a, vector < vector<int> > vect_b, int size);

// provide a matrix, with boundaries. It will create a copy of it with 0's padded to the next two's power
vector <vector<int>> get_quarter_matrix(vector <vector<int>> vect, int half_size, int start_row_idx, int end_row_idx, int start_col_idx, int end_col_idx);
int get_closest_twos_factor(int size);

vector <vector<int>> add_matrices(vector <vector<int>> a, vector <vector<int>> b, int size);
void save_quarter_matrix(vector < vector<int> > vect, int start_row_idx, int end_row_idx, int start_col_idx, int end_col_idx, vector < vector<int> > &vect_res);
void print_matrix(vector < vector<int> > res_vect);
void print_matrix_entry(vector <vector<int>> a, int i, int j);

int main(void)
{
    vector< vector<int> > vect{{1,  2,  3,  10, 11, 12},
                               {4,  5,  6,  13, 14, 15},
                               {7,  8,  9,  16, 17, 18},
                               {19, 20, 21, 22, 23, 24},
                               {25, 26, 27, 28, 29, 30},
                               {31, 32, 33, 34, 35, 36}};

    vector< vector<int> > res_vect = divide_conquer_matrix(vect, vect, vect.size());

    print_matrix(res_vect);
    print_matrix_entry(res_vect, 0, 0);

    /*
    cout << "size of vector " << vect.size() << endl;

    vector<int> second {1, 2, 3, 4}; 
    vector<int> vectagn{1, 2, 3, 10, 11, 12};
    vector< vector<int> > vect2D(3, vector<int>(3, 1));

    cout << "for 10 " << get_closest_twos_factor(10) << endl;
    cout << "for 8 " << get_closest_twos_factor(8) << endl;
    cout << "for 4 " << get_closest_twos_factor(4) << endl;
    cout << "for 15 " << get_closest_twos_factor(15) << endl;
    */


	return 0;
}

void
print_matrix(vector < vector<int> > res_vect) {
    // print 2d matrix
    for (int i=0; i<res_vect.size(); i++)
    {
        for (int j=0; j<res_vect[i].size() ;j++) {
            cout << res_vect[i][j] << " ";
        }
        cout << endl;
    }
    return;
}

vector< vector<int> >
divide_conquer_matrix(vector < vector<int> > vect_a, vector < vector<int> > vect_b, int size) {

    vector< vector<int> > vect_res(size, vector<int>(size, 0));
    
    /* base case */
    if ( size <= 1 ) {
        vect_res[0][0] = vect_a[0][0] * vect_b[0][0];
        return vect_res;
    }

    int half_size = size / 2;
    int quart_sz = get_closest_twos_factor(half_size);

    // divide the matrix into four quarter
    vector< vector<int> > a, b, c, d, e, f, g, h;
    a = get_quarter_matrix(vect_a, half_size, 0,         half_size, 0,         half_size);
    b = get_quarter_matrix(vect_a, half_size, half_size, size,      0,         half_size);
    c = get_quarter_matrix(vect_a, half_size, 0,         half_size, half_size, size);
    d = get_quarter_matrix(vect_a, half_size, half_size, size,      half_size, size);

    e = get_quarter_matrix(vect_b, half_size, 0,         half_size, 0,         half_size);
    f = get_quarter_matrix(vect_b, half_size, half_size, size,      0,         half_size);
    g = get_quarter_matrix(vect_b, half_size, 0,         half_size, half_size, size);
    h = get_quarter_matrix(vect_b, half_size, half_size, size,      half_size, size);

    /*
     * [a,b] x [e,f] = [ae+bg, af+bh]
     * [c,d]   [g,h]   [ce+dg, cf+dh]
     */
    vector< vector<int> > a_res, b_res, c_res, d_res;
    a_res = add_matrices(divide_conquer_matrix(a,e,quart_sz), divide_conquer_matrix(b,g,quart_sz), half_size);
    b_res = add_matrices(divide_conquer_matrix(a,f,quart_sz), divide_conquer_matrix(b,h,quart_sz), half_size);
    c_res = add_matrices(divide_conquer_matrix(c,e,quart_sz), divide_conquer_matrix(d,g,quart_sz), half_size);
    d_res = add_matrices(divide_conquer_matrix(c,f,quart_sz), divide_conquer_matrix(d,h,quart_sz), half_size);


    save_quarter_matrix(a_res, 0, half_size, 0, half_size, vect_res);
    save_quarter_matrix(b_res, 0, half_size, half_size, size, vect_res);
    save_quarter_matrix(c_res, half_size, size, 0, half_size, vect_res);
    save_quarter_matrix(d_res, half_size, size, half_size, size, vect_res);

    return vect_res;
}

void
print_matrix_entry(vector <vector<int>> a, int i, int j)
{
    cout << a[i][j] << endl;
}

vector <vector<int>>
add_matrices(vector <vector<int>> a, vector <vector<int>> b, int size) {

    vector< vector<int> > res(size, vector<int>(size, 0));

    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            res[i][j] = a[i][j] + b[i][j];
        }
    }

    return res;
}
            

void
save_quarter_matrix(vector < vector<int> > vect, int start_row_idx, int end_row_idx, int start_col_idx, int end_col_idx, vector < vector<int> > &vect_res)
{

    for ( int res_i = start_row_idx, i=0; res_i < end_row_idx; res_i++, i++ ) {
       for ( int res_j = start_col_idx, j=0; res_j < end_col_idx; res_j++, j++ ) {
           vect_res[res_i][res_j] = vect[i][j];
       }
    }

   return;
} 

vector <vector<int>>
get_quarter_matrix(vector <vector<int>> vect, int half_size, int start_row_idx, int end_row_idx, int start_col_idx, int end_col_idx)
{
    // get the closest size of power 2, for the size of next matrix
    int quart_sz = get_closest_twos_factor(half_size);
    vector< vector<int> > vect_half(quart_sz, vector<int>(quart_sz, 0));

    int quart_row = 0;
    int quart_col = 0;
    for (int i = start_row_idx, quart_row = 0; i < end_row_idx; i++, quart_row++) {
        for (int j = start_col_idx, quart_col = 0; j < end_col_idx; j++, quart_col++) {
            vect_half[quart_row][quart_col] = vect[i][j];
        }
    }

    return vect_half;
}

int
get_closest_twos_factor(int size) {

    while ( size & size - 1 ) {
        size += 1;
    }
    return size;
}
