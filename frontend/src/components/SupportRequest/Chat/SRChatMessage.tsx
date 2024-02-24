import { Card } from "react-bootstrap";
import { Message } from "../../../services/supportRequestAPI";
import { format, formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale'
import { Role } from "../../../config/roles.enum";

export const SupporRequestChatMessage = ({ message }: { message: Message }) => {
    const { author: { name, role }, text, sentAt, readAt } = message

    return (
        <Card bg={ role !== Role.Client ? 'info' : 'light' }>
            <Card.Header>
                {name}
                <Card.Subtitle>{ formatDistanceToNow(sentAt, { locale: ru }) }</Card.Subtitle>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                {text}
                </Card.Text>
                { readAt && 
                    <Card.Subtitle>
                        {!!readAt}
                    </Card.Subtitle>
                }
            </Card.Body>
        </Card>
    )
}