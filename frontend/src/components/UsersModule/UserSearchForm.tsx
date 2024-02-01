import { FloatingLabel, Form } from "react-bootstrap";

export function UserSearchForm () {
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Введите имя пользователя, id, телефон или почту"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="SearchInput"/>
            </FloatingLabel>
        </>
    )
}