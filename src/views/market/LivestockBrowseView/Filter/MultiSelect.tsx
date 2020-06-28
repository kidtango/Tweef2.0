import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: any) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange
}) => {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  const handleOptionToggle = (event: any) => {
    if (label !== 'LOCATION') {
      let newValue = [...value];

      if (event.target.checked) {
        newValue.push(event.target.value);
      } else {
        newValue = newValue.filter((item) => item !== event.target.value);
      }

      if (onChange) {
        onChange(newValue);
      }
    } else {
      let newValue = [...value];

      if (event.target.checked) {
        newValue.push(event.target.value);
      } else {
        newValue = newValue.filter((item) => item !== event.target.value);
      }

      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <>
      <Button onClick={handleMenuOpen} ref={anchorRef}>
        {label}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem className={classes.menuItem} key={option}>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={value.indexOf(option) > -1}
                  onClick={handleOptionToggle}
                  value={option}
                />
              }
              label={option}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MultiSelect;

const useStyles = makeStyles((theme) => ({
  root: {},
  menuItem: {
    padding: 0
  },
  formControlLabel: {
    padding: theme.spacing(0.5, 2),
    width: '100%',
    margin: 0
  }
}));
