
### Event logging using Moralis.io.
Moralis blockchain query SDK supports real time contract syncronization with various networks including; Ethereum, Polygon, Binance, Avalanche, Arbitrum and their corresponding testnets. 

### Description:
Tracking CreatedEdition contract event on Rinkeby testnet.  
#
#### Setup
 https://moralis.io Account required!
### Login to Moralis.io
1. Create Ethereum Rinkeby testnet server. 
2. Click 'View details' button next to your server. 
``*Note Application + Serer URL.*``
3. Go to 'sync' tab and click 'Add New Sync' button
### Sync Config
1. Select Blockchain (Rinkeby)
2. Enter random description.
3. Check 'Sync Historical" box if you want past events logged. 
4. Under 'Topic' add your event function. 
Our event topic used in Moralis config:
```sh
CreatedEdition( uint256, address , uint256 , address)
```
5.  Next, Add only the ABI code of your contract event.
Event ABI code for CreatedEdition event:
````sh
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "editionId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "creator",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "editionSize",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "editionContractAddress",
      "type": "address"
    }
  ],
  "name": "CreatedEdition",
  "type": "event"
}
````
6. Then enter your deployed contract address. 
Our Rinkeby contract address for reference:
```sh
0x7dE784A753a4adb66F92D079E52af59dB07b8C46
```
7. Next, add your table name. This name is used to identify your data within the Moralis database and your react app. We used the name of our contract 'dFactory'.
``*Note table name for later*``
```

git clone https://github.com/fourswordsio/MoralisContractSync

cd MoralisContractSync
npm install --legacy-peer-deps
```

```sh
npm start
```


#### Example code
Our solidity event looks like this
````
  event CreatedEdition(
        uint256 indexed editionId,
        address indexed creator,
        uint256 editionSize,
        address editionContractAddress
    );
````

