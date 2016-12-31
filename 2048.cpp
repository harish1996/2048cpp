#include<iostream>
#include<stdio.h>
#include<string.h>
/* Displaying the grid of the game in proper format after clearing the screen before each turn */
void display(int *a,int n)
{
    int i,j;
    int *c=a;
    system("clear");
    printf("Controls\n\n   W\n\nA  S  D\n\n Q to Quit\n\n");
    for(i=0;i<n;i++)
    {
        printf("\t\t\t\b");
        for(j=0;j<n;j++)
        {
            c=a+(i*n)+j;
            if(*c !=0)
            printf("%4d",*c);
            else
            printf("    ");
            printf(" |\t");
        }
        printf("\n\n");
    }
}
/*Randomise the appearing new number before each turn in addition to the existing grid and thereby returning the
new game matrix */
int* randomfill(int* a,int n)
{
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
    if(e==0) return NULL;
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
    return a;
}
/*After breaking the grid into column/row vector , the basic joining action is done returning the status of the join
operation and the grid itself after updation */
int join(int* a,int n)
{
    int* c=a;
    int* d=(int*)malloc(n*sizeof(int));
    int i,j,disp=0,flag=0;
    for(i=0;i<n;i++)d[i]=c[i];
    for(i=0;i<n;i++)
    {
        if(c[i]==0)
        {   disp=1;
            for(j=i+1;j<n;j++)
            {
                if(c[j]!=0)break;
                else disp++;
            }
            for(j=i;j<n-disp;j++)
            {
                c[j]=c[j+disp];
            }
            for(j=n-disp;j<n;j++)c[j]=0;
        }
        disp=0;
            for(j=i+1;j<n;j++)
            {
                if(c[j]!=c[i] && c[j]!=0)break;
                else if(c[j]==c[i])
                {
                    c[i]=c[j]+c[i];
                    c[j]=0;
                    break;
                }
                else if(c[j]==0) disp++;
            }
            for(j=i+1;j<n-disp;j++)
            {
                c[j]=c[j+disp];
            }
            for(j=n-disp;j<n;j++)c[j]=0;
    }
    for(i=0;i<n;i++)
    {
        if(c[i]!=d[i])
        {
            flag=1;
            break;
        }
    }
    return flag;
}
/*Breaking the grid into column vectors for join up process */
int up(int* a,int n)
{
    int i,j,flag=0;
    int *col=(int*)malloc(n*sizeof(int));
    int *cold=col;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           *cold=*(a+(j*n)+i);
           cold++;
        }
        cold=col;
        if(join(cold,n)==1) flag=1;
        cold=col;
        for(j=0;j<n;j++)
        {
            *(a+(j*n)+i)=*cold;
            cold++;
        }
        cold=col;
    }
    return flag;
}
/*Breaking the grid into column vectors for join down process */
int down(int *a,int n)
{
    int i,j,flag=0;
    int *col=(int*)malloc(n*sizeof(int));
    int *cold=col;
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           *cold=*(a+(j*n)+i);
           cold++;
        }
        cold=col;
        if(join(cold,n)==1) flag=1;
        cold=col;
        for(j=n-1;j>=0;j--)
        {
            *(a+(j*n)+i)=*cold;
            cold++;
        }
        cold=col;
    }
    return flag;
}
/*Breaking the grid into row vectors for join left process */
int left(int *a,int n)
{
    int i,j,flag=0;
    int *row=(int*)malloc(n*sizeof(int));
    int *rowd=row;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           *rowd=*(a+(i*n)+j);
           rowd++;
        }
        rowd=row;
        if(join(rowd,n)==1) flag=1;
        rowd=row;
        for(j=0;j<n;j++)
        {
            *(a+(i*n)+j)=*rowd;
            rowd++;
        }
        rowd=row;
    }
    return flag;
}
/*Breaking the grid into row vectors for join right process */
int right(int* a,int n)
{
    int i,j,flag=0;
    int *row=(int*)malloc(n*sizeof(int));
    int *rowd=row;
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           *rowd=*(a+(i*n)+j);
           rowd++;
        }
        rowd=row;
        if(join(rowd,n)==1) flag=1;
        rowd=row;
        for(j=n-1;j>=0;j--)
        {
            *(a+(i*n)+j)=*rowd;
            rowd++;
        }
        rowd=row;
    }
    return flag;
}
/*Actions taken during each turn . 1) Choice selection 2) Joining 3) New number generation */
int step(char *choice,int* a,int n)
{
    int *c=a,flag,*d;
    if(*choice=='W'||*choice=='w') flag=up(c,n);
    else if(*choice=='A'||*choice=='a') flag=left(c,n);
    else if(*choice=='S'||*choice=='s') flag=down(c,n);
    else if(*choice=='D'||*choice=='d') flag=right(c,n);
    else if(*choice=='Q'||*choice=='q') return -1;
    else
    {
        printf("Invalid Option Try Again !\n ");
        return 0;
    }
    if(flag==1)
    d=randomfill(c,n);
    if(d==NULL) return -1;
    else return 1;
}
/*The main process */
int main()
{
    int n,game=1,imm=0;
    int *a;
    char choice[2];
    printf("Enter the grid size of the game ( The side of the square grid ... like 3 for 3*3 ):");
    scanf("%d",&n);
    a=(int*)malloc(n*n*sizeof(int));
    a=randomfill(a,n);
    while(game==1)
    {
        display(a,n);
        do
        {
            scanf("%s",choice);
            printf("%s",choice);
            imm=step(choice,a,n);
        }while(imm==0);
        if(imm==-1)
        {
            game=0;
            printf("Game Over\n");
            display(a,n);
        }
    }
    return 0;
}
