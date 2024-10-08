import storage from './storage';
import { MudData } from '../storage';
import { ServiceResponse } from '../types';
import { rte } from './events';
import { removePlayer } from './loseme';

interface EventData {
  receiverId?: string;
  senderId?: string;
  code?: number;
  channelId?: number;
  payload?: any;
};
 
interface Event {
  code: number;
  payload: any;
};

interface World {
  firstEventId: number;
  lastEventId: number;
  events: { [k: number]: Event };
};

const bprintfModule = {
  bprintf: async (bufferId: string, message: string) => null,
  chksnp: async () => null,
  makebfr: async () => '',
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
  
const magicModule = {
  randperc: () =>0,
};
 
const newuafModule = {
  getMyLev: () => 0,
  getMySco: () => 0,
  getMySex: () => 0,
  getMyStr: () => 0,
  initme: async () => ({}),
};
  
const ndebugModule = {
  getMaxu: () => 16,
};
  
 const objsysModule = {
  dumpitems: async (world: World | null) => null,
  fpbn: async (world: World | null, name: string) => -1,
};
      
const opensysModule = {
  openworld: async (): Promise<World | null> => ({
    firstEventId: 0,
    lastEventId: 0,
    events: [],
  }),
  closeworld: async (world: World | null) => null,
};

const parseModule = {
   sendsys: async (world: World, data: EventData) => null,
 };
 
 const supportModule = {
  pname: async (world: World | null, playerId: string) => '',
  pvis: async (world: World | null, playerId: string) => 0,
  setphelping: async (world: World | null, playerId: string, value: number) => null,
  setplev: async (world: World | null, playerId: string, value: number) => null,
  setploc: async (world: World | null, playerId: string, value: number) => null,
  setpname: async (world: World | null, playerId: string, value: string) => null,
  setppos: async (world: World | null, playerId: string, value: number) => null,
  setpsex: async (world: World | null, playerId: string, value: number) => null,
  setpsexall: async (world: World | null, playerId: string, value: number) => null,
  setpstr: async (world: World | null, playerId: string, value: number) => null,
  setpvis: async (world: World | null, playerId: string, value: number) => null,
  setpwpn: async (world: World | null, playerId: string, value: number) => null,
};
        
/* 
 long oddcat=0;
 long  talkfl=0;
 
 extern FILE * openlock();
 extern long my_str;
 extern long my_sex;
 extern long my_lev;
 extern FILE * openroom(); 
 extern FILE * openworld();
 extern char * pname();
 extern char * oname();
 extern long ppos();
 extern char key_buff[];
  
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
*/

/*  
 long gurum=0;
 long convflg=0;
  
 sendmsg(name)
  char *name;
     {
     extern long debug_mode;
     extern char *sysbuf;
     extern long moni;
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
     l:pbfr();
 if(tty==4) btmscr();
 strcpy(prmpt,"\r");
     if(pvis(talkerData.playerId)) strcat(prmpt,"(");
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
     if(pvis(talkerData.playerId)) strcat(prmpt,")");
     pbfr();
     if(pvis(talkerData.playerId)>9999) set_progname(0,"-csh");
     else
     sprintf(work,"   --}----- ABERMUD -----{--     Playing as %s",name);
     if(pvis(talkerData.playerId)==0) set_progname(0,work);
     sig_alon();
     key_input(prmpt,80);
     sig_aloff();
     strcpy(work,key_buff);
 if(tty==4) topscr();
 strcat(sysbuf,"\001l");
 strcat(sysbuf,work);
 strcat(sysbuf,"\n\001");

  const world = await opensysModule.openworld();
  await rte(world, data, false);
  await opensysModule.closeworld(world);

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
     nadj:if(talkerData.hasStarted) gamecom(work);
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
 if(ploc(fighting)!= talkerData.channelId) 
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
     extern char *echoback;
         unit=openworld();
     if (unit<0) {
       removePlayer("\nAberMUD: FILE_ACCESS : Access failed\n");}
     sec_read(unit,inpbk,0,64);
     number=2*inpbk[1]-inpbk[0];inpbk[1]++;
     sec_write(unit,block,number,128);
     sec_write(unit,inpbk,0,64);
     if (number>=199) cleanup(inpbk);
     if(number>=199) longwthr();
     }
     */

/*
 FILE *openlock(file,perm)
 char *file;
 char *perm;
     {
     FILE *unit;
     long ct;
     extern int errno;
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
         case ENOSPC:removePlayer("PANIC exit device full\n");
*/
/*
    	case ESTALE:;*/
/*

         case EHOSTDOWN:;
         case EHOSTUNREACH:removePlayer("PANIC exit access failure, NFS gone for a snooze");
     }
     return(unit);
     }
*/

const createPlayer = async (
  userId: string,
  world: any,
  name: string,
): Promise<void> => {
  if (!world) {
    throw new Error('Sorry AberMUD is currently unavailable');
  }

  const found = await objsysModule.fpbn(world, name);
  if (found !== -1) {
    throw new Error('You are already on the system - you may only be on once at a time');
  }

  const maxPlayerId = ndebugModule.getMaxu();
  const promises = [];
  for (let playerId = 0; playerId < maxPlayerId; playerId += 1) {
    promises.push(new Promise<number | null>(async (resolve) => {
      const playerName = await supportModule.pname(world, `${playerId}`);
      return resolve(playerName ? null : playerId);
    }));
  }
  const result = await Promise.all(promises);
  const numberId = result.find(i => i !== null);

  if (numberId === null) {
    throw new Error('Sorry AberMUD is full at the moment');
  }

  const id = `${numberId}`;
  const bufferId = await bprintfModule.makebfr();
  await Promise.all([
    supportModule.setpname(world, id, name),
    supportModule.setploc(world, id, 0),
    supportModule.setppos(world, id, -1),
    supportModule.setplev(world, id, 1),
    supportModule.setpvis(world, id, 0),
    supportModule.setpstr(world, id, -1),
    supportModule.setpwpn(world, id, -1),
    supportModule.setpsex(world, id, 0),
    storage.setData(userId, {
      bufferId,
      channelId: 0,
      eventId: -1,
      hasStarted: false,
      isActive: false,
      lastUpdate: 0,
      name,
      playerId: id,
      rdQd: false,
      worldId: '',   
    }),
  ]);
};

const specialCommands: { [k: string]: (data: MudData) => Promise<ServiceResponse> } = {
  'g': async (data: MudData) => {
    const talkerData = await storage.getData(data.userId);
    if (!talkerData) {
      return {};
    }

    await storage.setData(data.userId, {
      ...talkerData,
      channelId: -5,
      eventId: -1,
      hasStarted: true,
    });

    await newuafModule.initme();

    const world = await opensysModule.openworld();
    if (!world) {
      return {};
    }

    const playerId = talkerData.playerId;
    const visibility = (newuafModule.getMyLev() < 10000) ? 0 : 10000;
    await Promise.all([
      supportModule.setpstr(world, playerId, newuafModule.getMyStr()),
      supportModule.setplev(world, playerId, newuafModule.getMyLev()),
      supportModule.setpvis(world, playerId, visibility),
      supportModule.setpwpn(world, playerId, -1),
      supportModule.setpsexall(world, playerId, newuafModule.getMySex()),
      supportModule.setphelping(world, playerId, -1),
      parseModule.sendsys(world, {
        code: -10113,
        payload: `[s player=${playerId}][ ${talkerData.name}  has entered the game ]\n[/s]`,
      }),
    ]);

    const result = await rte(
      world,
      data,
      false,
    );

    const chance = magicModule.randperc();
    if (chance > 50) {
      // trapch(-5);
    } else {
      // talkerData.channelId= -183;
      // trapch(-183);
    }
    await parseModule.sendsys(world, {
      code: -10000,
      senderId: playerId,
      channelId: talkerData.channelId,
      payload: `[s player=${playerId}]${talkerData.name}  has entered the game\n[/s]`,
    })

    await opensysModule.closeworld(world);

    return result;
  },
};
     
const special = async (data: MudData, command: string, name: string) => {
  /*
     extern long moni;
     extern long my_str,my_lev,my_sco,my_sex;
     char xx[128];
     char xy[128];
     char us[32];
   */
  const bk = command.toLowerCase();
  if (bk[0] !== '.') {
    return 0;
  }
  const ch = bk[1];

  const handler = specialCommands[ch];
  if (!handler) {
    // printf("\nUnknown . option\n");
  } else {
    handler(data);
  }

  return 1;
};

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
  // await opensysModule.closeworld(null);

  const talkerData = await storage.getData(data.userId);

  if (!talkerData?.rdQd) {
    return await bprintfModule.pbfr(data, response);
  }

  try {
    const world = await opensysModule.openworld();
    const eventResult = await rte(world, data, false);
    await opensysModule.closeworld(world);

    await storage.setData(data.userId, {
      ...talkerData,
      rdQd: false,
    });

    return await bprintfModule.pbfr(data, {
      ...response,
      ...eventResult,
    });
  } catch (e) {
    return removePlayer(data, { code:0, message: `${e}` })(response);
  }
};
  
