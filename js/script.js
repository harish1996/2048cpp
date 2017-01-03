
function display(a,n)
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
}
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
    if(e==0) return NULL;
    r=e*Math.rand()+1;
    e=0;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
            c=a[(i*n)+j];
            if(c==0) e++;
            if(e==r)
            {
                if(Math.floor(rand()*2)) c=2;
                else c=4;
                break;
            }
        }
        if(e==r) break;
    }
    return a;
}
var join = function(a,n)
{
    var c,d,i,j,disp=0,flag=0;
    for(i=0;i<n;i++) d[i]=c[i];
    for(i=0;i<n;i++)
    {
        if(c[i]==0)
        {
            disp=1;
            for(j=i+1;j<n;j++)
            {
                if(c[j]!=0) break;
                else disp++;
            }
            for(j=i;j<n-disp;j++)
            {
                c[j]=c[j-disp];
            }
            for(j=n-disp;j<n;j++)
            c[j]=0;
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
var up=function(a,n)
{
    var i,j,flag=0,col,cold;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           cold[j]=a[(j*n)+i];
        }
        if(join(cold,n)==1) flag=1;
        for(j=0;j<n;j++)
        {
            a[(j*n)+i]=cold[j];
        }
    }
    return flag;
}
var down=function(a,n)
{
    var i,j,flag=0,col,cold;
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           cold[n-1-j]=a[(j*n)+i];
        }
        if(join(cold,n)==1) flag=1;
        for(j=n-1;j>=0;j--)
        {
            a[(j*n)+i]=cold[n-1-j];
        }
    }
    return flag;
}
var right=function(a,n)
{
    var i,j,flag=0,col,cold;
    for(i=0;i<n;i++)
    {
        for(j=0;j<n;j++)
        {
           cold[j]=a[(i*n)+j];
        }
        if(join(cold,n)==1) flag=1;
        for(j=0;j<n;j++)
        {
            a[(i*n)+j]=cold[j];
        }
    }
    return flag;
}
var left=function(a,n)
{
    var i,j,flag=0,col,cold;
    for(i=0;i<n;i++)
    {
        for(j=n-1;j>=0;j--)
        {
           cold[n-1-j]=a[(i*n)+j];
        }
        if(join(cold,n)==1) flag=1;
        for(j=n-1;j>=0;j--)
        {
            a[(i*n)+j]=cold[n-1-j];
        }
    }
    return flag;
}
var step = function(choice,a,n)
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
}
function func()
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
}
function control(choice)
{

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
            grid.innerHTML+="<div class=\"row"+i+" cells\" id=\"cell"+z+"\"> "+(z+1)+"</div>"; 
            var select = document.getElementById("cell"+z);
            str="background-color:rgb(128,128,"+Math.floor(z*x)+");";//height:"+Math.floor(z*y)+"px;width:"+Math.floor(z*y)+"px;";
            select.style=str;
        }
        grid.innerHTML+="<br>";
    }
}
