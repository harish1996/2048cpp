#include<stdio.h>
#include<iostream>
#include<string>
void display(int *a,int n)
{
    int i,j;
    int *c=a;
    system("clear");
    printf("Controls\n\n   W\n\nA  S  D\n\n");
    for(i=0;i<n;i++)
    {
        printf("\t\t\t\b");
        for(j=0;j<n;j++)
        {
            c=a+(i*n)+j;
            if(*c !=0)
            printf("%4d",*c);
            else
            printf("     ");
            printf(" |\t");
        }
        printf("\n\n");
    }
}
int main()
{
    int n;
    printf("Enter the dimension");
    scanf("%d",&n);
    int *a=(int*)malloc(n*n*sizeof(int));
    int *c=a;
    int e=0,i,j,r;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            c=a+(i*n)+j;
            if(*c==0) e++;
        }
    }
    printf("%d",e);
    if(e==0) return 0;
    r=(int)(e*((float)rand()/RAND_MAX))+1;
    printf("%d",r);
    e=0;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            c=a+(i*n)+j;
            if(*c==0) e++;
            if(e==r)
            {
                if(rand()%2==0) *c=2;
                else *c=4;
                break;
            }
        }
        if(e==r) break;
    }
    display(a,n);
}
