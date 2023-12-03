import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
} from 'reactstrap';

export interface StartingData {
  userId: string;
  name: string;
  title: string;
}
  
interface NoArgsModalProps {
  isOpen?: boolean,
  onClose?: () => void,
}
    
interface StartModalProps {
  show?: boolean,
  onClose?: (data: StartingData) => void,
}

const NoArgsModal = (props: NoArgsModalProps) => {
  const {
    isOpen,
    onClose,
  } = props;
  return (
    <Modal
      isOpen={isOpen}
    >
      <Card>
        <CardHeader>
            <CardTitle>Args!</CardTitle>
        </CardHeader>
        <CardFooter>
            <Button
            onClick={onClose}
            >
            Ok
            </Button>
        </CardFooter>
      </Card>
    </Modal>    
  );
};

const StartModal = (props: StartModalProps) => {
  const {
    show,
    onClose,
  } = props;

  const [userId, setUserId] = useState('USERID');
  const [title, setTitle] = useState('Room Walker');
  const [name, setName] = useState('Phantom');

  const [isNoArgsError, setIsNoArgsError] = useState(false);

  const handleChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleChangeUserId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  }, []);

  const handleCloseError = useCallback(() => {
    setIsNoArgsError(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!title || !name) {
      setIsNoArgsError(true);
      return;
    }
  
    if (onClose instanceof Function) {
      onClose({
        userId,
        name: (name === 'Phantom') ? `The ${name}` : name,
        title,
      });
    }
  }, [
    name,
    title,
    userId,
    onClose,
  ]);

  useEffect(() => {

/* 
char *getkbd(s,l)   *//* Getstr() with length limit and filter ctrl *//*
 char *s;
 int l;
    {
    char c,f,n;
    f=0;c=0;
    while(c<l)
       {
       regec:n=getchar();
       if ((n<' ')&&(n!='\n')) goto regec;
       if (n=='\n') {s[c]=0;f=1;c=l-1;}
       else
          s[c]=n;
       c++;
       }
    if (f==0) {s[c]=0;while(getchar()!='\n');}
    return(s);
    }
*/

/* 
set_progname(n,text)
char *text;
{
	*//*
	int x=0;
	int y=strlen(argv_p[n])+strlen(argv_p[1]);  
	y++;
	if(strcmp(argv_p[n],text)==0) return;
	
	while(x<y)
	   argv_p[n][x++]=0; 
	strcpy(argv_p[n],text);
	*//*
}


    */
  }, []);

  return <Modal
    isOpen={show}
  >
    <NoArgsModal
      isOpen={isNoArgsError}
      onClose={handleCloseError}
    />

    <Card>
      <CardHeader>
        <CardTitle>Entering Room Walker&hellip;</CardTitle>
      </CardHeader>
      <Container className="my-2">
        <Form>
          <FormGroup>
            <Label
              for="userId"
            >
              User Id:
            </Label>
            <Input
              id="userId"
              name="userId"
              value={userId}
              onChange={handleChangeUserId}
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="title"
            >
              Application:
            </Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={handleChangeTitle}
            />
          </FormGroup>
          <FormGroup>
            <Label
              for="name"
            >
              Name:
            </Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </FormGroup>
        </Form>
      </Container>
      <CardFooter>
        <Button
          onClick={handleSubmit}
        >
          Ok
        </Button>
      </CardFooter>
    </Card>
  </Modal>;
};

export default StartModal;
