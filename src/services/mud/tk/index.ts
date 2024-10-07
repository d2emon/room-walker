import { crapup } from '../response';
import { MudData } from '../storage';
import { ServiceResponse } from '../types';

const bprintfModule = {
  makebfr: async () => null,
  /*
  setPrDue: (value: boolean) => null,
  setPrQcr: (value: boolean) => null,
  */
  pbfr: async (data: MudData, response: ServiceResponse): Promise<ServiceResponse> => ({
    ...response,
    result: {
      ...response.result,
      sessionId: data?.sessionId || '',
      isSetAlarm: !!data?.isSetAlarm,
      isWaiting: !!data?.isWaiting,
      messages: [],
      name: data?.name || '',      
    },
  }),
};
  
const ndebugModule = {
  getMaxu: () => 16,
};
  
const objsysModule = {
  fpbn: async (world: any, name: string) => -1,
};
      
const opensysModule = {
  openworld: async () => ({}),
  closeworld: async (world: any) => null,
};
    
const supportModule = {
  pname: async (world: any, playerId: number) => '',
  setphelping: async (world: any, playerId: number | undefined, value: number) => null,
  setplev: async (world: any, playerId: number | undefined, value: number) => null,
  setploc: async (world: any, playerId: number | undefined, value: number) => null,
  setpname: async (world: any, playerId: number | undefined, value: string) => null,
  setppos: async (world: any, playerId: number | undefined, value: number) => null,
  setpsex: async (world: any, playerId: number | undefined, value: number) => null,
  setpstr: async (world: any, playerId: number | undefined, value: number) => null,
  setpvis: async (world: any, playerId: number | undefined, value: number) => null,
  setpwpn: async (world: any, playerId: number | undefined, value: number) => null,
};
        
const tkModule = {
  setGlobme: (value: string) => null,
  loseme: async () => ({}),
  rte: async (name: string, interrupt: boolean) => ({}),
};

const resetCms = () => null;
const setCms = (value: number) => null;
const getCms = () => -1;

const setMynum = (value: number) => null;
const getMynum = () => 0;

const setISetup = (value: boolean) => null;
const getISetup = () => false;

/*
 *
 *		AberMUD II   C
 *
 *
 *	This game systems, its code scenario and design
 *	are (C) 1987/88  Alan Cox,Jim Finnis,Richard Acott
 *
 *
 *	This file holds the basic communications routines
 *
 */
/* 
 #include "files.h"
 #include "flock.h"
 
 long oddcat=0;
 long  talkfl=0;
 
 #include <stdio.h>
 #include <sys/errno.h>
 #include <sys/file.h>
 
 extern FILE * openlock();
 extern char globme[];
 extern long curch;
 extern long my_str;
 extern long my_sex;
 extern long my_lev;
 extern FILE * openroom(); 
 extern FILE * openworld();
 extern char * pname();
 extern char * oname();
 extern long ppos();
 extern char key_buff[];
 long curch=0;
  
 char globme[40];
 long  curmode=0;
 long  meall=0;
*/
/*
  
  Data format for mud packets
  
  Sector 0
  [64 words]
  0   Current first message pointer
  1   Control Word
  Sectors 1-n  in pairs ie [128 words]
  
  [channel][controlword][text data]
  
  [controlword]
  0 = Text
  - 1 = general request
  
*/
/*
  
 vcpy(dest,offd,source,offs,len)
 long *dest,*source;
 long offd,offs,len;
     {
     long c;
     c=0;
     while(c<len)
        {
        dest[c+offd]=source[c+offs];
        c++;
        }
     }
  
  mstoout(block,name)
  long *block;char *name;
     {
     extern long debug_mode;
     char luser[40];
     char *x;
     x=(char *)block;
*/
/*
 Print appropriate stuff from data block */
