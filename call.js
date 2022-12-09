<script src="https://cdn.jsdelivr.net/npm/icon-sdk-js@latest/build/icon-sdk-js.web.min.js"></script>

const IconService = window['icon-sdk-js'].default;
const httpProvider = new IconService.HttpProvider('https://sejong.net.solidwallet.io/api/v3')
const iconService = new IconService(httpProvider);
const { IconBuilder } = IconService
const { CallBuilder } = IconBuilder

var myAddress;  //Địa chỉ ví của user
var adminAddress = "hx69b66d24eacd8c6417f9fc2d307970f877524bd0"; // Địa chỉ ví của tao
var nameUser; // Tên User (String)
var avatar; // Ảnh đại diện (String)
var allPublicNFTs; // Tất cả ảnh NFT public (kiểu mảng chuôi ["anh1.png", "anh2.png"] )
var allUsers;
var userCustomCollections;
var publicCollections;
var userPublicCustomCollections;
var collectionPublicNFTs;
var collectionNFTs;
var NFTCurrentOwner;
var userCollections;
var userCustomCollections;
var userPublicCustomCollections;
var NFTInfo;
//connect wallet
//--------------------------------------------------------------------------------------------//

var contractAddress = "cx7f920f344cc41bc6d3e957c01845a794e61e721d";
function connectWallet() {
    const connectWalletEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_ADDRESS'
        }
    });
    window.dispatchEvent(connectWalletEvent);

    const eventHandler = event => {
        const { type, payload } = event.detail;
        if (type === 'RESPONSE_ADDRESS') {
            myAddress = payload;
        
        }
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}
//icx send
//--------------------------------------------------------------------------------------------//

function setName() {
    const setNameEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "setName", // SCORE external function
                        params: { _user: myAddress, _name: document.getElementById('name').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setNameEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);

}

function setAvatar() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "setAvatar", // SCORE external function
                        params: { _user: myAddress, _img: document.getElementById('avatar').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function createNFT() {
    var onSale;
    var visibility;
    if (document.getElementById('onSale').checked) {
        onSale = "1";
    }
    else {
        onSale = "0";
    }
    if (document.getElementById('visibility').checked) {
        visibility = "1";
    }
    else {
        visibility = "0";
    }
    const createNFTEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "createNFT", // SCORE external function
                        params: { _user: myAddress, _ipfs: document.getElementById('ipfs').value, _price: document.getElementById('price').value, _description: document.getElementById('description').value, _visibility: visibility, _onSale: onSale }
                    }
                }
            }
        }
    });
    window.dispatchEvent(createNFTEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}



function createCollection() {
    var visibilityCollection;
    if (document.getElementById('visibilityCollection').checked) {
        visibilityCollection = "1";
    }
    else {
        visibilityCollection = "0";
    }
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "createCollection", // SCORE external function
                        params: { _user: myAddress, _name: document.getElementById('name-collection').value, _description: document.getElementById('d-collection').value, _visibility: visibilityCollection  }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}
function deleteCollection() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "deleteCollection", // SCORE external function
                        params: { _user: myAddress, _collection: document.getElementById('name-collection').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function editCollection() {
    var visibilityCollection;
    if (document.getElementById('visibilityCollection2').checked) {
        visibilityCollection = "1";
    }
    else {
        visibilityCollection = "0";
    }
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "editCollection", // SCORE external function
                        params: { _collection: document.getElementById('name-collection').value, _name: document.getElementById('name-collection2'), _description:document.getElementById('d-collection'), _visibility: visibilityCollection }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}


function addNFT() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "addNFT", // SCORE external function
                        params: { _nft: document.getElementById('nft-collection').value, _collection: document.getElementById('name-collection3').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function removeNFT() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "removeNFT", // SCORE external function
                        params: { _nft: document.getElementById('nft-collection').value, _collection: document.getElementById('name-collection3').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function deleteNFT() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "deleteNFT", // SCORE external function
                        params: { _user: myAddress, _nft: document.getElementById('nft-collection').value}
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function  editNFT() {
    var onSale;
    var visibility;
    if (document.getElementById('onSale').checked) {
        onSale = "1";
    }
    else {
        onSale = "0";
    }
    if (document.getElementById('visibility').checked) {
        visibility = "1";
    }
    else {
        visibility = "0";
    }
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "editNFT", // SCORE external function
                        params: { _nft: document.getElementById('nft-link').value, _description: document.getElementById('d-nft').value, _visibility: visibility, _onSale: onSale, _price: document.getElementById('price')}
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

function sendBid() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "sendBid", // SCORE external function
                        params: { _user: myAddress, _nft: document.getElementById('nft').value, _bid: document.getElementById('price').value  }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}
function addToCart() {
    const setAvatarEvent = new CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
            type: 'REQUEST_JSON-RPC',
            payload: {
                jsonrpc: "2.0",
                method: "icx_sendTransaction",
                id: 6339,
                params: {
                    nid: "0x53",
                    timestamp: `0x${((new Date().getTime() * 1000).toString(16))}`,
                    version: "0x3",
                    from: myAddress, // TX sender address
                    // value: "0xde0b6b3a7640000",
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "addToCart", // SCORE external function
                        params: {_user: myAddress, _nft: document.getElementById('nft-collection').value }
                    }
                }
            }
        }
    });
    window.dispatchEvent(setAvatarEvent);
    const eventHandler = event => {
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
    }
    window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler);
}

