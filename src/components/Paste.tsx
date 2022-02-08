import React from 'react';
import { Card } from 'react-bootstrap';

interface props {
  paste: Paste;
}

export default function PasteComponent({ paste }: props) {
  //   const content = paste.content.replace(/\n/g, '<br />');
  return (
    <Card className="paste">
      <Card.Title>{paste.Title}</Card.Title>
      <Card.Body>
        <Card.Text>{paste.Content.join('\n')}</Card.Text>
        <Card.Text>
          Posted by {paste.Author} at {paste.Date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
