import {
  User,
} from './types';

export interface Person {
  level: number;
  name: string;
  score: number;
  sex: number;
  strength: number;
};

interface GetPersonResponse {
  data: {
    person: Person | null,
  };
}

interface PersonStorage {
  [name: string]: Person;
}

const stored: PersonStorage = {};

const getPerson = async (name: string) => {
  const person = stored[name.toLowerCase()];
  return person ? {...person} : null;
}

const setPerson = async (name: string, person: Person) => {
  stored[name] = person;
}

const loadPersons = async () => Object.values(stored).map((p) => ({...p}));

const initPerson = async (user: User) => {
  // PERSONA x;
  // char s[32];
  // extern char globme[];

  const person = await getPerson(user.name);
  if (person) {
    return person;
  }

  /*
  const messages = [
    'Creating character....\n',
    '\n',
    'Sex (M/F) : ',
  ];
  */

  const my = {
    level: 1,
    score: 0,
    sex: 0,
    strength: 40,
  };

  // moan1:
  // pbfr();

  // keysetback();
  const s = '';
  // getkbd(s,2);
  // lowercase(s);
  // keysetup();

  /*
	switch(s[0])
	{
		case 'm':my_sex=0;
		break;
		case 'f':my_sex=1;
		break;
		default:bprintf("M or F");
		goto moan1;
	}
  */

  /*
  const x = {
    level: my.level,
    name: '', // globme
    score: my.score,
    sex: my.sex,
    strength: my.strength,
  };
  */

  // putpers(globme,&x);

  return my;
}
/*
initme()
{
	if(errno!=0) crapup("Panic: Timeout event on user file\n");
	x.p_score=0;
	bprintf("Creating character....\n");
	my_sco=0;
	my_str=40;
	my_lev=1;
	moan1:bprintf("\nSex (M/F) : ");
	pbfr();
	keysetback();
	getkbd(s,2);
	keysetup();
	lowercase(s);
	switch(s[0])
	{
		case 'm':my_sex=0;
		break;
		case 'f':my_sex=1;
		break;
		default:bprintf("M or F");
		goto moan1;
	}
	strcpy(x.p_name,globme);
	x.p_strength=my_str;
	x.p_level=my_lev;
	x.p_sex=my_sex;
	x.p_score=my_sco;
	putpers(globme,&x);
}

*/

export const getPersonData = async (name: string): Promise<GetPersonResponse> => {
  const person = await getPerson(name);

  return {
    data: {
      person,
    },
  };
};

/*
extern FILE *openlock();
extern char *oname();
extern char *pname();

extern char globme[];



delpers(name)
char *name;
{
	FILE *i;
	PERSONA x;
l1:	i=(FILE *)getPerson(name);
	if(i==(FILE *)-1) return;
	lowercase(name);
	lowercase(x.p_name);
	if(strcmp(x.p_name,name)) 
	       crapup("Panic: Invalid Persona Delete");
	strcpy(x.p_name,"");
	x.p_level= -1;
	fwrite(&x,sizeof(PERSONA),1,i);
	fcloselock(i);
	goto l1;
}



putpers(name,pers)
char *name;
PERSONA *pers;
{
	FILE *i;
	unsigned long flen;
	PERSONA s;
	i=(FILE *)getPerson(name);
	if(i==(FILE *)-1)
	{
		flen= -1;
		i=(FILE *)getPerson(name);
		if(i!=(FILE *)-1) goto fiok;
		// i=openuaf("a");
		flen=ftell(i);
        fiok: 	if(fwrite(pers,sizeof(PERSONA),1,i)!=1)
		{
			bprintf("Save Failed - Device Full ?\n");
			if(flen!=-1)ftruncate(fileno(i),flen);
			fcloselock(i);
			return;
		}
		fcloselock(i);
		return;
	}
	fwrite(pers,sizeof(PERSONA),1,i);
	fcloselock(i);
}

long my_sco;
long my_lev;
long my_str;
long my_sex;


saveme()
{
	extern char globme[];
	extern long zapped;
	PERSONA x;
	extern int mynum;
	strcpy(x.p_name,globme);
	x.p_strength=my_str;
	x.p_level=my_lev;
	x.p_sex=psexall(mynum);
	x.p_score=my_sco;
	if(zapped) return;
	bprintf("\nSaving %s\n",globme);
	putpers(globme,&x);
}

 validname(name)
 char *name;
    {
    long a;
    if(resword(name)){bprintf("Sorry I cant call you that\n");return(0);  }
    if(strlen(name)>10)
       {
       return(0);
       }
    a=0;
    while(name[a])
       {
       if(name[a]==' ')
          {
          return(0);
          }
       a++;
       }
    if(fobn(name)!=-1)
       {
      bprintf("I can't call you that , It would be confused with an object\n");
       return(0);
       }
    return(1);
    }
 
resword(name)
{
if(!strcmp(name,"The")) return(1);
if(!strcmp(name,"Me")) return(1);
if(!strcmp(name,"Myself")) return(1);
if(!strcmp(name,"It")) return(1);
if(!strcmp(name,"Them")) return(1);
if(!strcmp(name,"Him")) return(1);
if(!strcmp(name,"Her")) return(1);
if(!strcmp(name,"Someone")) return(1);
return(0);
}
*/