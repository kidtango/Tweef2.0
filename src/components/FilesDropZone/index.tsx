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
  makeStyles,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import bytesToSize from './bytesToSize';
import { useSnackbar } from 'notistack';
import { Trash as TrashIcon } from 'react-feather';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import useUploadImages from 'operations/mutations/uploadImage/useUploadImage';

interface FilesDropZoneProps {
  className?: any;
  images: string[];
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

  // Custom hook that returns an axios request to Cloudinary API for uploading images
  const [uploadImages, { data, error, status }] = useUploadImages();

  useEffect(() => {
    if (status === 'success') {
      setFieldValue('images', [...images, data!.secure_url]);
      enqueueSnackbar('Image uploaded', { variant: 'success' });

      // Reset files
      setFiles([]);
    }
  }, [data]);

  const handleDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
  }, []);

  const handleRemoveAll = () => {
    // Reset all states for imageUrls and uploaded files
    setFiles([]);
    setFieldValue('images', []);
  };

  const handleRemove = (targetIndex: number) => {
    const newFiles = files.filter(
      (_, currentIndex) => currentIndex !== targetIndex
    );

    setFiles(newFiles);

    setFieldValue('images', newFiles);
  };

  const handleRemoveImageUrl = (targetIndex: number) => {
    const newImageUrls = images.filter(
      (_, currentIndex) => currentIndex !== targetIndex
    );

    setFieldValue('images', newImageUrls);
  };

  const handleUpload = (): void => {
    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `reefking, acquarium hobby, saltwater`);
      formData.append('upload_preset', 'tweef1');
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY!);
      formData.append('timestamp', (Date.now() / 1000).toString());

      uploadImages(formData);

      if (error) {
        return enqueueSnackbar('Error uploading image', { variant: 'error' });
      }
    });
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

      {/* List of imageURls  */}
      {images.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {images.map((imageUrl, i) => (
                <ListItem divider={i < images.length - 1} key={i}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      alt="Travis Howard"
                      src={imageUrl}
                    />
                  </ListItemAvatar>
                  <ListItemText primaryTypographyProps={{ variant: 'h5' }} />
                  <Tooltip title="Remove this image">
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveImageUrl(i)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
        </>
      )}

      {/* List of files */}
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
              <div>
                <Fab
                  aria-label="save"
                  color="primary"
                  className={classes.buttonClassname}
                  onClick={handleUpload}
                >
                  <CloudUploadIcon />
                  {status === 'loading' && (
                    <CircularProgress
                      size={68}
                      className={classes.fabProgress}
                    />
                  )}
                </Fab>
              </div>
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
  },
  buttonClassname: {},
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  }
}));

export default FilesDropZone;
