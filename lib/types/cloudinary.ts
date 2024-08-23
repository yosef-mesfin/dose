export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  [key: string]: any; // other possible fields from Cloudinary response
}
