export const SERVER_URL: string = `http://${process.env.REACT_APP_SERVER_HOST!}:${process.env.REACT_APP_SERVER_PORT!}`;
export const DOWNLOAD_IMAGE_URL: string = `${SERVER_URL}/api/common/download/image`;
export const DOWNLOAD_ASSETS_ICON_URL: string = `${DOWNLOAD_IMAGE_URL}?img_path=\\assets\\icon\\`;