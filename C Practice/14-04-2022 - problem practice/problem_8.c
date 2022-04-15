/*
In a grid there are HH rows and WW columns of cells. All cells are white initially.

Alex picks some hh rows and ww columns. Then all cells that are in these rows or columns are colored black.

How many cells will remain white?
*/

#include<stdio.h>

int main(){
    int W,H,w,h,R;
    scanf("%d %d",&H, &W);
    scanf("%d %d",&h,&w);
    R = W*H-(w*H+h*W)+h*w;
    printf("%d\n",R);
}
