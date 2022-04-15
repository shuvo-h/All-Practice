
/*
    Write a C program that accepts two integers from the user and calculate the product of the two integers.
    Expected Input/Output:

    Input the first integer: 25
    Input the second integer: 15
    Expected Output:
    Product of the above two integers = 375

*/
/*
#include<stdio.h>

int main(){
    int a,b,R;
    printf("Input the first integer: \n");
    scanf("%d",&a);
    printf("Input the second integer: \n");
    scanf("%d",&b);
    R = a*b;
    printf("Product of the above two integers = %d\n",R);
}
*/


/*
#include<stdio.h>

int main(){
    int t,X;
    double R;
    scanf("%d %d",&t,&X);
    R = (double)t/(double)X;
    printf("%.10f",R);
}
*/

#include<stdio.h>

int main(){
    int W,H,w,h,R;
    scanf("%d %d",&H, &W);
    scanf("%d %d",&h,&w);
    R = W*H-(w*H+h*W)+h*w;
    printf("%d\n",R);
}



