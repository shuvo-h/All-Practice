#include<stdio.h>

int main(){

    int price = 100;
    printf("price = %d\n",price);

    float temperature = 30.5;
    printf("temp = %f\n",temperature);

    double temp = 31.5;
    printf("temp2 = %lf\n",temp);

    char character = 'c';
    printf("The character is = %c\n", character);

    int marks_english;
    int marks_math;
    printf("Enter marks of english ");
    scanf("%d", &marks_english);
    printf("Enter marks of math ");
    scanf("%d", &marks_math);

    int total = marks_english + marks_math;
    printf("The total mark is = %d\n", total);

    float distance;
    printf("Enter the distance ");
    scanf("%f",&distance);
    printf("Your distancce from me  %f\n",distance);

    // Arithmatic operator
     int num1, num2;
     scanf("%d %d", &num1, &num2);
     int total = num1 + num2;
     printf("Total num is %d + %d = %d\n", num1,num2,total);

    int difference = num1 - num2;
    printf("Difference is %d - %d = %d \n",num1,num2,difference);

    // type conversion
     double realNumber = -10.656;
     int number = realNumber;
     printf("number = %d, realNumber = %lf\n",number,realNumber);




    return 0;
}
