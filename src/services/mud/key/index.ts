import storage from './storage';
import { ServiceResponse } from '../types';

const bprintfModule = {
  getPrDue: () => false,
  setPrDue: (value: boolean) => null,
};
	
export const keySetUp = async (sessionId: string) => {
  await storage.setData(sessionId, {
	input: '',
	isSet: true,
	mode: false,
	prompt: '',
  });
};

export const keySetBack = async (sessionId: string) => {
  await storage.setData(sessionId, {
	input: '',
	isSet: false,
	mode: false,
	prompt: '',
  });
};
  
  /*

char key_buff[256];
char pr_bf[32];
long key_mode= -1;

key_input(ppt,len_max)
char *ppt;
int len_max;
{
   char x;
   extern long pr_due;
   int len_cur=0;
   key_mode=0;
   strcpy(pr_bf,ppt);
   bprintf("%s",ppt);
   pbfr();
   pr_due=0;
   strcpy(key_buff,"");
   while(len_cur<len_max)
   {
   	x=getchar();
   	if(x=='\n')
   	{
   		printf("\n");
   		key_mode= -1;
    		return;
   	}
   	if(((x==8)||(x==127))&&(len_cur))
	{
		putchar(8);
		putchar(' ');
		putchar(8);
		len_cur--;
		key_buff[len_cur]=0;
		continue;
	}
	if(x<32) continue;
	if(x==127) continue;
	putchar(x);
	key_buff[len_cur++]=x;
	key_buff[len_cur]=0;
     }
}	

 */

export const injectKeysData = async (
  sessionId: string,
  response: ServiceResponse,
): Promise<ServiceResponse> => {
  if (response.error || !response.result) {
	return response;
  }

  const saved = await storage.getData(sessionId);

  const prDue = bprintfModule.getPrDue();
  bprintfModule.setPrDue(false);

  if (saved?.mode || !prDue) {
	return response;
  }

  return {
	...response,
	result: {
      ...response.result,
      prompt: saved?.prompt,
      input: saved?.input,	
	},
  };
};

