import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import { TkAction, TkState, setISetup, setLocationId, setMessageId, setMode, setPlayer, setUpdate } from './tkSlice';
import { MainThunkAction} from "../main/actions";

// Types
type Dispatch<A extends Action> = ThunkDispatch<TkState, any, A>;
export type TkThunkAction<A extends Action> = ThunkAction<any, TkState, any, A>;

// TODO: Remove actions
interface Message {
  // 0
  code: number,
  text: string,
}

const bprintf = (text: string) => () => Promise.resolve();
const closeworld = () => Promise.resolve();
const chksnp = () => Promise.resolve();
const dumpitems = () => Promise.resolve();
const eorte = () => Promise.resolve();
const fpbn = (name: string) => () => Promise.resolve(-1);
const fclose = (unit: any) => () => Promise.resolve();
const gamrcv = (message: Message) => () => Promise.resolve();
const getstr = (unit: any) => () => Promise.resolve(['a', 'b', 'c']);
const initme = () => Promise.resolve();
const isdark = () => Promise.resolve(false);
const lisobs = () => Promise.resolve();
const lispeople = () => Promise.resolve();
const lodex = (unit: any) => () => Promise.resolve();
const makebfr = () => Promise.resolve();
const onlook = () => Promise.resolve();
const openroom = (room: number, mode: string) => () => Promise.resolve();
const openworld = () => Promise.resolve();
const pbfr = () => Promise.resolve();
const pname = (userId: number) => () => Promise.resolve('Name');
const pvis = (userId: number) => () => Promise.resolve(1);
const randperc = () => Promise.resolve(1);
const saveme = () => Promise.resolve(1);
const secRead = (world: any, recordId: number, maxLength: number) => () => Promise.resolve({});
const sendsys = (
    playerFrom: string | undefined,
    playerTo: string | undefined,
    code: number,
    locationId: number,
    text: string,
) => () => Promise.resolve({});
const setDes = (value: number) => () => Promise.resolve(); // rdes=0;tdes=0;vdes=0;
const setphelping = (userId: number, value: number) => () => Promise.resolve();
const setplev = (userId: number, value: number) => () => Promise.resolve();
const setploc = (userId: number, value: number) => () => Promise.resolve();
const setpname = (userId: number, value: string) => () => Promise.resolve();
const setppos = (userId: number, value: number) => () => Promise.resolve();
const setpsex = (userId: number, value: number) => () => Promise.resolve();
const setpsexall = (userId: number, value: number) => () => Promise.resolve();
const setpstr = (userId: number, value: number) => () => Promise.resolve();
const setpvis = (userId: number, value: number) => () => Promise.resolve();
const setpwpn = (userId: number, value: number) => () => Promise.resolve();
const showname = (room: number) => () => Promise.resolve();

const setAilBlind = (value: boolean) => () => Promise.resolve();
const setBrmode = (value: boolean) => () => Promise.resolve();

/*
 * AberMUD II   C
 *
 * This game systems, its code scenario and design
 * are (C) 1987/88  Alan Cox,Jim Finnis,Richard Acott
 *
 * This file holds the basic communications routines
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

// sysctrl
const processMessage = (message: Message) => (message.code < -3)
    ? gamrcv(message)
    : bprintf(message.text);

// mstoout
/* Print appropriate stuff from data block */
const outputMessage = (message: Message): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => (getState().debugMode
        ? dispatch(bprintf(`\n${message.code}`))
        : Promise.resolve()
    )
    .then(() => dispatch(processMessage(message)));

