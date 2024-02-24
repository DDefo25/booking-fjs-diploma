import { Button, Col, Form, Row } from "react-bootstrap"
import { useCreateSupportRequestMutation, useSendSupportRequestMessageMutation } from "../../../services/supportRequestAPI"
import { Handler } from "../../../features/handlers/Handler"
import React, { useState } from "react"

interface ChatInput {
    text: string
}

const initialState: ChatInput = {
    text: ''
}

export const SupporRequestChatInput = () => {
    const [ sendMessage, { isLoading } ] = useSendSupportRequestMessageMutation()
    const [ createRequest, { isLoading: isLoadingCreate } ] = useCreateSupportRequestMutation()

    const [ formState, setForm ] = useState(initialState)

    const handlers = {
        onSubmit: ( e: React.FormEvent ) => {
            e.preventDefault()
            
        },
        onChange: ( e: React.ChangeEvent ) => Handler.onChangeInput<ChatInput>(e, setForm)
    }

    return (
        <Form onSubmit={ handlers.onSubmit }>
            <Row className="mb-3 align-items-center" >
                <Form.Group as={Col} className="mb-3" controlId="formSearchHotelStartDate">
                    <Form.Control 
                        name='text'
                        type="text" 
                        placeholder="Введите сообщение" 
                        value={ formState.text } 
                        onChange={ handlers.onChange }/>
                </Form.Group>
                <Col xs="auto">
                    <Button 
                        variant="primary" 
                        type="submit"
                        disabled={ isLoading || isLoadingCreate }
                    >
                        { isLoading || isLoadingCreate 
                            ? 'Отправка...'
                            : 'Отправить'
                        }
                    </Button>
                </Col>      
            </Row>
        </Form> 
    )
}