import { useMutation, MutationOptions } from 'react-query';
import axios from 'axios';

const uploadImages = async (formData: FormData) => {
  const data: UploaImages = await axios.post(
    process.env.REACT_APP_CLOUDINARY_URL!,
    formData,
    { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
  );

  return data.data;
};

export default function useUploadImages(
  variables: MutationOptions<any, FormData> = {}
) {
  return useMutation(uploadImages, variables);
}

// Types for rest response from Cloudinary

export interface UploaImages {
  data: Data;
  status: number;
  statusText: string;
  headers: UploaImagesHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  url: string;
  method: string;
  data: Request;
  headers: ConfigHeaders;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
}

export interface Request {}

export interface ConfigHeaders {
  Accept: string;
  'X-Requested-With': string;
}

export interface Data {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}

export interface UploaImagesHeaders {
  'cache-control': string;
  'content-type': string;
}
