import React, { ChangeEvent, useState } from 'react';
import { Input } from 'reactstrap';

interface GetkbdProps {
  maxLength: number;
  onChange: (value: string) => null;
}

const Getkbd = (props: GetkbdProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    props.onChange(newValue);
  };

  return <Input
    value={value}
    onChange={handleChange}
    maxLength={props.maxLength}
  />;
};

export default Getkbd;
