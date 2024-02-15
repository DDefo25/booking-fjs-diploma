export interface HandlersForm {
    onSubmit?: (event: React.FormEvent<HTMLFormElement> ) => void,
    onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void
}