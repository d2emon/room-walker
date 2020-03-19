import {Action} from 'redux';
import * as types from './actionTypes';
import {ActionMode, ConversationMode} from './modes';

// Interfaces
interface SetUser extends Action {
    type: types.SET_USER,
    characterId: number,
    name: string,
    title?: string,
}

interface UpdateTitle extends Action {
    type: types.UPDATE_TITLE,
}

interface SetLoggedIn extends Action {
    type: types.SET_LOGGED_IN,
}

interface SetLoggedOut extends Action {
    type: types.SET_LOGGED_OUT,
}

interface SetConversationMode extends Action {
    type: types.SET_CONVERSATION_MODE,
    conversationMode: ConversationMode,
}

// Types
export type TalkerAction = SetUser | UpdateTitle | SetLoggedIn | SetLoggedOut | SetConversationMode;

export const setUser = (characterId: number, name: string, title: string): SetUser => ({
    type: types.SET_USER,
    characterId,
    name,
    title,
});

export const updateTitle = (): UpdateTitle => ({
    type: types.UPDATE_TITLE,
});

export const setLoggedIn = (): SetLoggedIn => ({
    type: types.SET_LOGGED_IN,
});

export const setLoggedOut = (): SetLoggedOut => ({
    type: types.SET_LOGGED_OUT,
});

export const setConversationMode = (conversationMode: ConversationMode): SetConversationMode => ({
    type: types.SET_CONVERSATION_MODE,
    conversationMode,
});

/*
const trapch = (channelId: number) => openworld()
    .then(() => {
        setChannelId(channelId);
        setplocation(userId, channelId);
        return channelId;
    })
    .then(lookIn)
*/

/*
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
                    if (getState().talker.actionMode === MODE_ACTION) {
                        lispeople();
                    }
                }
                bprintf("\n");
                onlook();

        });
    }
 */
