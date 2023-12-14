import React, {
  ChangeEvent,
  useCallback,
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
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Modal,
} from 'reactstrap';
  
export interface CreateCharacterData {
  sex: string;
}
    
interface CreateCharacterModalProps {
  isOpen?: boolean,
  onClose?: (data: CreateCharacterData) => void,
}
  
const CreateCharacterModal = (props: CreateCharacterModalProps) => {
  const {
    isOpen,
    onClose,
  } = props;
  
  const [sex, setSex] = useState('');
  const [sexError, setSexError] = useState<string | null>(null);
  
  const validateSex = (value: string) => {
    let error = null;
    if (['m', 'f'].indexOf(value) < 0) {
      error = 'M or F';
    }

    setSexError(error);
    return error;
  };
  
  const handleChangeSex = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSex(value);
    validateSex(value);
  }, []);

  const handleSubmit = useCallback(() => {
    const error = validateSex(sex);
    if (error !== null) {
      return;
    }

    if (onClose instanceof Function) {
      onClose({
        sex,
      });
    }
  }, [
    sex,
    onClose,
  ]);
  
  return <Modal
    isOpen={isOpen}
  >
    <Card>
      <CardHeader>
        <CardTitle>Creating character&hellip;</CardTitle>
      </CardHeader>
      <Container className="my-2">
        <Form>
          <FormGroup className="position-relative"> 
            <Label
              for="sex"
            >
              Sex (M/F):
            </Label>
            <FormGroup check> 
              <Input
                name="sex"
                type="radio"
                value="m"
                checked={sex === 'm'}
                onChange={handleChangeSex}
              />
              <Label check>
                Male
              </Label>
            </FormGroup>
            <FormGroup check> 
              <Input
                name="sex"
                type="radio"
                value="f"
                checked={sex === 'f'}
                onChange={handleChangeSex}
              />
              <Label check>
                Female
              </Label>
            </FormGroup>
            <InputGroup> 
              <Input
                hidden
                name="sex"
                invalid={!!sexError}
              />
              { sexError && (
                <FormFeedback>
                  { sexError}
                </FormFeedback>
              ) }
            </InputGroup>
          </FormGroup>
        </Form>
      </Container>
      <CardFooter>
        <Button
          disabled={!!sexError}
          onClick={handleSubmit}
        >
          Ok
        </Button>
      </CardFooter>
    </Card>
  </Modal>;
};
  
export default CreateCharacterModal;
  