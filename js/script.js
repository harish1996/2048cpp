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
    var d=a.slice();
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
                a[j]=a[j+disp];
            }
            for(j=n-disp;j<n;j++)
            a[j]=0;
        }
        //console.log(a);
        //alert(a);
        //alert(disp);
        disp=0;
        for(j=i+1;j<n;j++)
        {
            if(a[j]!=a[i] && a[j]!=0)break;
            else if(a[j]==a[i])
            {
                a[i]=parseInt(a[j])+parseInt(a[i]);
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
        //console.log(x[0]);
        if(x[1]==1) flag=1;
        cold=x[0];
        for(j=0;j<n;j++)
        {
            a[(j*n)+i]=cold[j];
        }
    }
    //console.log(a);
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
    //console.log(a);
    return [a,flag];
}
var left=function(a,n)
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
    //console.log(a);
    return [a,flag];
}
var right=function(a,n)
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
    //console.log(a);
    return [a,flag];
}
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
            if(a[(i*n)+j]==0) 
            {
                x.innerHTML=" ";
                x.style="background-color:rgb(128,128,0)";
            }
            else 
            {
                x.innerHTML=a[(i*n)+j];
                x.style="background-color:rgb(128,128,"+(Math.floor(Math.log2(a[(i*n)+j])*256/12))+");";
            }

        }
    }

}
function control(choice)
{
    var a,c=1,n,i=0,flag,x,y;
    while(c!=null)
    {
        c=document.getElementById("cell"+i);
        i++;
    }
    n=Math.sqrt(i-1);
    a=getgrid(n);
    y=new Array(n*n);
    switch(choice)
    {
        case 1:x=up(a,n);
                break;
        case 2:x=left(a,n);
            break; 
        case 3:x=down(a,n);
            break;
        case 4:x=right(a,n);
            break;
    }
    //console.log(x[0]);
    a=x[0];
    flag=x[1];
    //alert(a);
    if(flag==1) a=randomfill(a,n);
    //else 
    //{
   // 	if((up(a,n)[1]==0)&&(right(a,n)[1]==0))
   // 	document.getElementById("game").innerHTML="Game Over ! Refresh Browser to start a new game ! ";
    //}
    if(a!=null)
    display(a,n);
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
            var x=a[(i*n)+j];
            if(x!=0)
            document.getElementById("cell"+((i*n)+j)).innerHTML=a[(i*n)+j];
            else
            document.getElementById("cell"+((i*n)+j)).innerHTML=" ";
        }
    }
}
