export const catchError = (e: unknown) => {
  if (typeof e === 'string') {
    throw new Error(e.toUpperCase());
  } else if (e instanceof Error) {
    throw new Error(e.message);
  } 
};
