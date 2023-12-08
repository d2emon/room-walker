import {Action} from 'redux';
import {
  ThunkAction,
  ThunkDispatch,
} from 'redux-thunk';
import * as Events from 'services/events';
import {
  CONVERSATION_MODE_ACTION,
  CONVERSATION_MODE_SAY,
  CONVERSATION_MODE_TSS,
} from './modes';
import {
  EventsAction,
  forcedEvents,
} from '../events/actions';
import {Store} from '../../reducers';
import Users from '../../../services/users';

// Types
type Dispatch<A extends Action> = ThunkDispatch<Store, any, A>;
export type TalkerThunkAction<A extends Action> = ThunkAction<any, Store, any, A>;

const openworld = () => Promise.resolve();
const closeworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const dumpitems = () => Promise.resolve();
const saveme = () => Promise.resolve();
const chksnp = () => Promise.resolve();
const onTiming = () => Promise.resolve();
const removeCharacter = (characterId: number) => Promise.resolve();

const setFromKeyboard = (work: string) => Promise.resolve(`[l]${work}[/l]`);

const onInput = (
  dispatch: Dispatch<Action | EventsAction>,
  getState: () => Store,
  userId: number | string,
) => {
    const prepareInput = (action: string): Promise<string> => new Promise((resolve) => {
        const conversationMode = getState().talker.conversationMode;
        if (!action) {
            return resolve('');
        }
        if ((conversationMode !== CONVERSATION_MODE_ACTION) && action === '**') {
            // conversationMode = CONVERSATION_MODE_ACTION;
        }
        if ((action !== '*') && (action[0] === '*')) {
            return resolve(action.substr(1));
        }
        if (conversationMode === CONVERSATION_MODE_SAY) {
            return resolve(`say ${action}`);
        } else if (conversationMode === CONVERSATION_MODE_TSS) {
            return resolve(`tss ${action}`);
        } else {
            return resolve(action);
        }
    });
    const performAction = (action: string) => Users.perform(userId, action);
    const updateEnemy = (): Promise<void> => Promise.resolve({
        characterId: getState().talker.enemyId,
        name: '',
        channelId: 0,
    })
        .then((enemy) => enemy && enemy.name && (enemy.channelId === getState().talker.channelId))
        .then((canFight) => {
            if (canFight) {
                return;
            }
            // setEnemyId(undefined);
            // setFightingCounter(undefined);
        });
    const tickFight = (): Promise<void> => new Promise((resolve) => {
        if (!getState().talker.fightingCounter) {
            return resolve();
        }
        // setFightingCounter(getState().talker.fightingCounter - 1);
    });
    const afterInput = (): Promise<void> => (getState().events.forceEvents
        ? Events.processEvents(userId, getState().events.eventId)
            .then(() => dispatch(forcedEvents()))
            .then(() => undefined)
        : Promise.resolve()
    );

    return prepareInput(getState().talker.keyBuff)
        .then(performAction)
        .then(updateEnemy)
        .then(tickFight)
        .then(afterInput)
        .then(pbfr);
};

// loseme();
export const finishUser = (getState: () => Store) => Promise.resolve()
    .then(openworld)
    .then(() => getState().talker.name)
    .then(name => Promise.all([
        dumpitems(),
        getState().talker.isFullyInvisible && Users.sendEvent({
            sender: name,
            receiver: name,
            code: -10113,
            channelId: 0,
            payload: `${name} has departed\n`,
        }),
        removeCharacter(getState().talker.characterId),
    ]))
    .then(closeworld)
    .then(() => Promise.all([
        getState().talker.zapped
            ? Promise.resolve()
            : saveme(),
        chksnp(),
    ]));

/*
// await postUserEvents(user.id, {
//   eventId: user.eventId,
//   force: true,
//   interrupt: true,
// });

on_timing();
closeworld();
*/
// key_reprint();
export const onWait = (
    dispatch: Dispatch<Action>,
    getState: () => Store,
    userId: string,
) => Events.processEvents(userId, getState().events.eventId, true)
    .then(onTiming);

export const nextTurn = async (
    dispatch: Dispatch<Action | EventsAction>,
    getState: () => Store,
) => {
  const { keyBuff } = getState().talker;

  await setFromKeyboard(keyBuff);
  await Events.processEvents(getState().mainWindow.userId, getState().events.eventId);
  await onInput(dispatch, getState, getState().mainWindow.userId)
};

