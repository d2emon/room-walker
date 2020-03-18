import {Action} from 'redux';
import * as types from './actionTypes';

// Interfaces
interface ResetEvents extends Action {
    type: types.RESET_EVENTS,
}

interface SetEventId extends Action {
    type: types.SET_EVENT_ID,
    eventId: number,
}

interface SetName extends Action {
    type: types.SET_NAME,
    name: string,
}

interface SetInSetup extends Action {
    type: types.SET_IN_SETUP,
}

interface ForcedEvents extends Action {
    type: types.FORCED_EVENTS,
}

// Types
export type TalkerAction = ResetEvents | SetEventId | SetName | SetInSetup | ForcedEvents;

export const resetEvents = (): ResetEvents => ({
    type: types.RESET_EVENTS,
});

export const setEventId = (eventId: number): SetEventId => ({
    type: types.SET_EVENT_ID,
    eventId,
});

export const setName = (name: string): SetName => ({
    type: types.SET_NAME,
    name,
});

export const setInSetup = (): SetInSetup => ({
    type: types.SET_IN_SETUP,
});

export const forcedEvents = (): ForcedEvents => ({
    type: types.FORCED_EVENTS,
});

/**
 * Data format for mud packets
 *
 * Sector 0
 * [64 words]
 * 0   Current first message pointer
 * 1   Control Word
 * Sectors 1-n  in pairs ie [128 words]
 *
 * [channel][controlword][text data]
 *
 * [controlword]
 * 0 = Text
 * - 1 = general request
 */

/*
 special(string,name)
 char *string,*name;
    {
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
          processEvents(name)
            .then(() => {
                if(randperc()>50) {
                    curch= -5;
                } else {
                    curch= -183;
                }
                trapch(curch);
                sendsys(name,name,-10000,curch,xy);
            })
          break;
       default:
          printf("\nUnknown . option\n");
          }
    return(1);
    }

const broad = (payload: string) => Events.postEvent(
    {
        code: -1,
        payload,
    },
)
    .then(() => dispatch(forceEvents()))
    .catch(() => {
        // logOut();
        // setErrorMessage('AberMUD: FILE_ACCESS : Access failed');
    });

 split(block,nam1,nam2,work,luser)
 long *block;
 char *nam1;
 char *nam2;
 char *work;
 char *luser;
    {
    long wkblock[128],a;
    wkblock = block[2];
    work = block[64];
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

 loseme(name)
 char *name;
    {
extern long mynum;
extern long zapped;
char bk[128];
extern char globme[];
FILE *unit;
sig_aloff(); *//* No interruptions while you are busy dying */
			/* ABOUT 2 MINUTES OR SO *//*
i_setup=0;

unit=openworld();
    dumpitems();
if(pvis(mynum)<10000) {
sprintf(bk,"%s has departed from AberMUDII\n",globme);
sendsys(globme,globme,-10113,0,bk);
}
    pname(mynum)[0]=0;
    return closeworld()
        .then(() => {
            if(!zapped) saveme();
            chksnp();
    	});
}

long lasup=0;

 update(name)
 char *name;
    {
    FILE *unit;
    long xp;
    extern long lasup;
    xp = getState().talker.eventId - lasup;
    if(xp<0) xp= -xp;
    if(xp<10) goto noup;
    unit=openworld();
    setppos(mynum, getState().talker.eventId);
    lasup = getState().talker.eventId;
    noup:;
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
    return closeworld()
        .then(() => {
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

        });
    }
 */