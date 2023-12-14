import mockQueryDecorator, { MockQuery } from './mock';

export interface Person {
  level: number;
  name: string;
  score: number;
  sex: number;
  strength: number;
};

interface PersonRequestParams {
  name: string,
}

// GetPerson

type GetPersonRequest = MockQuery<PersonRequestParams, any>;

interface GetPersonResponse {
  person: Person | null,
}

// PostPerson

interface PostPersonRequestData {
  sex?: string,
}

type PostPersonRequest = MockQuery<PersonRequestParams, PostPersonRequestData>;

// Storage

interface PersonStorage {
  [name: string]: Person;
}

const stored: PersonStorage = {};

const getPerson = async (name: string) => {
  const person = stored[name.toLowerCase()];
  return person ? {...person} : null;
}

const setPerson = async (name: string, person: Person) => {
  stored[name.toLowerCase()] = {...person};

  return getPerson(name);
}

const loadPersons = async () => Object.values(stored).map((p) => ({...p}));

export const getPersonData = mockQueryDecorator<
GetPersonRequest,
GetPersonResponse
> ('POST http://127.0.0.1:4001/person/:name/', async (query): Promise<GetPersonResponse> => {
  const {
    params: {
      name,
    },
  } = query;
  const person = await getPerson(name);

  return {
    person,
  };
});

export const postPersonData = mockQueryDecorator<
  PostPersonRequest,
  GetPersonResponse
> ('POST http://127.0.0.1:4001/person/:name/', async (query): Promise<GetPersonResponse> => {
  const {
    data: {
      sex,
    },
    params: {
      name,
    },
  } = query;
  const person = await getPerson(name);

  if (person) {
    return {
      person,
    };  
  }

  const newPerson: Person = {
    name,
    level: 1,
    score: 0,
    sex: 0,
    strength: 40,
  };

  // pbfr();

  if (sex === 'm') {
    newPerson.sex = 0;
  } else if (sex === 'f') {
    newPerson.sex = 1;
  } else {
    throw new Error('M or F');
  }

  const saved = await setPerson(name, newPerson);

  return {
    person: saved,
  };
});

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
  await setPerson(globme, x);
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