const sendmsg = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => {
    const prompts = ['>', '"', '*'];
    /*
    return dispatch(pbfr)
        // Bottom
        .then(() => Promise.resolve(prompts[getState().convflg] || '?')
            .then((prmpt: string) => getState().debugMode ? `#${prmpt}` : prmpt)
            .then((prmpt: string) => (getState().myLev > 9) ? `----${prmpt}` : prmpt)
            .then((prmpt: string) => dispatch(pvis(getState().playerId))
                .then((visible: number) => visible ? `(${prmpt})` : prmpt)
            )
            .then((prmpt: string) => `\r${prmpt}`)
        )
        .then((prmpt: string) => dispatch(pbfr)
            .then(() => dispatch(pvis(getState().playerId)))
            .then((visible: number) => {
                if (!visible) {
                    return dispatch(setProgname(`   --}----- ABERMUD -----{--     Playing as ${name}`))
                } else if (visible > 9999) {
                    return dispatch(setProgname('-csh'))
                }
            })
            .then(() => dispatch(setTimerAlarm(true)))
            .then(() => dispatch(keyInput(prmpt, 80)))
            .then(() => dispatch(setTimerAlarm(true)))
            .then(() => keyBuff)
        )
        // Top
        .then((work: string) => dispatch(bprintf(`[l]${work}[/l]`))
            .then(() => dispatch(openworld))
            .then(() => dispatch(readMessages(name)))
            .then(() => dispatch(closeworld))
            .then(() => {
                if (getState().convflg && work == '**') {
                    return dispatch(setConvflg).then(() => sendmsg(name));
                } else {
                    const result = (work.length > 1 && work[0] == '*')
                        ? Promise.resolve(work.substr(1))
                        : getState().convflg
                            ? Promise.resolve(getState().convflg === 1 ? `say ${work}` : `tss ${work}`)
                            : Promise.resolve(work)
                    return result
                        .then((w2) => {
                            const action = (getState().mode === 1)
                                ? dispatch(gamecom(w2))
                                : (w2 && w2.toLowerCase() !== '.q')
                                    ? dispatch(special(w2))
                                    : Promise.resolve(null);
                            return action
                                .then(() => (getState().fighting >= 0) && dispatch(pname(getState().fighting))
                                    .then((name: string) => name && Promise.all([
                                        dispatch(setInFight(0)),
                                        dispatch(setFighting(-1)),
                                    ])
                                    .then(() => dispatch(ploc(getState().fighting))))
                                    .then((location: number) => (location !== getState().locationId) && Promise.all([
                                        dispatch(setInFight(0)),
                                        dispatch(setFighting(-1)),
                                    ]))
                                )
                                .then(() => getState().inFight && dispatch(setInFight(getState().inFight - 1)))
                                .then(() => w2.toLowerCase() === '.q');
                        });
                }
            })
        )
     */
};

export const send2 = (block: Message): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(openworld)
    .then((unit: any) => dispatch(secRead(unit, 0, 64))
        .then((inpbk: any) => inpbk as number[])
        .then((inpbk: number[]) => {
            const n = 2 * inpbk[1] - inpbk[0];
            inpbk[1]++;
            /*
            return Promise.all([
                dispatch(secWrite(unit, block, n, 128)),
                dispatch(secWrite(unit, inpbk, 0, 64)),
            ])
                .then(() => (n >= 199) ? dispatch(cleanup(inpbk)) : Promise.resolve())
                .then(() => (n >= 199) ? dispatch(longwthr) : Promise.resolve());
             */

        })
    );

// findfirst
const getFirstMessageId = (world: any): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(secRead(world, 0, 1))
    .then((block: any) => block as number[])
    .then((block: number[]) => block[0]);

// findlast
const getLastMessageId = (world: any): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(secRead(world, 0, 2))
    .then((block: any) => block as number[])
    .then((block: number[]) => block[1]);

// update
export const update = (): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => (Math.abs(getState().messageId - getState().updated) >= 10) && dispatch(openworld)
    .then(() => dispatch(setppos(getState().playerId, getState().messageId)))
    .then(() => dispatch(setUpdate()));

// readmsg
const readMessage = (world: any, messageId: number): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(getFirstMessageId(world))
    .then((firstMessageId: number) => messageId * 2 - firstMessageId)
    .then((actualId: number) => dispatch(secRead(world, actualId, 128)))
    .then((block: any) => block as Message);

// rte
export const readMessages = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(openworld)
    .then((world: any) => dispatch(getLastMessageId(world))
        .then((lastMessageId: number) => {
            const currentMessageId = getState().messageId;
            const firstMessageId = currentMessageId == -1 ? lastMessageId : currentMessageId;

            const promises = [];
            for (let messageId = firstMessageId; messageId < lastMessageId; messageId++) {
                promises.push(dispatch(readMessage(world, messageId))
                    .then((message: Message) => dispatch(outputMessage(message)))
                    .then(() => dispatch(setMessageId({ messageId }))));
            }
            return Promise.all(promises);
        })
    )
    .then(() => dispatch(update()))
    .then(() => dispatch(eorte))
    .then(() => dispatch(setDes(0)));

export const openlock = (): MainThunkAction<TkAction> => (
  dispatch: any, //Dispatch<TkAction>,
) => {
    /*
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
     */
};

