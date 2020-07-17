import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Card,
  Button,
  Chip,
  Divider,
  FormControlLabel,
  Input,
  makeStyles
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const selectOptions = [
  {
    label: 'WATER',
    options: ['Saltwater', 'Freshwater']
  },
  {
    label: 'CATEGORY',
    options: ['SPS', 'LPS', 'Soft Corals', 'Plants', 'Fish']
  },
  {
    label: 'LOCATION',
    options: ['30 Miles', '50 Miles', '100 Miles', 'anywhere']
  }
];

interface FilterProps {
  className?: string;
  [x: string]: any;
}

const Filter: React.FC<FilterProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState(['SPS', 'LPS']);
  const [distanceToggle, setDistanceToggle] = useState(true);

  const handleInputChange = (event: any) => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = (event: any) => {
    event.persist();

    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips((prevChips) => [...prevChips, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = (chip: any) => {
    setChips((prevChips) => prevChips.filter((prevChip) => chip !== prevChip));
  };

  const handleMultiSelectChange = (value: string[]) => {
    setChips(value);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistanceToggle(event.target.checked);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Enter a keyword"
          value={inputValue}
        />
      </Box>
      <Divider />
      <Box p={2} display="flex" alignItems="center" flexWrap="wrap">
        {chips.map((chip) => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </Box>
      <Divider />
      <Box display="flex" alignItems="center" flexWrap="wrap" p={1}>
        {selectOptions.map((option) => (
          <MultiSelect
            key={option.label}
            label={option.label}
            onChange={handleMultiSelectChange}
            options={option.options}
            value={chips}
          />
        ))}
        <Box flexGrow={1} />

        <Button variant="text" color="primary">
          Search
        </Button>
      </Box>
    </Card>
  );
};

export default Filter;

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));