/*

     strcpy(luser,name);lowercase(luser);
 if(debug_mode)    bprintf("\n<%d>",block[1]);
     if (block[1]<-3) sysctrl(block,luser);
     else
        bprintf("%s", (x+2*sizeof(long)));
     }
  
 long gurum=0;
 long convflg=0;
  
 sendmsg(name)
  char *name;
     {
     extern long debug_mode;
     extern char *sysbuf;
     extern long curch,moni;
     char prmpt[32];
     long a;
 extern long tty;
     char work[200];
     long w2[35];
     extern char key_buff[];
     extern long convflg;
     extern long my_lev;
 extern long my_str;
 extern long in_fight;
 extern long fighting;
     extern long curmode;
     l:pbfr();
 if(tty==4) btmscr();
 strcpy(prmpt,"\r");
     if(pvis(getMynum())) strcat(prmpt,"(");
     if(debug_mode) strcat(prmpt,"#");
     if(my_lev>9)strcat(prmpt,"----");
     switch(convflg)
        {
        case 0:
           strcat(prmpt,">");
           break;
        case 1:
           strcat(prmpt,"\"");
           break;
        case 2:
           strcat(prmpt,"*");
           break;
        default:
           strcat(prmpt,"?");
           }
     if(pvis(getMynum())) strcat(prmpt,")");
     pbfr();
     if(pvis(getMynum())>9999) set_progname(0,"-csh");
     else
     sprintf(work,"   --}----- ABERMUD -----{--     Playing as %s",name);
     if(pvis(getMynum())==0) set_progname(0,work);
     sig_alon();
     key_input(prmpt,80);
     sig_aloff();
     strcpy(work,key_buff);
 if(tty==4) topscr();
 strcat(sysbuf,"\001l");
 strcat(sysbuf,work);
 strcat(sysbuf,"\n\001");
 openworld();
 rte(name);
 closeworld();
     if((convflg)&&(!strcmp(work,"**")))
        {
        convflg=0;
        goto l;
        }
     if(!strlen(work)) goto nadj;
 if((strcmp(work,"*"))&&(work[0]=='*')){(work[0]=32);goto nadj;}
     if(convflg)
        {
        strcpy(w2,work);
        if(convflg==1) sprintf(work,"say %s",w2);
        else
           sprintf(work,"tss %s",w2);
        }
     nadj:if(curmode==1) gamecom(work);
     else
        {
        if(((strcmp(work,".Q"))&&(strcmp(work,".q")))&& (!!strlen(work)))
           {
           a=special(work,name);
           }
        }
 if(fighting>-1)
 {
 if(!strlen(pname(fighting))) 
 {
 in_fight=0;
 fighting= -1;
 }
 if(ploc(fighting)!=curch) 
 {
 in_fight=0;
 fighting= -1;
 }
 }
 if(in_fight) in_fight-=1;
     return((!strcmp(work,".Q"))||(!strcmp(work,".q")));
     }
  
  send2(block)
  long *block;
     {
     FILE * unit;
     long number;
     long inpbk[128];
     extern char globme[];
     extern char *echoback;
         unit=openworld();
     if (unit<0) {loseme();crapup("\nAberMUD: FILE_ACCESS : Access failed\n");}
     sec_read(unit,inpbk,0,64);
     number=2*inpbk[1]-inpbk[0];inpbk[1]++;
     sec_write(unit,block,number,128);
     sec_write(unit,inpbk,0,64);
     if (number>=199) cleanup(inpbk);
     if(number>=199) longwthr();
     }
  
  readmsg(channel,block,num)
  long channel;
  long *block;
  int num;
     {
     long buff[64],actnum;
     sec_read(channel,buff,0,64);
     actnum=num*2-buff[0];
     sec_read(channel,block,actnum,128);
     }
  
 FILE *fl_com;
 extern long findstart();
 extern long findend();
 */

export const rte = async (name: string, interrupt: boolean) => ({})

