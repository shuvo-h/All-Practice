/*
Taro has to study for TT hours for an exam.
Fortunately, he can jump to World B where time passes XX times as fast as it does in our world (World A).
In other words, While (X \times t)(X×t) hours pass in World B, tt hours pass in World A.
How many hours will pass in World A while Taro studies for TT hours in World B?
*/

#include<stdio.h>

int main(){
    int T,X;
    double R;
    scanf("%d %d",&T,&X);
    R = (double)T/(double)X;
    printf("%.10f",R);
}
