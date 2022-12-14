//UPDATE 
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
            swapIcon() ;
            callApiAddress();
            call2();
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

function editNFT(img) {
    var onSale;
    var visibility;
    if (document.getElementById('onsaleEditNFT').checked) {
        onSale = "1";
    }
    else {
        onSale = "0";
    }
    if (document.getElementById('visibilityEditNFT').checked) {
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
                        params: { _nft: img, _description: document.getElementById('descriptionEditNFT').value, _visibility: visibility, _onSale: onSale, _price: document.getElementById('priceEditNFT').value}
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


function numHex(s)
{
    var a = s.toString(16);
   
        a = "0" + "x" +a;
    
    return a;
}

function sendBid(str, price) {
    var icx = String(price);
    var _price = 1000000000000000000*price;
    var _value = numHex(_price);
   
    var bid = String(_value);
    console.log(bid);
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
                    value: bid,
                    stepLimit: "2500000000",
                    to: contractAddress,   // SCORE address
                    dataType: "call",
                    data: {
                        method: "sendBid", // SCORE external function
                        params: { _user: myAddress, _nft: str, _bid: icx}
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
async function main() {
    
    allPublicNFTs = await getPublicNFTs();
    allUsers = await getUsers();

    // publicCollections = await getPublicCollections(myAddress);
    // nameUser = await getName(myAddress);
    // userCollections = await getUserCollections(myAddress);
    // userCustomCollections = await getUserCustomCollections(myAddress);
    // userPublicCustomCollections = await getUserPublicCustomCollections(myAddress);
  //  collectionNFTs = await getCollectionNFTs("colection nao do")'
  //collectionPublicNFTs = await getCollectionPublicNFTs("Collection nao do");
  // collectionInfo = await getCollectionInfo("collection nao do");
    // NFTInfo = await getNFTInfo("Bo link vao");
}


function openContent(evt, contents) {
  var i, marketplaceContent, marketplaceTab;
  marketplaceContent = document.getElementsByClassName("marketplace__content");

  for (i = 0; i < marketplaceContent.length; i++) {
    marketplaceContent[i].style.display = "none";
  }
  marketplaceTab = document.getElementsByClassName("marketplace__tab");
  for (i = 0; i < marketplaceTab.length; i++) {
    marketplaceTab[i].className = marketplaceTab[i].className.replace(
      " active",
      ""
    );
  }
  document.getElementById(contents).style.display = "grid";
  evt.currentTarget.className += " active";
}

var imageList = [
  
  {
    src: "source/img/nft_1.avif",
  },
  {
    src: "source/img/nft_2.avif",
  },
  {
    src: "source/img/nft_3.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
  {
    src: "source/img/nft_4.avif",
  },
];
function showImage(imageList) {
  const collectionList = document.querySelectorAll(".collection_list");
  collectionList.forEach((collection) => {
    imageList.map((image) => {
      const img = document.createElement("img");
      img.src = image.src;
      collection.appendChild(img);
    });
  });
}
showImage(imageList);




// function showImage(allPublicNFTs) {
//   const collectionList = document.querySelectorAll(".collection_list");
//   collectionList.forEach((collection) => {
//     console.log(collection);
//     allPublicNFTs.map((publicNFT) => {
//       const img = document.createElement("img");
//       img.src = publicNFT;
//       console.log(img.src);
//       const div = document.createElement("div");
//       div.setAttribute("class", "collection_list");
//       listItems.push(div);
//       div.innerHTML=`
//       <div class="collection_list"></div>
      
//       `;
//       collectionNFT.appendChild(div);
//       console.log(collectionNFT);

//     })
//   })
// }
// showImage(allPublicNFTs);

const swiperCardFlex = new Swiper('.card-flex', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      576: {
          slidesPerView: 2.1,
      },
      0: {
          slidesPerView: 1.1,
      }
  },

  navigation: {
      nextEl: '.card__explore'
  }
});

const swiperUserFlex = new Swiper('.users__card-flex', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      576: {
          slidesPerView: 2.1,
      },
      0: {
          slidesPerView: 1.1,
      }
  },

  navigation: {
      nextEl: '.user__explore'
  }
});

const swiperSellers = new Swiper('.top-sellers__swiper', {
  breakpoints: {
      992: {
          slidesPerView: 3,
      },
      768: {
          slidesPerView: 2,
      },
      0: {
          slidesPerView: 1,
      }
  },

  navigation: {
      nextEl: '.top-sellers__explore'
  }
});

let checkbox = document.getElementById('menu-toggle')

checkbox.onclick = () => {
  if (checkbox.checked) {
      document.body.style.overflow = 'hidden';
  } else{
      document.body.style.overflow = 'visible';
  }
}

function footerOpen(count) {
  switch(count){
      case 1:
          if(document.querySelector('.market-place').classList[2]){
              document.querySelector('.market-place').classList.remove('open')
          } else{
              document.querySelector('.market-place').classList.add('open')
          }
          break
      case 2:
          if(document.querySelector('.collectibles').classList[2]){
              document.querySelector('.collectibles').classList.remove('open')
          } else{
              document.querySelector('.collectibles').classList.add('open')
          }
          break
      case 3:
          if(document.querySelector('.support').classList[2]){
              document.querySelector('.support').classList.remove('open')
          } else{
              document.querySelector('.support').classList.add('open')
          }
          break
      case 4:
          if(document.querySelector('.legal').classList[2]){
              document.querySelector('.legal').classList.remove('open')
          } else{
              document.querySelector('.legal').classList.add('open')
          }
          break
      case 5:
          if(document.querySelector('.follow').classList[2]){
              document.querySelector('.follow').classList.remove('open')
          } else{
              document.querySelector('.follow').classList.add('open')
          }
          break
  }

}

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 0) {document.querySelector('header').classList.add('scrolled')}
  else {document.querySelector('header').classList.remove('scrolled')}
});