// putmeon
const addPlayer = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(openworld)
    .then(() => dispatch(fpbn(name)))
    .then((player: number) => {
        if (player !== -1)
            throw Error('You are already on the system - you may only be on once at a time');
    })
    .then(() => {
        const promises = [];
        for(let playerId: number = 0; playerId < getState().maxu; playerId++) {
            promises.push(dispatch(pname(playerId)).then((name: string) => !name ? playerId : -1));
        }
        return Promise.all(promises).then((empty: number[]) => empty.filter((i: number) => i >= 0));
    })
    .then((empty: number[]) => {
        if (!empty)
            throw Error('Sorry AberMUD is full at the moment');
        return empty[0];
    })
    .then((playerId: number) => Promise.all([
        dispatch(setpname(playerId, name)),
        dispatch(setploc(playerId, getState().locationId)),
        dispatch(setppos(playerId, -1)),
        dispatch(setplev(playerId, 1)),
        dispatch(setpvis(playerId, 0)),
        dispatch(setpstr(playerId, -1)),
        dispatch(setpwpn(playerId, -1)),
        dispatch(setpsex(playerId, 0)),
        dispatch(setPlayer({ playerId, name })),
    ]).then(() => playerId));

// loseme
/*
 * No interruptions while you are busy dying
 * ABOUT 2 MINUTES OR SO
 */
const sigAloff = () => Promise.resolve();

export const loose = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(sigAloff)
    .then(() => dispatch(setISetup({ iSetup: false })))
    .then(() => dispatch(openworld))
    .then(() => dispatch(dumpitems))
    .then(() => dispatch(pvis(getState().playerId)))
    .then((visible: number) => (visible < 10000)
        ? dispatch(sendsys(
            getState().name,
            getState().name,
            -10113,
            0,
            `${name} has departed from AberMUDII\\n`,
        ))
            .then(() => {})
        : Promise.resolve()
    )
    .then(() => dispatch(setpname(getState().playerId, '')))
    .then(() => dispatch(closeworld))
    .then(() => (!getState().zapped)
        ? dispatch(saveme)
            .then(() => {})
        : Promise.resolve()
    )
    .then(() => dispatch(chksnp));

const afterLookRoom = (unit: any): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(fclose(unit))
    .then(() => dispatch(openworld))
    .then(() => getState().ailBlind
        ? dispatch(lisobs).then(() => (getState().mode == 1) ? dispatch(lispeople) : Promise.resolve())
        : Promise.resolve()
    )
    .then(() => dispatch(bprintf('\n')))
    .then(() => dispatch(onlook));

const onRoomFile = (unit: any, xxx: boolean = false): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(lodex(unit))
    .then(() => dispatch(isdark))
    .then((dark: boolean) => dark
        ? dispatch(bprintf('It is dark\n'))
            .then(() => dispatch(openworld))
            .then(() => dispatch(onlook))
        : dispatch(getstr(unit))
            .then((content: string[]) => {
                let brief: boolean = xxx;
                let dead: boolean = false;
                const result = content.map((s: string) => {
                    if (s === '#DIE') {
                        dispatch(setAilBlind(false)).then(() => {});
                        if (getState().myLev > 9) {
                            return '<DEATH ROOM>';
                        }
                        dead = true;
                        return null;
                    } else if (s === '#NOBR') {
                        dispatch(setBrmode(false)).then(() => {});
                        return null;
                    } else if (!getState().ailBlind && !brief) {
                        return s;
                    } else {
                        brief = getState().brmode;
                        return null;
                    }
                });
                return Promise.all(
                    result
                        .filter((s: string | null) => s !== null)
                        .map((s: string | null) => s as string)
                        .map((s: string) => dispatch(bprintf(s)))
                )
                    .then(() => dead && dispatch(loose(getState().name as string)).then(() => {
                        throw Error('bye bye.....\\n');
                    }));
            })
    );

// lookin
export const lookRoom = (room: number): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(closeworld)
    .then(() => getState().ailBlind
        ? dispatch(bprintf('You are blind... you can\'t see a thing!\n'))
        : Promise.resolve())
    .then(() => (getState().myLev > 9)
        ? dispatch(showname(room))
        : Promise.resolve())
    .then(() => dispatch(openroom(room, 'r')))
    .then((unit: any) => dispatch(unit
        ? onRoomFile(unit)
        : bprintf(`\nYou are on channel ${room}\n`)
    ).then(() => dispatch(afterLookRoom(unit))));

