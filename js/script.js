
/*function display(a,n)
{
    var i,j;
    var c;
    document.getElementById("ctrl").innerHTML="<pre>"+"Controls\n\n   W\n\nA  S  D\n\n Q to Quit\n\n"+"</pre>";
    var alias = document.getElementById("main");
	alias.innerHTML="";    
	for (i = 0; i < n; i++)
    {
        alias.innerHTML+="&#9&#9&#9";
        for (j = 0; j<n; j++) 
        {
            c=a[(i*n)+j];
            if(c!=0)
            {
                alias.innerHTML+= c;

            }
            else
                alias.innerHTML+= "";
            alias.innerHTML+=" |&#9";
        }    
        alias.innerHTML+="\n\n";
    }
}*/
var randomfill = function(a,n)
{
	var c;
	var e=0,i,j,r;
	for(i=0;i<n;i++)
	{
		for(j=0;j<n;j++)
		{
			c=a[(i*n)+j];
			if(c==0)e++;
		}
	}
    if(e==0) return null;
    r=Math.floor(e*Math.random())+1;
    alert(r);
    e=0;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            c=a[(i*n)+j];
            if(c==0) e++;
            if(e==r)
            {
                if(Math.floor(Math.random()*2)==1) a[(i*n)+j]=2;
                else a[(i*n)+j]=4;
                break;
            }
        }
        if(e==r) break;
    }
    return a;
}
var join = function(a,n)
{
    var i,j,disp=0,flag=0;
    var d=a;
    for(i=0;i<n;i++)
    {
        if(a[i]==0)
        {
            disp=1;
            for(j=i+1;j<n;j++)
            {
                if(a[j]!=0) break;
                else disp++;
            }
            for(j=i;j<n-disp;j++)
            {
                a[j]=a[j-disp];
            }
            for(j=n-disp;j<n;j++)
            a[j]=0;
        }
        disp=0;
        for(j=i+1;j<n;j++)
        {
            if(a[j]!=a[i] && a[j]!=0)break;
            else if(a[j]==a[i])
            {
                a[i]=a[j]+a[i];
                a[j]=0;
                break;
            }
            else if(a[j]==0) disp++;
        }
        for(j=i+1;j<n-disp;j++)
        {
            a[j]=a[j+disp];
        }
        for(j=n-disp;j<n;j++)a[j]=0;
    }
    for(i=0;i<n;i++)
    {
        if(a[i]!=d[i])
        {
            flag=1;
            break;
        }
    }
    return [a,flag];
}
var up=function(a,n)
{
    var i,j,flag=0,cold=new Array(n),x;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           cold[j]=a[(j*n)+i];
        }
        x=join(cold,n);
        if(x[1]==1) flag=1;
        cold=x[0];
        for(j=0;j<n;j++)
        {
            a[(j*n)+i]=cold[j];
        }
    }
    return [a,flag];
}
var down=function(a,n)
{
    var i,j,flag=0,cold=new Array(n);
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           cold[n-1-j]=a[(j*n)+i];
        }
        x=join(cold,n);
        if(x[1]==1) flag=1;
        cold=x[0];
        for(j=n-1;j>=0;j--)
        {
            a[(j*n)+i]=cold[n-1-j];
        }
    }
    return [a,flag];
}
var right=function(a,n)
{
    var i,j,flag=0,cold=new Array(n);
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           cold[j]=a[(i*n)+j];
        }
         x=join(cold,n);
        if(x[1]==1) flag=1;
        cold=x[0];
        for(j=0;j<n;j++)
        {
            a[(i*n)+j]=cold[j];
        }
    }
    return [a,flag];
}
var left=function(a,n)
{
    var i,j,flag=0,cold=new Array(n);
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           cold[n-1-j]=a[(i*n)+j];
        }
         x=join(cold,n);
        if(x[1]==1) flag=1;
        cold=x[0];
        for(j=n-1;j>=0;j--)
        {
            a[(i*n)+j]=cold[n-1-j];
        }
    }
    return [a,flag];
}
/*var step = function(choice,a,n)
{
    var c,flag,d;
    switch(choice)
    {
        case 1: flag=up(a,n);
        case 2: flag=left(a,n);
        case 3: flag=down(a,n);
        case 4: flag=right(a,n);
        case 5: return -1;
        default : { alert("Invalid Option !"); return 0;}
    }
    if(flag==1)d=randomfill(c,n);
    if(d==NULL) return -1;
    else return 1;
}*/
/*function func()
{
    var a,n,game=1,imm=0,choice;
    n=prompt("Enter Grid size");
    a=randomfill(a,n);
    while(game==1)
    {
        display(a,n);
        do
        {
            choice=getalert();
            imm=step(choice,a,n);
        }while(imm==0)
        if(imm=1)
        {
            game=0;
            alert("Game Over!!");
            display(a,n);
        }
    }
}*/
var getgrid = function(n)
{
    var c=new Array(n*n),a;
    for(var i=0;i<n;i++)
    {
        for(var j=0;j<n;j++)
        {
            a=document.getElementById("cell"+((i*n)+j)).innerHTML;
            if(a==" ") c[((i*n)+j)]=0;
            else c[(i*n)+j]=a;
        }
    }
    return c;
}
function display(a,n)
{
    for(var i=0;i<n;i++)
    {
        for(var j=0;j<n;j++)
        {
            var x=document.getElementById("cell"+((i*n)+j));
            if(a[(i*n)+j]==0) x.innerHTML=" ";
            else x.innerHTML=a[(i*n)+j];
        }
    }

}
function control(choice)
{
    var a,c=1,n,i=0,flag,x,y;
    alert("Inside control");
    while(c!=null)
    {
        c=document.getElementById("cell"+i);
        i++;
    }
    n=Math.sqrt(i-1);
    a=getgrid(n);

    switch(choice)
    {
        case 1:x=up(a,n);
        case 2:x=left(a,n);
        case 3:x=down(a,n);
        case 4:x=right(a,n);
    } 
    a=x[0];
    flag=x[1];
    if(flag==1) y=randomfill(a,n);
    if(y!=null)
    display(y,n);
}
function initialise()
{
    var n=prompt("Enter the Grid Size"),a=1;
    var grid=document.getElementById("main");
    var x=256/(n*n),y=100/(n*n);
    for(var i=0;i<n;i++)
    {
        for(var j=0;j<n;j++)
        {
            var z=(i*n)+j,str;
            grid.innerHTML+="<div class=\"row"+i+" cells\" id=\"cell"+z+"\"> "+"</div>"; 
            var select = document.getElementById("cell"+z);
            str="background-color:rgb(0,0,"+Math.floor(z*x)+");";//height:"+Math.floor(z*y)+"px;width:"+Math.floor(z*y)+"px;";
            select.style=str;
            select.innerHTML=" ";
        }
        grid.innerHTML+="<br>";
    }
    var a=getgrid(n);
    a=randomfill(a,n);
    for(var i=0;i<n;i++)
    {
        for(var j=0;j<n;j++)
        {
            document.getElementById("cell"+((i*n)+j)).innerHTML=a[(i*n)+j];
        }
    }
}