setInterval(() => counters(), 1000);

function counters(){
  let hour
  let minutes
  let second

  let countersArr = document.querySelectorAll('.seller-card__counter')

  for (let counter of countersArr) {
      second = counter.children[2].firstElementChild.innerHTML
      minutes = counter.children[1].firstElementChild.innerHTML
      hour = counter.children[0].firstElementChild.innerHTML

      if (second - 1 >= 0) {
          counter.children[2].firstElementChild.innerHTML = second - 1
      } else if (minutes - 1 >= 0) {
          counter.children[2].firstElementChild.innerHTML = 60
          counter.children[1].firstElementChild.innerHTML = minutes - 1
      } else {
          counter.children[2].firstElementChild.innerHTML = 60
          counter.children[1].firstElementChild.innerHTML = 60
          counter.children[0].firstElementChild.innerHTML = hour - 1
      }
  }
}

function collectionBrandActive() {
  document.querySelector('.grid__brand').classList.add('active')
  document.querySelector('.grid__art').classList.remove('active')

  document.querySelector('.collection__brand').classList.add('active')
  document.querySelector('.collection__art').classList.remove('active')
}

function collectionArtActive() {
  document.querySelector('.grid__art').classList.add('active')
  document.querySelector('.grid__brand').classList.remove('active')

  document.querySelector('.collection__art').classList.add('active')
  document.querySelector('.collection__brand').classList.remove('active')
}

function ButtonActive(buttonNum) {
  let gridButton = document.querySelector('.collection__grid')

  for (let i = 0; i < 8; i++) {
      if (gridButton.children[i].firstElementChild.classList[2] = 'active') {
          gridButton.children[i].firstElementChild.classList.remove('active')
          document.querySelector('.collection__img').children[i].classList.remove('active')
      }
  }

  gridButton.children[buttonNum].firstElementChild.classList.add('active')
  document.querySelector('.collection__img').children[buttonNum].classList.add('active')

  document.querySelector('collection__img')
}

const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");

let idx = 0;

let interval = setInterval(run, 2000);

function run() {
idx++;
changeImage();
}

function changeImage() {
if (idx > img.length - 1) {
 idx = 0;
} else if (idx < 0) {
 idx = img.length - 1;
}

imgs.style.transform = `translateX(${-idx * 480}px)`;
}

function resetInterval() {
clearInterval(interval);
interval = setInterval(run, 2000);
}

const inputImg = document.querySelector('#input-img')

inputImg.addEventListener('change', (e) => {
 let file = e.target.files[0]

 if (!file) return

 let img = document.createElement('img')
 img.src = URL.createObjectURL(file)

 document.querySelector('.preview').appendChild(img)
})
const inputAvatar = document.querySelector('#input-avatar')

inputAvatar.addEventListener('change', (e) => {
 let file = e.target.files[0]

 if (!file) return

 let img = document.createElement('img')
 img.src = URL.createObjectURL(file)

 document.querySelector('.preview1').appendChild(img)
})

// const carts = document.querySelector("#cart_id");
// async function showAll(){
//   allPublicNFTs = await getPublicNFTs();
//   console.log(allPublicNFTs);

//   allPublicNFTs.map(async (nft) => {
//     const img = document.createElement("img");
//     img.src = nft;
//     const div = document.createElement("div");
//     div.setAttribute("class", "nft_buy");
//     listItems.push(div);
//     div.innerHTML = `
     
//       <img class="nft_buy" src= "${img.src}" >
     
//   </div> 
//         `;
//     carts.appendChild(div);
//     console.log(carts);
//   });
// }

