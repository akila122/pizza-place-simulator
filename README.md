# pizza-place-simulator
spartans.ai backend project

## Commands
To start server `node bin/www`

To start coock `node bin/coockProcess` (You can override input to spawn multiple cooks)

## Note
I know this design is far from ideal, but it's what I have managed to develop for day and a half. Better solution would be for coockProcess to be created as http server with API for recieving commands e.g. `POST /process/:orderId but` I did not manage to write that on time.
