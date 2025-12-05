import Card from 'react-bootstrap/Card';

export default function PageHeader( { text, subtext } ) {
    return (
      <>
        <Card className="text-center mx_auto">
          <Card.Body>
            <h1 class="display-4">{text}</h1>
            {subtext && <p class="lead">{subtext}</p>}
          </Card.Body>
        </Card>
        <br />
      </>
    );     
  }