/*
  rte(name)
  char *name;
     {
     extern long vdes,tdes,rdes;
     extern FILE *fl_com;
     extern long debug_mode;
     FILE *unit;
     long too,ct,block[128];
     unit=openworld();
     fl_com=unit;
     if (unit==NULL) crapup("AberMUD: FILE_ACCESS : Access failed\n");
     if (getCms() == -1) setCms(findend(unit));
     too=findend(unit);
     ct= getCms();
     while(ct<too)
        {
        readmsg(unit,block,ct);
        mstoout(block,name);
        ct++;
        }
     setCms(ct);
     update(name);
     eorte();
     rdes=0;tdes=0;vdes=0;
     }
     
 FILE *openlock(file,perm)
 char *file;
 char *perm;
     {
     FILE *unit;
     long ct;
     extern int errno;
     extern char globme[];
     ct=0;
    unit=fopen(file,perm);
    if(unit==NULL) return(unit);
*/
/*
 NOTE: Always open with R or r+ or w */
/*

 intr:if(flock(fileno(unit),LOCK_EX)== -1)
         if(errno==EINTR) goto intr; */
/*
 INTERRUPTED SYSTEM CALL CATCH */
/*

     switch(errno)
     {
         case ENOSPC:crapup("PANIC exit device full\n");
*/
/*
    	case ESTALE:;*/
/*

         case EHOSTDOWN:;
         case EHOSTUNREACH:crapup("PANIC exit access failure, NFS gone for a snooze");
     }
     return(unit);
     }
  
 long findstart(unit)
  FILE *unit;
     {
     long bk[2];
     sec_read(unit,bk,0,1);
     return(bk[0]);
     }
  
 long findend(unit)
  FILE *unit;
     {
     long bk[3];
     sec_read(unit,bk,0,2);
     return(bk[1]);
     }
*/

const createPlayer = async (world: any, name: string) => {
  const found = await objsysModule.fpbn(world, name);
  if (found !== -1) {
    throw new Error('You are already on the system - you may only be on once at a time');
  }

  const maxPlayerId = ndebugModule.getMaxu();
  const promises = [];
  for (let playerId = 0; playerId < maxPlayerId; playerId += 1) {
    promises.push(new Promise<number | null>(async (resolve) => {
      const playerName = await supportModule.pname(world, playerId);
      return resolve(playerName ? null : playerId);
    }));
  }
  const result = await Promise.all(promises);
  const id = result.find(i => i !== null);

  if (id === null) {
    throw new Error('Sorry AberMUD is full at the moment');
  }
  await Promise.all([
    bprintfModule.makebfr(),
    supportModule.setpname(world, id, name),
    supportModule.setploc(world, id, getCurch()),
    supportModule.setppos(world, id, -1),
    supportModule.setplev(world, id, 1),
    supportModule.setpvis(world, id, 0),
    supportModule.setpstr(world, id, -1),
    supportModule.setpwpn(world, id, -1),
    supportModule.setpsex(world, id, 0),
  ]);    
  setMynum(id || 0);
  setGlobme(name);
  resetCms();
};

/*
  special(string,name)
  char *string,*name;
     {
     extern long curmode;
     char ch,bk[128];
     extern long curch,moni;
     extern long my_str,my_lev,my_sco,my_sex;
     FILE * ufl;
     char xx[128];
     char xy[128];
     char us[32];
     strcpy(bk,string);
     lowercase(bk);
     ch= *bk;
     if (ch!='.') return(0);
     ch=bk[1];
     switch(ch)
        {
        case 'g':
           curmode=1;
           curch= -5;
           initme();
           ufl=openworld();
           setpstr(getMynum(),my_str);
           setplev(getMynum(),my_lev);
  if(my_lev<10000) setpvis(getMynum(),0);
     else setpvis(getMynum(),10000);
           setpwpn(getMynum(),-1);
           setpsexall(getMynum(),my_sex);
           setphelping(getMynum(),-1);
           cuserid(us);
           sprintf(xy,"\001s%s\001%s  has entered the game\n\001",name,name);
           sprintf(xx,"\001s%s\001[ %s  has entered the game ]\n\001",name,name);
           sendsys(name,name,-10113,curch,xx);
           rte(name);
           if(randperc()>50)trapch(-5);
 else{curch= -183;trapch(-183);}
 sendsys(name,name,-10000,curch,xy);
           break;
        default:
           printf("\nUnknown . option\n");
           }
     return(1);
     }
  
 */
