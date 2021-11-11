import { Button, Card, Elevation } from "@blueprintjs/core";


const TestPage = () => {
    return (
    <div>
        <Card interactive={true} elevation={Elevation.FOUR}>
            <h5><a href="#">Card heading</a></h5>
            <p>Card content</p>
            <Button>Submit</Button>
        </Card>
    </div>

    )
} 

export default TestPage;