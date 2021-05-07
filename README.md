# pizza-place-simulator
spartans.ai backend project

## Commands
To start server `node bin/www`

To start coock `node bin/coockProcess` (You can override input to spawn multiple cooks)

## Example

POST to localhost:3000/orders
```json
{
    "client":{
        "firstName":"Aleksa",
        "lastName":"Rajkovic",
        "email":"aleksa.rajkovic97@gmail.com",
        "phone":"+381652542608",
        "address":"Mirijevsko Brdo"
    },
    "size":"large",
    "ingredients":["609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51","609573462aef20b5991bbd50","609573462aef20b5991bbd51"]
}
```

## Note
I know this design is far from ideal, but it's what I have managed to develop for day and a half. Better solution would be for coockProcess to be created as http server with API for recieving commands e.g. `POST /process/:orderId but` I did not manage to write that on time.