const special = async (command: string, name: string) => null;

export const afterTalker = async (
  data: MudData,
  response: ServiceResponse,
): Promise<ServiceResponse> => {
  if (response.error) {
    return response;
  }

  const newResponse = await bprintfModule.pbfr(data, response);
  // sendmsg(name);

  return newResponse;
};

export const beforeTalker = async (
  data: MudData,
  response: ServiceResponse,
) => {
  // sendmsg(name);
  /*
     extern long rd_qd;
   */
  /*
        if(rd_qd) rte(name);
        rd_qd=0;
        closeworld();
        pbfr();
   */
  return await bprintfModule.pbfr(data, response);
};
  
export const startTalker = async (
  data: MudData,
): Promise<ServiceResponse> => {
  const world = await opensysModule.openworld();
  if (!world) {
    return crapup(
      data,
      { code: 0, message: 'Sorry AberMUD is currently unavailable' },
      false,
    )({});
  }

  try {
    await createPlayer(world, data.name);
  } catch (e) {
    return crapup(
      data,
      { code: 0, message: `${e}` },
      false,
    )({});  
  }

  await rte(data.name, false);

  await opensysModule.closeworld(world);

  resetCms();
  await special('.g', data.name);
  setISetup(true);

  return afterTalker(data, {});
};

/*
 long rd_qd=0;
  
  cleanup(inpbk)
  long *inpbk;
     {
     FILE * unit;
     long buff[128],ct,work,*bk;
     unit=openworld();
     bk=(long *)malloc(1280*sizeof(long));
     sec_read(unit,bk,101,1280);sec_write(unit,bk,1,1280);
     sec_read(unit,bk,121,1280);sec_write(unit,bk,21,1280);
     sec_read(unit,bk,141,1280);sec_write(unit,bk,41,1280);
     sec_read(unit,bk,161,1280);sec_write(unit,bk,61,1280);
     sec_read(unit,bk,181,1280);sec_write(unit,bk,81,1280);
     free(bk);
     inpbk[0]=inpbk[0]+100;
     sec_write(unit,inpbk,0,64);
     revise(inpbk[0]);
     }
  
  
  
  
  
 long dsdb=0;
  
  
 long moni=0;
  
  broad(mesg)
  char *mesg;
     {
 extern long rd_qd;
 char bk2[256];
 long block[128];
 rd_qd=1;
 block[1]= -1;
 strcpy(bk2,mesg);
 vcpy(block,2,(long *)bk2,0,126);
 send2(block);
 }
 
 tbroad(message)
 char *message;
     {
     broad(message);
     }
     
  sysctrl(block,luser)
  long *block;
  char *luser;
     {
     gamrcv(block);
     }
 long  bound=0;
 long  tmpimu=0;
 char  *echoback="*e";
 char  *tmpwiz=".";*/
/*
 Illegal name so natural immunes are ungettable! */