// async function showNFTs(){
//   allPublicNFTs = await getPublicNFTs();
//   const products = document.querySelectorAll(".item1");
//   products.forEach(async (product) => {
//     console.log(product);
//     allPublicNFTs.map((nft) => {
//       const img = document.createElement("img");
//       img.src = nft.src;
//       product.appendChild(img);
//       console.log(img.src)

//     });
//   });
// }
// showNFTs(allPublicNFTs);


// function showImage(imageList) {
//   const collectionList = document.querySelectorAll(".collection_list");
//   collectionList.forEach((collection) => {
//     console.log(collection);
//     imageList.map((image) => {
//       const img = document.createElement("img");
//       img.src = image.src;
//       collection.appendChild(img);
//       console.log(img.src);
//     });
//   });
// }

// allPublicNFTs.map(async (publicNFT) => {
//   const img = document.createElement("img");
//   img.src = publicNFT;
//   // var a = await getNFTInfo(publicNFT);
//   // console.log(a);
//   // console.log(img);
//   const div = document.createElement("div");

function profile(){
  document.getElementById("main__page").style.display="none";
  document.getElementById("profile__page").style.display="block";
  document.getElementById("nft__page").style.display="none";
  document.getElementById("user__page").style.display="none";
  document.getElementById("collection__page").style.display="none";

}
function nftPage(){
  document.getElementById("main__page").style.display="none";
  document.getElementById("profile__page").style.display="none";
  document.getElementById("user__page").style.display="none";
  document.getElementById("collection__page").style.display="none";
  document.getElementById("nft__page").style.display="block";

}

function userPage(){
document.getElementById("main__page").style.display="none";
  document.getElementById("profile__page").style.display="none";
  document.getElementById("nft__page").style.display="none";
  document.getElementById("user__page").style.display="block";
  document.getElementById("collection__page").style.display="none";

}

function collectionPage(){
    document.getElementById("main__page").style.display="none";
    document.getElementById("profile__page").style.display="none";
    document.getElementById("nft__page").style.display="none";
    document.getElementById("user__page").style.display="none";
    document.getElementById("collection__page").style.display="block";
}

function mainPage(){
  document.getElementById("main__page").style.display="block";
  document.getElementById("profile__page").style.display="none";
  document.getElementById("nft__page").style.display="none";
  document.getElementById("user__page").style.display="none";
  document.getElementById("collection__page").style.display="none";


}
function swapIcon() {
  document.getElementById("connect__walletButton").style.display="none";
  document.getElementById("profile__icon").style.display="block";
  document.getElementById("cart__button").style.display="block";


}


const listItems = [];
const marketplace = document.querySelector("#content1");
const marketplace1 = document.querySelector("#mynft");
const collection__update = document.querySelector("#updateCollection");
const users = document.querySelector("#getuser");

