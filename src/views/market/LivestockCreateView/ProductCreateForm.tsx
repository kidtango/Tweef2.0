import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import QuillEditor from 'components/QuillEditor';
import FilesDropZone from 'components/FilesDropZone';

const waterTypes = [
  { id: 'salt', name: 'Saltwater' },
  { id: 'fresh', name: 'Freshwater' }
];

const classifications = [
  { id: 'invert', name: 'INVERTEGRATE' },
  { id: 'coral', name: 'coral' },
  { id: 'fish', name: 'FISH' },
  { id: 'lps', name: 'LPS' },
  { id: 'soft_coral', name: 'Soft Corals' },
  { id: 'plant', name: 'Plant' }
];

interface ProductCreateFormProps {
  className?: string;
  [x: string]: any;
}

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        category: '',
        description: '',
        images: [],
        includesTaxes: false,
        isTaxable: false,
        name: '',
        productCode: '',
        productSku: '',
        salePrice: '',
        submit: ''
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        description: Yup.string().max(5000),
        images: Yup.array(),
        includesTaxes: Yup.bool().required(),
        isTaxable: Yup.bool().required(),
        name: Yup.string().max(255).required(),
        price: Yup.number().min(0).required(),
        productCode: Yup.string().max(255),
        productSku: Yup.string().max(255),
        salePrice: Yup.number().min(0)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          console.log('values', values);
          //api call
          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Livestock Created', { variant: 'success' });
        } catch (err) {
          setErrors({ submit: err.message });
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <CardContent>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Product Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                  <Box mt={3} mb={1}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Description
                    </Typography>
                  </Box>
                  <Paper variant="outlined">
                    <QuillEditor
                      className={classes.editor}
                      value={values.description}
                      onChange={(value: any) =>
                        setFieldValue('description', value)
                      }
                    />
                  </Paper>
                  {touched.description && errors.description && (
                    <Box mt={2}>
                      <FormHelperText error>
                        {errors.description}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropZone />
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Create product
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  root: {},
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

export default ProductCreateForm;
