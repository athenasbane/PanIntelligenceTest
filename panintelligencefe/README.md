# PanTravel - Front End

PanTravel is a web application to allow users to find the cheapest route between their homes to a destination and back again. As defined by a technical challenge given by PanIntelligence for their Junior Engineer position.

## Overview

This application receives data from a REST API. Users can select their route from the front page then, submit to receive the cheapest route on the results modal.

## Visual Choices

I wanted to maintain visual links to PanIntelligence's new website design. (panintelligence.com)

I designed this site to be "mobile first" however it is responsive so should work on all screens. There are some issues with the visuals on screen sizes smaller than 500px height. This does not effect functionality.

## Function

I have made this application data driven so if additional flights are added or taken away the options given to users is automatically updated. I thought this is would reduce front end development time in the long run should this be used in real life scenario where flights and destinations change regularly.

I have tried to make sure that all error cases are caught.

If the backend is not working there is an error screen that recommends refresh until a connection can be reached.

I have attempted to make the code as DRY as possible using components multiple times where possible. There is more than can be done on this, for instance I would have liked to use a single modal component for both results and errors.

## Contributing

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
