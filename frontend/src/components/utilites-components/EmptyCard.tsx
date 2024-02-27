import { Card } from 'react-bootstrap';

export const EmptyCard = ({ text }: { text: string }) => {
  return (
        <Card className="mb-3 border border-0">
            <Card.Text className="p-4">{ text }</Card.Text>
        </Card>
  );
};