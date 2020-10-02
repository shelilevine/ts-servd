import React from 'react';
import { FormControl, Input, FormHelperText } from '@material-ui/core';
import CSS from 'csstype';

interface Styles {
  searchContainer: CSS.Properties
  helperText: CSS.Properties
}

const styles: Styles = {
  searchContainer: {
    backgroundColor: 'white',
    padding: '5px 10px',
    paddingTop: '10px',
    borderRadius: '10px',
    fontStyle: 'italic',
    width: '290px',
  },
  helperText: {
    textAlign: 'center',
  },
};

type Props = {
  onSubmit: React.FormEventHandler,
  ingredient: string,
  onChange: React.ChangeEventHandler
}

export default function Search({onSubmit, ingredient, onChange} : Props): JSX.Element {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormControl style={styles.searchContainer}>
        <Input
          name="ingredient"
          type="string"
          value={ingredient}
          onChange={onChange}
        />
        <FormHelperText id="my-helper-text" style={styles.helperText}>
          Enter your ingredients
        </FormHelperText>
      </FormControl>
    </form>
  );
}
