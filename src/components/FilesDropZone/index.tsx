import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import bytesToSize from './bytesToSize';
import { useSnackbar } from 'notistack';
import { Trash as TrashIcon } from 'react-feather';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearAllIcon from '@material-ui/icons/ClearAll';

// interface DropZoneFile extends File {}

interface FilesDropZoneProps {
  className?: any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  [x: string]: any;
}

const FilesDropZone: React.FC<FilesDropZoneProps> = ({
  className,
  setFieldValue,
  images,
  ...rest
}) => {
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isNewFile, setIsNewFile] = useState<boolean>();

  useEffect(() => {
    if (files.length > images.length) {
      setIsNewFile(true);
    } else {
      setIsNewFile(false);
    }
  }, [files, images]);

  const handleDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => {
    setFiles([]);
    setFieldValue('images', []);
  };

  const handleRemove = (targetIndex: number) => {
    const newFiles = files.filter(
      (file, currentIndex) => currentIndex !== targetIndex
    );

    setFiles(newFiles);

    setFieldValue('images', newFiles);
  };

  const handleUpload = () => {
    setFieldValue('images', files);
    enqueueSnackbar('Images uploaded', { variant: 'success' });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <img
            alt="Select file"
            className={classes.image}
            src="/static/images/undraw_add_file2_gvbb.svg"
          />
        </div>
        <div>
          <Typography gutterBottom variant="h3">
            Select files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="Remove this image">
                    <IconButton edge="end" onClick={() => handleRemove(i)}>
                      <TrashIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Tooltip title="Clear all">
              <Button onClick={handleRemoveAll} size="small">
                <ClearAllIcon /> Clear All
              </Button>
            </Tooltip>
            <Tooltip title="Upload new files">
              <Button
                color="secondary"
                size="small"
                variant="contained"
                onClick={handleUpload}
                disabled={!isNewFile}
              >
                <CloudUploadIcon />
              </Button>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: { backgroundColor: theme.palette.action.active, opacity: 0.5 },
  image: { width: 130 },
  list: { maxHeight: 320 },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': { marginLeft: theme.spacing(2) }
  }
}));

export default FilesDropZone;