// trapch
export const changeLocation = (locationId: number): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => dispatch(openworld)
    .then(() => dispatch(setploc(getState().playerId, locationId)))
    .then(() => dispatch(lookRoom(locationId)));

export const special = (command: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => {
    if (command.length < 2 || command[0] !== '.') return false;
    const code = command.toLowerCase()[1];
    if (code == 'g') {
        const {
            playerId,
            name = '',
        } = getState();
        return dispatch(initme)
            .then(() => dispatch(openworld))
            .then(() => Promise.all([
                dispatch(setpstr(playerId, getState().myStr)),
                dispatch(setplev(playerId, getState().myLev)),
                dispatch(setpvis(playerId, (getState().myLev < 10000) ? 0 : 10000)),
                dispatch(setpwpn(playerId, -1)),
                dispatch(setpsexall(playerId, getState().mySex)),
                dispatch(setphelping(playerId,-1)),

            ]))
            .then(() => dispatch(setMode({ mode: 1 })))
            .then(() => dispatch(randperc))
            .then((result: number) => dispatch(setLocationId({ locationId: (result > 50) ? -5 : -183 })))
            .then(() => dispatch(sendsys(
                name,
                name,
                -10113,
                getState().locationId,
                `[s name="${name}"][${name}  has entered the game ]\n[/s]`,
            )))
            .then(() => dispatch(readMessages(name)))
            .then(() => dispatch(changeLocation(getState().locationId)))
            .then(() => dispatch(sendsys(
                name,
                name,
                -10113,
                getState().locationId,
                `[s name="${name}"]${name}  has entered the game\n[/s]`,
            )))
            .then(() => true);
    } else {
        throw Error('Unknown . option')
    }
};

// talker
export const startWalk = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => Promise.resolve(dispatch(makebfr))
    .then(() => dispatch(addPlayer(name)))
    .then(() => dispatch(openworld))
    .then(() => dispatch(readMessages(name)))
    .then(() => dispatch(closeworld))
    .then(() => dispatch(setMessageId({ messageId: -1 })))
    .then(() => dispatch(special('.g')))
    .then(() => dispatch(setISetup({ iSetup: true })));

const startTurn = (): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(pbfr);

const endTurn = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
    getState: () => TkState,
) => Promise.resolve(getState().rdQd && dispatch(readMessages(name)))
    // .then(() => dispatch(setRdQd(false)))
    .then(() => dispatch(closeworld))
    .then(() => dispatch(pbfr));

export const nextTurn = (name: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(startTurn())
    .then(() => dispatch(sendmsg(name)))
    .then(() => dispatch(endTurn(name)));

export const cleanup = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
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
     */
};

export const broad = (message: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => Promise.all([
    // dispatch(setRdQd(1)),
    dispatch(send2({
        code: -1,
        text: message.substr(0, 126),
    })),
]);

export const tbroad = (message: string): TkThunkAction<TkAction> => (
    dispatch: Dispatch<TkAction>,
) => dispatch(broad(message));

export const split = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
    /*
split(block,nam1,nam2,work,luser)
long *block;
char *nam1;
char *nam2;
char *work;
char *luser;
{
    long wkblock[128],a;
    wkblock = block.substr(2, 126);
    a=scan(nam1,(char *)wkblock,0,"",".");
    scan(nam2,(char *)wkblock,a+1,"",".");
    if((strncmp(nam1,"The ",4)==0)||(strncmp(nam1,"the ",4)==0))
    {
        if(!strcmp(lowercase(nam1+4),lowercase(luser))) return(1);
    }
    return(!strcmp(lowercase(nam1),lowercase(luser)));
}
     */
};

export const revise = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
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
     */
};

export const loodrv = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
    /*
loodrv()
{
    extern long curch;
    lookin(curch);
}
     */
};

export const userwrap = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
    /*
userwrap()
{
    extern char globme[];
    extern long iamon;
    if(fpbns(globme)!= -1) {loseme();syslog("System Wrapup exorcised %s",globme);}
}
     */
};

export const fcloselock = (): MainThunkAction<TkAction> => (
  // dispatch: Dispatch<TkAction>,
) => {
    /*
fcloselock(file)
FILE *file;
{
    fflush(file);
    flock(fileno(file),LOCK_UN);
    fclose(file);
}
     */
};