// const collectionNFT = document.querySelector("#item1");
async function callPublicCollection(){
    const publicCollections = await getPublicCollections();
    
    publicCollections.map(async(collection)=>{
        const nftCollection = await getCollectionNFTs(collection);
// console.log(nftCollection);

console.log(nftCollection[0])
console.log(nftCollection[1])
console.log(nftCollection.length)
// console.log(collection);
    //     nftCollection.map(async(nft)=>{
    //         const imgCollection = document.createElement("img");
    //         imgCollection.src = nft;
            

    // })
    const nameCollection = collection.slice(43);
// console.log(nameCollection);
           
        const div = document.createElement("div");
        div.setAttribute("class","collection__item");
        listItems.push(div);
        div.innerHTML=`
        <div class="collection__user">
             
        <span class="name__user">${nameCollection}</span>
      </div>
      <div class="collection_list">
    <img src="${nftCollection[0]}" alt="">
    <img src="${nftCollection[1]}" alt="">
    <img src="${nftCollection[2]}" alt="">
    <img src="${nftCollection[3]}" alt="">
    <img src="${nftCollection[4]}" alt="">
    <img src="${nftCollection[5]}" alt="">
    <img src="${nftCollection[6]}" alt="">

    
    
   
  
      </div>
        `
        collection__update.appendChild(div);
        })
        
}
async function callUser(){
    allUsers = await getUsers();

    allUsers.map(async (user) =>{
        var avatar__profilepage = await getAvatar(user);
        // console.log(avatar__profilepage);
        var name__profilepage = await getName(user);
        const div = document.createElement("div");
        div.setAttribute("class","user-item");
        listItems.push(div);
        div.innerHTML=`
        <div class="user-top">
                          
                          <div class="user-avatar">
                              <img src= "${avatar__profilepage}" alt="Avatar">
                          </div>
                      </div>
                      <div class="user-info">
                        <h2 id="name__user" style="color:#fff;">${name__profilepage}</h2>
                        <div id="my__address" style="color:#fff;overflow:hidden;max-width:200px;text-overflow:ellipsis;">${user}</div>
                     </div>
        `
        users.appendChild(div);

    })
    


   
}
async function call(){
  allPublicNFTs = await getPublicNFTs();
  

  allPublicNFTs.map(async (publicNFT) => {
    const img = document.createElement("img");
    img.src = publicNFT;
  
   ;
    var info = await getNFTInfo(publicNFT);
    // console.log(info);
    
    var avatar__nftPage = await getAvatar(info[0]);
    var nameuser__nftPage = await getName(info[0]);
    var description__nftPage =  (info[2]);
    var price__nftPage =  (info[1]);
    // console.log(price__nftPage);

    // console.log(description__nftPage);
    
    // console.log(nameuser__nftPage);

    // var a = await getNFTInfo(publicNFT);
    // console.log(a);
    // console.log(img);
    // var a = nftInfo(publicNFT);
    // console.log(a);
    const div = document.createElement("div");
    div.setAttribute("class", "marketplace-card");
    listItems.push(div);
    div.innerHTML = `
        <img class="marketplace-card__img" src= "${img.src}" >
        <div class="marketplace-card__title">
        <div class="marketplace-card__title-info">
        <p class="marketplace-card__title-name">${description__nftPage}</p>

          <p class="marketplace-card__title-author">
            Owner: <a href="#">${nameuser__nftPage}</a>
          </p>

        </div>
        <a class="marketplace-card__title-author-link" href="#">
          <img
            class="marketplace-card__title-autorimg"
            src="${avatar__nftPage}"
            alt="Rick"
          >
        </a>
      </div>
      <ul class="marketplace-card__info">
        <li class="marketplace-info__item">
          <p class="marketplace-info__item-title">Price: ${price__nftPage} ICX</p>
          <p class="marketplace-info__item-title"></p>
           <div
            class="marketplace-info__item-data seller-card__counter"
          >
            <div class="counter__hours counter__item">
              <h3>18</h3>
              <span>Hours</span>
            </div>

            <div class="counter__mins counter__item">
              <h3>25</h3>
              <span>Mins</span>
            </div>

            <div class="counter__secs counter__item">
              <h3>44</h3>
              <span>Secs</span>
            </div>
          </div>
        </li>
        <li class="marketplace-info__item">
           
          <p class="product__text">
            <a class="buttonn js-add-product" href="#" title="Add to cart">
              Add to cart
            </a>
          </p>
          <button class="buy-now" onclick="sendBid('${publicNFT}', ${price__nftPage})">Buy now</button>
          
          
        </li>
      </ul>
        `;
    marketplace.appendChild(div);
    
    // console.log(marketplace);
  });

}
async function call2(){
    var mynfts = myAddress+"/Owning"
    // console.log(mynfts);
  mynft = await getCollectionNFTs(mynfts);
  
  

  mynft.map(async (publicNFT) => {
    const img = document.createElement("img");
    img.src = publicNFT;
   ;
    var info = await getNFTInfo(publicNFT);
    // console.log(info);
    
    // var avatar__nftPage = await getAvatar(info[0]);
    var nameuser__nftPage = await getName(info[0]);
    var description__nftPage =  (info[2]);
    var price__nftPage =  (info[1]);

    const div = document.createElement("div");
    div.setAttribute("class", "marketplace-card");
    listItems.push(div);
    div.innerHTML = `
    <img class="marketplace-card__img" src= "${img.src}" >
        
        <div class="marketplace-card__title">
        <div class="marketplace-card__title-info">
        <p class="marketplace-card__title-name">${description__nftPage}</p>

          <p class="marketplace-card__title-author">
            Owner: <a href="#">${nameuser__nftPage}</a>
          </p>

        </div>
        <a class="marketplace-card__title-author-link" href="#">
          
        </a>
      </div>
      <ul class="marketplace-card__info">
        <li class="marketplace-info__item">
          <p class="marketplace-info__item-title">Price: ${price__nftPage} ICX</p>
          <p class="marketplace-info__item-title"></p>
           
        </li>
        <li class="marketplace-info__item">
           
          
            
            <button class="buy-now">
            <a  class="js-open-modal"  onclick="showEditNFTmodal('${publicNFT}')">Edit</a>
            </button>
          
          
        </li>
      </ul>
        `;
    marketplace1.appendChild(div);
    
    
  });

}
async function callApiAddress() {
    const name = await getName(myAddress);
    const avatar = await getAvatar(myAddress);
    // console.log(name);
    document.getElementById("name__user").innerHTML = name;
    document.getElementById("my__address").innerHTML = myAddress;
    // console.log(avatar);
    document.getElementById("avatar__profile").src = avatar;
    
}
var imgNFT;
function showEditNFTmodal(image) {
   document.getElementById("modalEditNft").style.display="block";
   imgNFT = image;
}
function editNFTModal(){
  
    editNFT(imgNFT);
}
function closeModalNFT(){
   document.getElementById("modalEditNft").style.display="none";

}