//icx call 
//--------------------------------------------------------------------------------------------//

const getUsers = async () => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getUsers')
        .build()

    const users = await iconService.call(call).execute()
    return users;
}
const getNFTInfo = async (_nft) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getNFTInfo')
        .params({
            _nft: _nft,
            _timestamp: IconService.IconConverter.toBigNumber(Date.now() * 1000)
        })
        .build()

    const nftInfo = await iconService.call(call).execute()
    return nftInfo;
}
const getPublicNFTs = async () => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getPublicNFTs')
        .params({})
        .build()

    const nfts = await iconService.call(call).execute()
    return nfts;
}
const getPublicCollections = async () => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getPublicCollections')
        .params({})
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}

const getName = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getName')
        .params({_user: _user})
        .build()

    const name = await iconService.call(call).execute()
    return name;
}
const getAvatar = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getAvatar')
        .params({_user: _user})
        .build()

    const avatar = await iconService.call(call).execute()
    return avatar;
}
const getUserCollections = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getUserCollections')
        .params({
            _user: _user
        })
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}
const getUserCustomCollections = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getUserCustomCollections')
        .params({
            _user: _user
        })
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}

const getUserPublicCustomCollections = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getUserPublicCustomCollections')
        .params({
            _user: _user
        })
        .build()

    const collections = await iconService.call(call).execute()
    return collections;
}
const getCollectionNFTs = async (_collection) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getCollectionNFTs')
        .params({
            _collection: _collection
        })
        .build()

    const nfts = await iconService.call(call).execute()
    return nfts;
}
const getCollectionPublicNFTs = async (_collection) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getCollectionPublicNFTs')
        .params({
            _collection: _collection
        })
        .build()

    const nfts = await iconService.call(call).execute()
    return nfts;
}
const getCollectionInfo = async (_collection) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('getCollectionInfo')
        .params({
            _collection: _collection
        })
        .build()

    const collectionInfo = await iconService.call(call).execute()
    return collectionInfo;
}
const balance = async (_user) => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('balance')
        .params({
            _user: _user
        })
        .build()

    const balance = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(balance);
}
const value = async () => {
    const call = new CallBuilder()
        .to(contractAddress)
        .method('value')
        .params({})
        .build()

    const value = await iconService.call(call).execute()
    return IconService.IconConverter.toNumber(value);
}
//Function khac
//--------------------------------------------------------------------------------------------//
async function run() {
    allPublicNFTs = await getPublicNFTs();
    allUsers = await getUsers();

    publicCollections = await getPublicCollections(myAddress);
    nameUser = await getName(myAddress);
    userCollections = await getUserCollections(myAddress);
    userCustomCollections = await getUserCustomCollections(myAddress);
    userPublicCustomCollections = await getUserPublicCustomCollections(myAddress);
  //  collectionNFTs = await getCollectionNFTs("colection nao do")'
  //collectionPublicNFTs = await getCollectionPublicNFTs("Collection nao do");
  // collectionInfo = await getCollectionInfo("collection nao do");
    // NFTInfo = await getNFTInfo("Bo link vao");
}

