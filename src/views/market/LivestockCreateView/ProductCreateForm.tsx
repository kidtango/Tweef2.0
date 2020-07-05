import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
  { id: '', name: '' },
  { id: 'salt', name: 'Saltwater' },
  { id: 'fresh', name: 'Freshwater' }
];

const classifications = [
  { id: '', name: '' },
  { id: 'invert', name: 'Interegrate' },
  { id: 'coral', name: 'Coral' },
  { id: 'fish', name: 'Fish' },
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
        waterType: '',
        description: '',
        images: [],
        includesTaxes: false,
        isTaxable: false,
        name: '',
        productCode: '',
        productSku: '',
        salePrice: '',
        price: '',
        submit: '',
        classification: ''
      }}
      validationSchema={Yup.object().shape({
        category: Yup.string().max(255),
        description: Yup.string().max(250).required(),
        images: Yup.array().required(),
        includesTaxes: Yup.bool().required(),
        isTaxable: Yup.bool().required(),
        name: Yup.string().max(255).required(),
        price: Yup.number().min(0).required(),
        productCode: Yup.string().max(255),
        productSku: Yup.string().max(255),
        salePrice: Yup.number().min(0),
        classification: Yup.string().required(),
        waterType: Yup.string().required()
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log('clicked');
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

                    <Paper variant="outlined">
                      <QuillEditor
                        className={classes.editor}
                        value={values.description}
                        onChange={(value: string) => {
                          console.log('value', value);
                          setFieldValue('description', value);
                        }}
                      />
                    </Paper>
                    {touched.description && errors.description && (
                      <Box mt={2}>
                        <FormHelperText error>
                          {errors.description}
                        </FormHelperText>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Upload Images" />
                  <Divider />
                  <CardContent>
                    <FilesDropZone
                      setFieldValue={setFieldValue}
                      images={values.images}
                    />
                  </CardContent>
                  {touched.images && errors.images && (
                    <Box mt={1} pl={2} mb={2}>
                      <FormHelperText error>
                        Please include at least one image of the livestock
                      </FormHelperText>
                    </Box>
                  )}
                </Card>
              </Box>
              <Box mt={3}>
                <Card>
                  <CardHeader title="Prices" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.price && errors.price)}
                          fullWidth
                          helperText={
                            touched.price && errors.price
                              ? errors.price
                              : 'If you have a sale price this will be shown as old price'
                          }
                          label="Price"
                          name="price"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.price}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          error={Boolean(touched.salePrice && errors.salePrice)}
                          fullWidth
                          helperText={touched.salePrice && errors.salePrice}
                          label="Sale price"
                          name="salePrice"
                          type="number"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.salePrice}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardHeader title="Livestock details" />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    error={Boolean(touched.waterType && errors.waterType)}
                    helperText={touched.waterType && errors.waterType}
                    label="waterType"
                    name="waterType"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.waterType}
                    variant="outlined"
                  >
                    {waterTypes.map((water) => (
                      <option key={water.id} value={water.id}>
                        {water.name}
                      </option>
                    ))}
                  </TextField>
                  <Box mt={2}>
                    <TextField
                      fullWidth
                      error={Boolean(
                        touched.classification && errors.classification
                      )}
                      helperText={
                        touched.classification && errors.classification
                      }
                      label="classification"
                      name="classification"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.classification}
                      variant="outlined"
                    >
                      {classifications.map((classification) => (
                        <option
                          key={classification.id}
                          value={classification.id}
                        >
                          {classification.name}
                        </option>
                      ))}
                    </TextField>
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(touched.productCode && errors.productCode)}
                      fullWidth
                      helperText={touched.productCode && errors.productCode}
                      label="Product Code"
                      name="productCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productCode}
                      variant="outlined"
                    />
                  </Box>
                  <Box mt={2}>
                    <TextField
                      error={Boolean(touched.productSku && errors.productSku)}
                      fullWidth
                      helperText={touched.productSku && errors.productSku}
                      label="Product Sku"
                      name="productSku"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.productSku}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              create livestock
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  root: { minHeight: '100vh' },
  editor: {
    '& .ql-editor': {
      height: 400
    }
  }
}));

export default ProductCreateForm;
