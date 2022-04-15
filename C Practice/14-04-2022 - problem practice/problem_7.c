/*
Mokbul has two sons - Abul and Babul. Mokbul remembers Abul's age but has forgotten Babul's age. But he remembers their average age. Help Mokbul remember Babul's Age.
 How can you recover babul's age ?
*/

#include<stdio.h>

int main(){
    int abul_age,babul_age,average_age;
    scanf("%d %d",&abul_age,&average_age);
    babul_age = (average_age * 2)- abul_age;
    printf("%d",babul_age);
    return 0;
}
