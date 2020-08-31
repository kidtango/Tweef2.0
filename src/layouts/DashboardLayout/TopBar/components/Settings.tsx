import React, { useState, useRef } from "react";
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Popover,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from "@material-ui/core";
import { capitalCase } from "change-case";
import { Settings as SettingsIcon } from "react-feather";
import { ITheme } from "theme";
import { useSettingsContext } from "contexts/SettingsContext";
import { THEMES } from "constants/themeConstants";

const Settings: React.FC = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const { settings, saveSettings } = useSettingsContext();
  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    direction: settings!.direction,
    responsiveFontSizes: settings!.responsiveFontSizes,
    theme: settings!.theme
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setValues({ ...values, [field]: value });
  };

  const handleSave = () => {
    saveSettings!(values);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Badge
          color="secondary"
          variant="dot"
          classes={{ badge: classes.badge }}
        >
          <IconButton color="inherit" onClick={handleOpen} ref={ref}>
            <SvgIcon fontSize="small">
              <SettingsIcon />
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
      <Popover
        classes={{ paper: classes.popover }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleClose}
      >
        <Typography variant="h4" color="textPrimary">
          Settings
        </Typography>
        <Box mt={2} px={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.direction === "rtl"}
                edge="start"
                name="direction"
                onChange={(event) =>
                  handleChange(
                    "direction",
                    event.target.checked ? "rtl" : "ltr"
                  )
                }
              />
            }
            label="RTL"
          />
        </Box>
        <Box mt={2} px={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.responsiveFontSizes}
                edge="start"
                name="direction"
                onChange={(event) =>
                  handleChange("responsiveFontSizes", event.target.checked)
                }
              />
            }
            label="Responsive font sizes"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            onChange={(event) => handleChange("theme", event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option key={theme} value={theme}>
                {capitalCase(theme)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Popover>
    </>
  );
};

const useStyles = makeStyles((theme: ITheme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5
  },
  popover: {
    width: 320,
    padding: theme.spacing(2)
  }
}));

export default Settings;
