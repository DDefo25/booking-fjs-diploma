export const SERVER_URL: string = `http://${process.env.REACT_APP_SERVER_HOST!}:${process.env.REACT_APP_SERVER_PORT!}`;
export const DOWNLOAD_IMAGE_URL: string = `${SERVER_URL}/api/common/download/image`;
export const DOWNLOAD_ASSETS_ICON_URL: string = `${DOWNLOAD_IMAGE_URL}?img_path=/assets/icon/`;

export const MAX_IMAGE_FILES_COUNT: number = 10
export const MAX_IMAGE_FILE_SIZE: number = 10e6
export const ACCEPTED_IMAGE_MIME_TYPES: string = "image/png, image/jpg, image/jpeg, image/webp"

export const MAX_LENGTH_TITLE_HOTEL: number = 10
export const MAX_LENGTH_DESCRIPTION_HOTEL: number = 100

export const MAX_LENGTH_TITLE_HOTEL_ROOM: number = 10
export const MAX_LENGTH_DESCRIPTION_HOTEL_ROOM: number = 200