/*

  
  split(block,nam1,nam2,work,luser)
  long *block;
  char *nam1;
  char *nam2;
  char *work;
  char *luser;
     {
     long wkblock[128],a;
     vcpy(wkblock,0,block,2,126);
     vcpy((long *)work,0,block,64,64);
     a=scan(nam1,(char *)wkblock,0,"",".");
     scan(nam2,(char *)wkblock,a+1,"",".");
 if((strncmp(nam1,"The ",4)==0)||(strncmp(nam1,"the ",4)==0))
 {
 if(!strcmp(lowercase(nam1+4),lowercase(luser))) return(1);
 }
     return(!strcmp(lowercase(nam1),lowercase(luser)));
     }
  trapch(chan)
  long chan;
     {
 extern long curch;
     FILE *unit;
     extern long my_lev;
     if(my_lev>9) goto ndie;
     ndie:unit=openworld();
     setploc(getMynum(),chan);
     lookin(chan);
     }
  
  
  
  loseme(name)
  char *name;
     {
 extern long zapped;
 char bk[128];
 extern char globme[];
 FILE *unit;  
 sig_aloff(); */
/*
 No interruptions while you are busy dying */
             /* ABOUT 2 MINUTES OR SO */
/*

  setISetup(false);
                
 unit=openworld();
     dumpitems();
 if(pvis(getMynum())<10000) {
 sprintf(bk,"%s has departed from AberMUDII\n",globme);
 sendsys(globme,globme,-10113,0,bk);
 }
     pname(getMynum())[0]=0;
         closeworld();
 if(!zapped) saveme();
         chksnp();
     }
  
 long lasup=0;
 
  update(name)
  char *name;
     {
     FILE *unit;
     long xp;
     extern long lasup;
     xp=getCms() - lasup;
     if(xp<0) xp= -xp;
     if(xp<10) goto noup;
     unit=openworld();
     setppos(getMynum(), getCms());
     lasup=getCms();
     noup:;
     }
  
  revise(cutoff)
  long cutoff;
     {
     char mess[128];
     long ct;
     FILE *unit;
     unit=openworld();
     ct=0;
     while(ct<16)
        {
        if((pname(ct)[0]!=0)&&(ppos(ct)<cutoff/2)&&(ppos(ct)!=-2))
           {
           sprintf(mess,"%s%s",pname(ct)," has been timed out\n");
           broad(mess);
           dumpstuff(ct,ploc(ct));
           pname(ct)[0]=0;
           }
        ct++;
        }
     }
  
  lookin(room)
  long room; */
/*
 Lords ???? */
/*

     {
     extern char globme[];
     FILE *un1,un2;
     char str[128];
     long xxx;
     extern long brmode;
     extern long curmode;
     extern long ail_blind;
     long ct;
     extern long my_lev;
     closeworld();
     if(ail_blind)
     {
         bprintf("You are blind... you can't see a thing!\n");
     }
     if(my_lev>9) showname(room);
     un1=openroom(room,"r");
     if (un1!=NULL)
     {
 xx1:   xxx=0;
        lodex(un1);
            if(isdark())
            {
                   fclose(un1);
                   bprintf("It is dark\n");
                         openworld();
                   onlook();
                   return;
               }
        while(getstr(un1,str)!=0)
           {
           if(!strcmp(str,"#DIE"))
              {
              if(ail_blind) {rewind(un1);ail_blind=0;goto xx1;}
              if(my_lev>9)bprintf("<DEATH ROOM>\n");
              else
                 {
                 loseme(globme);
                 crapup("bye bye.....\n");
                 }
              }
           else
 {
 if(!strcmp(str,"#NOBR")) brmode=0;
 else
              if((!ail_blind)&&(!xxx))bprintf("%s\n",str);
           xxx=brmode;
 }
           }
        }
     else
        bprintf("\nYou are on channel %d\n",room);
     fclose(un1);
     openworld();
     if(!ail_blind)
     {
         lisobs();
         if(curmode==1) lispeople();
     }
     bprintf("\n");
     onlook();
     }
  loodrv()
     {
     extern long curch;
     lookin(curch);
     }
  
 
 userwrap()
 {
 extern char globme[];
 if(fpbns(globme)!= -1) {loseme();syslog("System Wrapup exorcised %s",globme);}
 }
 
 fcloselock(file)
 FILE *file;
 {
     fflush(file);
     flock(fileno(file),LOCK_UN);
     fclose(file);
 }
     
 
 */