export const startTalker = async (
  data: MudData,
): Promise<ServiceResponse> => {
  const world = await opensysModule.openworld();

  try {
    await createPlayer(data.userId, world, data.name);
  } catch (e) {
    return removePlayer(data, { code:0, message: `${e}` })({});
  }

  await rte(world, data, false);

  await opensysModule.closeworld(world);

  await special(data, '.g', data.name);
  // talkerData.isActive = true;

  return afterTalker(data, {});
};

/*
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
 char bk2[256];
 long block[128];
 talkerData.rdQd = true;
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
     FILE *unit;
     extern long my_lev;
     if(my_lev>9) goto ndie;
     ndie:unit=openworld();
     setploc(talkerData.playerId,chan);
     lookin(chan);
     }
*/
 
 /*  
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
     FILE *un1,un2;
     char str[128];
     long xxx;
     extern long brmode;
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
                 removePlayer("bye bye.....\n");
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
         if(talkerData.hasStarted) lispeople();
     }
     bprintf("\n");
     onlook();
     }
  loodrv()
     {
     lookin(talkerData.channelId);
     }
  
 
 userwrap()
 {
 if(fpbns(talkerData.name)!= -1) {
   removePlayer();
   syslog("System Wrapup exorcised %s",talkerData.name);
}
 }
 
 fcloselock(file)
 FILE *file;
 {
     fflush(file);
     flock(fileno(file),LOCK_UN);
     fclose(file);
 }
     
 
 */
