/*
A trapezoid is a quadrilateral with two parallel sides. The lengths of the two parallel sides are aa and bb and their distance is hh.
Find the area of this trapezoid.
*/

#include<stdio.h>
int main(){
    int a, b, h;
    scanf("%d",&a);
    scanf("%d",&b);
    scanf("%d",&h);
    int result =  ((a+b)*h)/2;
    printf("%d",result);
    return 0;
}
