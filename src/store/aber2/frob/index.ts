/*
frobnicate()
{
	extern char wordbuf[];
	extern long my_lev;
	int x;
	char ary[128];
	char bf1[8],bf2[8],bf3[8];
	if(my_lev<10000)
	{
		bprintf("No way buster.\n");
		return;
	}
	if(brkword()==-1)
	{
		bprintf("Frobnicate who ?\n");
		return;
	}
	x=fpbn(wordbuf);
	if((x>15)&&(my_lev!=10033))
	{
		bprintf("Can't frob mobiles old bean.\n");
		return;
	}
	if((plev(x)>9999)&&(my_lev!=10033)) 
	{
		bprintf("You can't frobnicate %s!!!!\n",pname(x));
		return;
	}
	bprintf("New Level: ");
	pbfr();

	dispatch(resetKeys());

    <Getkbd maxLength={6} onChange={bf1} />

	bprintf("New Score: ");
	pbfr();

	<Getkbd maxLength={8} onChange={bf2} />

	bprintf("New Strength: ");
	pbfr();

	<Getkbd maxLength={8} onChange={(bf3) => {
	  dispatch(setFlags());
	}} />

	sprintf(ary,"%s.%s.%s.",bf1,bf2,bf3);
	openworld();
	sendsys(pname(x),pname(x),-599,0,ary);
	bprintf("Ok....\n");
}
	
     
 */

 export const value = {};