/*
const changeChannel = (channelId: number): Promise<void> => Promise.resolve()
    .then(openworld)
    .then(() => {
        // setChannelId(channelId);
        // setplocation(userId, channelId);
        return channelId;
    })
    .then(() => {
        //lookIn
    });
*/

//----

/*
 
 long i_setup=0;
 long oddcat=0;
 long  talkfl=0;
 
 #include <stdio.h>
 #include <sys/errno.h>
 #include <sys/file.h>
 
 extern FILE * openlock();
 extern char globme[];
 extern long cms;
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
 long cms= -1;
 long curch=0;
  
 char globme[40];
 long  curmode=0;
 long  meall=0;
  *//*
  
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
  
  *//*
  
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
     *//* Print appropriate stuff from data block *//*
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
     extern long curch,moni,mynum;
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
     if(pvis(mynum)) strcat(prmpt,"(");
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
     if(pvis(mynum)) strcat(prmpt,")");
     pbfr();
     if(pvis(mynum)>9999) set_progname(0,"-csh");
     else
     sprintf(work,"   --}----- ABERMUD -----{--     Playing as %s",name);
     if(pvis(mynum)==0) set_progname(0,work);
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
    *//* NOTE: Always open with R or r+ or w *//*
 intr:if(flock(fileno(unit),LOCK_EX)== -1)
         if(errno==EINTR) goto intr; *//* INTERRUPTED SYSTEM CALL CATCH *//*
     switch(errno)
     {
         case ENOSPC:crapup("PANIC exit device full\n");
 *//*    	case ESTALE:;*//*
         case EHOSTDOWN:;
         case EHOSTUNREACH:crapup("PANIC exit access failure, NFS gone for a snooze");
     }
     return(unit);
     }
  
   
  talker(name)
  char *name;
     {
     extern long curch,cms;
     extern long mynum;
     extern long maxu;
     extern long rd_qd;
     FILE *fl;
     char string[128];
     extern char globme[];
     makebfr();
         cms= -1;putmeon(name);
     if (mynum>=maxu) {printf("\nSorry AberMUD is full at the moment\n");return(0);}
     strcpy(globme,name);

    // await postUserEvents(user.id, {
    //   eventId: null,
    //   force: true,
    // });

     cms= -1;
     special(".g",name);
     i_setup=1;
     while(1)
        {
        pbfr();
        sendmsg(name);

        // await postUserEvents(user.id, {
        //   eventId: user.eventId,
        //   force: rd_qd,
        // });

        closeworld();
        pbfr();
        }
     }
     
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
  
  
  
  special(string,name)
  char *string,*name;
     {
     extern long curmode;
     char ch,bk[128];
     extern long curch,moni;
     extern long mynum;
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
           setpstr(mynum,my_str);
           setplev(mynum,my_lev);
  if(my_lev<10000) setpvis(mynum,0);
     else setpvis(mynum,10000);
           setpwpn(mynum,-1);
           setpsexall(mynum,my_sex);
           setphelping(mynum,-1);
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
 char  *tmpwiz=".";*//* Illegal name so natural immunes are ungettable! *//*
  
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
     extern long mynum;
     FILE *unit;
     extern long my_lev;
     if(my_lev>9) goto ndie;
     ndie:unit=openworld();
     setploc(mynum,chan);
     lookin(chan);
     }
  
 long mynum=0;
  
// putmeon(name)
  
  loseme(name)
  char *name;
     {
 extern long iamon;
 extern long mynum;
 extern long zapped;
 char bk[128];
 extern char globme[];
 FILE *unit;  
 sig_aloff();*/ /* No interruptions while you are busy dying */
             /* ABOUT 2 MINUTES OR SO *//*
 i_setup=0;
                
 unit=openworld();
     dumpitems();
 if(pvis(mynum)<10000) {
 sprintf(bk,"%s has departed from AberMUDII\n",globme);
 sendsys(globme,globme,-10113,0,bk);
 }
     pname(mynum)[0]=0;
         closeworld();
 if(!zapped) saveme();
         chksnp();
     }
  
 long lasup=0;
 
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
  long room; *//* Lords ???? *//*
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
  
 
 long iamon=0;
 
 userwrap()
 {
 extern char globme[];
 extern long iamon;
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
