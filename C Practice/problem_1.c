/*
    Write a C program to print your name, date of birth. and mobile number.
    Expected Output:
    Name  : Alexandra Abramov
    DOB    : July 14, 1975
    Mobile : 99-9999999999
*/


#include<stdio.h>

int main(){
char name[100] = "Alexandra Abramov";
char birth_day[13] = "Jul 14, 1975";
int mob_code;
int mob_number;
mob_code = 99;
mob_number = 999999999;
printf("name : %s\n",name);
printf("DOB : %s\n",birth_day);
printf("Mobile : %d-%d\n",mob_code,mob_number);


}
